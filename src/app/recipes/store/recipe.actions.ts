import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";

export const setRecipes = createAction(
    '[Recipe] set recipe',
    props<{
        recipes: Recipe[]
    }>()
);

export const fetchRecipes = createAction(
    '[Recipe] fetch recipe'
);

export const addRecipe = createAction(
    '[Recipe] add recipe',
    props<{
        recipe: Recipe
    }>()
);

export const updateRecipe = createAction(
    '[Recipe] update recipe',
    props<{
        index: number,
        recipe: Recipe
    }>()
);

export const deleteRecipe = createAction(
    '[Recipe] delete recipe',
    props<{
        index: number
    }>()
);

export const storeRecipes = createAction(
    '[Recipe] store recipes'
);