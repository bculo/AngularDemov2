import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import { map, pipe, switchMap } from 'rxjs';

import * as RecipeActions from '../store/recipe.actions';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: number;

  constructor(private activeRoute: ActivatedRoute,
    private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      map(params => {
        return +params['id']
      }),
      switchMap(id => {
        return this.store.select('recipes').pipe(
          map(state => {
            return state.recipes.find(
              (_, index) => {
                return index === id
              }
            )
          })
        )
      })
    ).subscribe(recipe => {
      this.recipe = recipe;
    });
  }

  onAddToShoppingList(){
    this.store.dispatch(
      ShoppingListActions.addIngredients({ingredients: this.recipe.ingredients})
    );
  }

  onDeleteRecipe(){
    this.store.dispatch(RecipeActions.deleteRecipe({index: this.id}));
    this.router.navigate(["../"], {relativeTo: this.activeRoute});
  }

  

}
