import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';
import {Ingredient} from './ingredient.model';
import {Subject} from 'rxjs';

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('cernohor',
  //     'prvy rezen',
  //     'https://recepty.simaco.sk/wp-content/uploads/2019/01/%C4%8Cernohorsk%C3%BD-reze%C5%88-plnen%C3%BD-%C5%A1ampi%C5%88%C3%B3novou-zmesou-2000x1500.jpg',
  //   [ new Ingredient('maso', 1), new Ingredient('zemiaky', 1)]),
  //   new Recipe('halusky',
  //     'bryndzove',
  //     'https://recepty.simaco.sk/wp-content/uploads/2019/01/%C4%8Cernohorsk%C3%BD-reze%C5%88-plnen%C3%BD-%C5%A1ampi%C5%88%C3%B3novou-zmesou-2000x1500.jpg',
  //     [ new Ingredient('bryndza', 1), new Ingredient('zemiaky', 7)])];
  private recipes: Recipe[] = [];


  getRecipes(){
    //aby sa vratilo nove pole a nie referencia na pole v service
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
