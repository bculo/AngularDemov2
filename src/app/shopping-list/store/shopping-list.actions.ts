import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const ADD_INGREDIENT = '[Shopping list] ADD_INGREDIENT';
export const ADD_INGREDIENTS = "[Shopping list] ADD_INGREDIENTS";
export const UPDATE_INGREDIENT = "[Shopping list] UPDATE_INGREDIENT";
export const DELETE_INGREDIENT = "[Shopping list] DELETE_INGREDIENT";
export const START_EDIT = "[Shopping list] START_EDIT";
export const STOP_EDIT = "[Shopping list] STOP_EDIT";

export class AddIngredient implements Action {
    readonly type: string = ADD_INGREDIENT;
    constructor(public payload: Ingredient){}
}

export class AddIngredients implements Action {
    readonly type: string = ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type: string = UPDATE_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class DeleteIngredient implements Action {
    readonly type: string = DELETE_INGREDIENT;
}

export class StartEdit implements Action {
    readonly type: string = START_EDIT;
    constructor(public payload: number) {}
}

export class StopEdit implements Action {
    readonly type: string = STOP_EDIT;
    constructor() {}
}

export type ShoppingListTypeActions = AddIngredient 
    | AddIngredients 
    | UpdateIngredient 
    | DeleteIngredient
    | StopEdit
    | StartEdit;