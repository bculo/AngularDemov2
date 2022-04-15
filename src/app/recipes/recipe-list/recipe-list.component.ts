import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.model';

import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription!: Subscription;

  constructor(private route: Router, 
    private activatedRoute: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store.select('recipes')
      .subscribe(state => {
        this.recipes = state.recipes;
      });
  }

  onNewRecipe () {
    this.route.navigate(["new"], {relativeTo: this.activatedRoute});
  }
}
