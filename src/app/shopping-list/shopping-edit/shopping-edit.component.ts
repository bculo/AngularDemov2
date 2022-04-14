import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") slForm!: NgForm;

  subscription!: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(
      stateData => {
        const index = stateData.editIndex;

        if(index> -1) {
          this.editMode = true;
          this.editedItem = stateData.ingredients[index];
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        }
        else this.editMode = false;
      }
    );
  }

  onAddItem(form: NgForm){
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);

    if(this.editMode) this.store.dispatch(ShoppingListActions.updateIngredient({ingredient}));
    else this.store.dispatch(ShoppingListActions.addIngredient({ingredient}));
    
    this.editMode = false;
    this.slForm.reset();
  }

  clearForm() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(ShoppingListActions.stopEdit());
  }

  deleteIngredient() {
    this.store.dispatch(ShoppingListActions.deleteIngredient());
    this.slForm.reset();
    this.editMode = false;
  }
}
