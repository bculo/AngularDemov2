import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';

import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  isAuthenticated = false;

  constructor(private storage: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.store
      .select('auth')
      .pipe(map(authstate => {return authstate.user }))
      .subscribe(user => {
          this.isAuthenticated = (user) ? true : false;
      });
  }

  saveData(){
    this.storage.storeRecipes();
  }

  fetchData() {
    this.storage.fetchRecipes().subscribe();
  }

  onLogut() {
    this.store.dispatch(AuthActions.logut());
  }

}
