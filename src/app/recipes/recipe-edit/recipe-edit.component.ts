import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';

import * as RecipeActions from '../store/recipe.actions';

import { map } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  constructor(private activeRoute: ActivatedRoute,
    private route: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];    
        this.editMode = params['id'] != null;
        this.initForm();
      }
    )
  }

  onSubmit() {

    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if(this.editMode){
      this.store.dispatch(RecipeActions.updateRecipe({index: this.id, recipe: newRecipe}));
    }
    else {
      this.store.dispatch(RecipeActions.addRecipe({recipe: newRecipe}));
    }

    this.onCancel();
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      this.store.select('recipes').pipe(
        map(state => {
          return state.recipes.find(
            (_, index) => { return index == this.id}
          )
        })).subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
    
          if(recipe.ingredients) {
            for(let ingredient of recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]),
                })
              );
            }
          }
        });

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { 
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")]),
      })
    );
    
    this.recipeForm.updateValueAndValidity();
  }

  onCancel(){
    this.route.navigate(["../"], {relativeTo: this.activeRoute});
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
