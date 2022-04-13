import { Ingredient } from "src/app/shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

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
                ingredients: [...state.ingredients, (action as ShoppingListActions.AddIngredient).payload]
            };
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...(action as ShoppingListActions.AddIngredients).payload]
            };
        case ShoppingListActions.UPDATE_INGREDIENT:
            const updateAction = action as ShoppingListActions.UpdateIngredient;

            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient, 
                ...updateAction.payload
            };

            const updatedIngredients = [...state.ingredients];
            updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            const oldIngredients = state.ingredients.filter((value, index) => {
                if(index == state.editedIngredientIndex) return false;
                return true;
            });

            return {
                ...state,
                ingredients: oldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        case ShoppingListActions.START_EDIT:
            const startEditAction = action as ShoppingListActions.StartEdit;
            return {
                ...state,
                editedIngredientIndex: startEditAction.payload,
                editedIngredient: {...state.ingredients[startEditAction.payload]}
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1,
            };
        default: return state;
    }
}