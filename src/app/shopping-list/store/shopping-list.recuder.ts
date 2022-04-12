import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface AppState {
    shoppingList: State;
}

export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initialState: State = {
    ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomato", 7) ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListTypeActions) {
    switch(action.type) {
        case ShoppingListActions.ADD_INGREDIENT:       
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...(action as ShoppingListActions.AddIngredients).payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const updateAction = action as ShoppingListActions.UpdateIngredient;

            const ingredient = state.ingredients[updateAction.payload.index];
            const updatedIngredient = {
                ...ingredient, 
                ...updateAction.payload.ingredient
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[updateAction.payload.index] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const deleteAction = action as ShoppingListActions.DeleteIngredient;

            const oldIngredients = state.ingredients.filter((value, index) => {
                if(index == deleteAction.payload.index) return false;
                return true;
            });

            return {
                ...state,
                ingredients: oldIngredients
            };
        default: return state;
    }
}