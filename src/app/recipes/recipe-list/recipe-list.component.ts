import { Component, OnInit } from '@angular/core';
import {Recipe} from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [new Recipe('cernohor', 'prvy rezen', 'https://recepty.simaco.sk/wp-content/uploads/2019/01/%C4%8Cernohorsk%C3%BD-reze%C5%88-plnen%C3%BD-%C5%A1ampi%C5%88%C3%B3novou-zmesou-2000x1500.jpg'),
    new Recipe('cernohor', 'prvy rezen', 'https://recepty.simaco.sk/wp-content/uploads/2019/01/%C4%8Cernohorsk%C3%BD-reze%C5%88-plnen%C3%BD-%C5%A1ampi%C5%88%C3%B3novou-zmesou-2000x1500.jpg')];

  constructor() { }

  ngOnInit() {
  }

}
