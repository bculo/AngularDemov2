import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = new Subject<boolean>();
  loading: boolean = false;

  constructor() 
  { 
  }

  toogleLoading() {
    this.loading = !this.loading;
    this.isLoading.next(this.loading);
  }

  manageLoading(isLoading: boolean) {
    this.loading = isLoading;
    this.isLoading.next(this.loading);
  }
}
