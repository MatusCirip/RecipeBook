import { Injectable } from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import { RecipeService} from "./recipe.service";
import { Recipe} from "./recipe.model";
import {map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){
  }

  saveRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipebook-2643b.firebaseio.com/recipes.json', recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes(){
    return this.http.get<Recipe[]>('https://recipebook-2643b.firebaseio.com/recipes.json')
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
      }),
        tap(response => {
          this.recipeService.setRecipes(response);
        })
      );
  }
}
