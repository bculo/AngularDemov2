import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from 'src/app/shared/loading.service';
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

  constructor(private authService: AuthService, private loading: LoadingService, private router: Router) { }

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
          this.loading.toogleLoading();
        }
      });

    authForm.reset();
  }

}
