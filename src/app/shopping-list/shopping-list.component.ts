import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListAction from './store/shopping-list.actions'
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  //ingredientChangeSub!: Subscription;

  constructor(/*private listService: ShoppingListService,*/
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');

    /*
    this.ingredients = this.listService.getIngredients();
    this.ingredientChangeSub = this.listService.ingredientAdded.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
    */
  }

  ngOnDestroy(): void {
    //this.ingredientChangeSub?.unsubscribe();
  }

  onEditItem(index: number) {
    //this.listService.startedEditing.next(index)
    this.store.dispatch(new ShoppingListAction.StartEdit(index));
  }
}
