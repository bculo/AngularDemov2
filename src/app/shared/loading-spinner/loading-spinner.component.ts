import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from '../loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  loadingClass = { display: 'none' };
  subscription!: Subscription;

  constructor(private loadingService: LoadingService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.loadingService.isLoading.subscribe(
      loading => {
        if(loading){
          this.loadingClass = { display: 'block' };
        }
        else{
          this.loadingClass = { display: 'none' };
        }
      }
    )
  }
}
