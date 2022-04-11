import { Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { LoadingService } from 'src/app/shared/loading.service';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { AuthResponseData, AuthService } from '../auth.service';




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

  constructor(private authService: AuthService, private loading: LoadingService, private router: Router,
    private componentResolver: ViewContainerRef) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    this.loading.toogleLoading();

    if(this.isLoginMode){
      this.observable = this.authService.login(authForm.form.value.email, authForm.form.value.password);
    }
    else{
      this.observable = this.authService.signup(authForm.form.value.email, authForm.form.value.password);
    }

    this.observable
      .subscribe({
        next: (response) => {
          this.router.navigate(['/recipe'])
          this.loading.toogleLoading();
        },
        error: (error) => {
          this.errorMessage = error.message;
          this.showErrorAlert();
          this.loading.toogleLoading();
        }
      });

    authForm.reset();
  }

  onModalClose() {
    this.errorMessage = "";
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
