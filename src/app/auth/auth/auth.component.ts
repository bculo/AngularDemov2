import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { LoadingService } from 'src/app/shared/loading.service';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from '../auth.service';

import * as fromApp from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  observable!: Observable<AuthResponseData>;
  errorMessage: string = "";
  @ViewChild(PlaceholderDirective, {static: true}) componentPlaceholder!: PlaceholderDirective;
  closeSub!: Subscription;

  constructor(private loading: LoadingService,  private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.loading.manageLoading(authState.loading);
      this.errorMessage = authState.authError;
      if(this.errorMessage){
        this.showErrorAlert();
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.loading.toogleLoading();

    if(this.isLoginMode){
      //this.observable = this.authService.login(authForm.form.value.email, authForm.form.value.password);
      this.store.dispatch(AuthActions.loginStart({email: authForm.form.value.email, password: authForm.form.value.password}));
    }
    else{
      this.store.dispatch(AuthActions.signupStart({email: authForm.form.value.email, password: authForm.form.value.password}));
    }

    authForm.reset();
  }

  onModalClose() {
    this.store.dispatch(AuthActions.clearError());
  }

  private showErrorAlert() {
    const componentRef = this.componentPlaceholder.viewContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = this.errorMessage;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.componentPlaceholder.viewContainerRef.clear();
    });
  }

}
