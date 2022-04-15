import { createReducer, on } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import { RecipesComponent } from "../recipes.component";

import * as RecipeActions from './recipe.actions';

export interface State {
    recipes: Recipe[]
}

const state: State = {
    recipes: []
}

export const recipeReducer = createReducer(
    state,

    on(RecipeActions.setRecipes,
        (state, action) => ({
            ...state,
            recipes: [...action.recipes]
        })    
    ),

    on(RecipeActions.addRecipe,
        (state, action) => ({
            ...state,
            recipes: state.recipes.concat({...action.recipe})
        })    
    ),

    on(RecipeActions.updateRecipe,
        (state, action) => ({
            ...state,
            recipes: state.recipes.map(
                (recipe, index) => index === action.index ? { ...action.recipe } : recipe
            )
        })    
    ),

    on(RecipeActions.deleteRecipe,
        (state, action) => ({
            ...state,
            recipes: state.recipes.filter((_, index) => {
                return index !== action.index
            })
        })    
    ),

)