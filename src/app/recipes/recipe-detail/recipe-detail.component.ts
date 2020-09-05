import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from '../../shared/recipe.model';
import {ShoppingListService} from '../../shared/shopping-list.service';
import {Ingredient} from '../../shared/ingredient.model';
import {RecipeService} from '../../shared/recipe.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private shoppingService: ShoppingListService, private recipeService: RecipeService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
        //console.log(params['id']);
        //console.log(this.recipeService.getRecipe(0));

      }
    )
  }

  addToShoppingList() {
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
