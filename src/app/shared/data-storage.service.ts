import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { map, take, tap, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';

import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private authService: AuthService,
    private store: Store<fromApp.AppState>) { }

  storeRecipes() {



    //this.http.put("https://recipe-14947-default-rtdb.europe-west1.firebasedatabase.app/recipe.json", recipes);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(
        "https://recipe-14947-default-rtdb.europe-west1.firebasedatabase.app/recipe.json"
      ).pipe(
        map(response => {
          return response.map(recipe => {
            return {
              ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }), tap(recipes => {
          this.store.dispatch(RecipesActions.setRecipes({recipes}));
        }));
  }
}
