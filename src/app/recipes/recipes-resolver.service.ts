import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Recipe } from './recipe.model';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}


resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {

    return this.store.select('recipes').pipe(
        take(1),
        map(recipesState => {
          console.log(recipesState);
          return recipesState.recipes;
        }),
        switchMap(recipes => {
          console.log("HELLO");
          if (recipes.length === 0) {
            this.store.dispatch(RecipesActions.fetchRecipes());
            return this.actions$.pipe(
              ofType(RecipesActions.setRecipes),
              take(1),
              tap(data => {console.log(data)}),
              map(data => {
                return data.recipes;
              })
            );
          } else {
            return of(recipes);
          }
        })
      );
    }
}
