import { Action, createAction, props } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const addIngredient = createAction(
    '[Shopping list] ADD_INGREDIENT',
    props<{
        ingredient: Ingredient
    }>()
)

/*
export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload: Ingredient){}
}
*/

export const addIngredients = createAction(
    '[Shopping list] ADD_INGREDIENTS',
    props<{
        ingredients: Ingredient[]
    }>()
)

/*
export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}
*/

export const updateIngredient = createAction(
    "[Shopping list] UPDATE_INGREDIENT",
    props<{
        ingredient: Ingredient
    }>()
)

/*
export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) {}
}
*/

export const deleteIngredient = createAction(
    '[Shopping list] DELETE_INGREDIENT'
)

/*
export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
}
*/

export const startEdit = createAction(
    '[Shopping list] START_EDIT',
    props<{
        index: number
    }>()
)

/*
export class StartEdit implements Action {
    readonly type: string = START_EDIT;
    constructor(public payload: number) {}
}
*/

export const stopEdit = createAction(
    '[Shopping list] STOP_EDIT'
)

/*
export class StopEdit implements Action {
    readonly type: string = STOP_EDIT;
    constructor() {}
}
*/
