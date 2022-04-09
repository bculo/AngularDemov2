import { Component, OnInit, ViewEncapsulation, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  isAuthenticated = false;

  constructor(private storage: DataStorageService, private authService: AuthService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe(
      (user) => {
        this.isAuthenticated = (user) ? true : false;
      }
    )
  }

  saveData(){
    this.storage.storeRecipes();
  }

  fetchData() {
    console.log("fetchData()");
    this.storage.fetchRecipes().subscribe();
  }

  onLogut() {
    this.authService.logout();
  }

}
