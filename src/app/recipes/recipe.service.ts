import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      "A test recipe 1", 
      "This is simply a test 1", 
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574",
      [
        new Ingredient("Tomato", 5),
        new Ingredient("Potato", 7)
      ]),
    new Recipe(
      "A test recipe 2",
       "This is simply a test 2",
        "https://www.wbcsd.org/var/site/storage/images/media/images/fresh_pa/80809-2-eng-GB/FRESH_PA_i1140.jpg",
        [
          new Ingredient("Bread", 2),
          new Ingredient("Milk", 3)
        ]),
    new Recipe(
      "A test recipe 3",
       "This is simply a test 3",
        "https://www.thespruceeats.com/thmb/I_M3fmEbCeNceaPrOP5_xNZ2xko=/3160x2107/filters:fill(auto,1)/vegan-tofu-tikka-masala-recipe-3378484-hero-01-d676687a7b0a4640a55be669cba73095.jpg",
        [
          new Ingredient("Milk", 3),
          new Ingredient("Pickle", 3),
          new Ingredient("Ginger", 14),
        ]),
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }

}
