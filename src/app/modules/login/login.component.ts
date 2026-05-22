import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/service/authentication.service';
import { LoginService } from 'src/app/core/service/login.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    standalone: false
})
export class LoginComponent {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  signUpForm: FormGroup;
  selectedTabIndex: number = 0;
  isLoading: boolean = false;
  errorMessage: string = '';
  authResult: any = {
  AuthUser: {
      FirstName: 'Toheed',
      LastName: 'Shaikh',
      Email: 'toheeed@misto.com',
      PhoneNumber: 9898876543,
      AuthUserId: 145,
      MenuItems: [
        {
          name: 'Dashboard',
          navigationUrl: 'dashboard',
          IconClass: 'Material',
          IconName: 'dashboard',
        },
        {
          name: 'Products',
          navigationUrl: 'products',
          IconClass: 'Material',
          IconName: 'view_module',
        },
        {
          name: 'Order',
          navigationUrl: 'order',
          IconClass: 'Material',
          IconName: 'add_shopping_cart',
        },
      ],
    },
    AppName: 'Misto',
  };

  tabContainer = {
    forgotPassword: {
      tabIndex: 1,
      tabName: 'Forgot Password',
    },
    signUp: {
      tabIndex: 2,
      tabName: 'Sing Up',
    },
  };

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private loginService: LoginService,
    private snackBarService: NotificationService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: [[], [Validators.required]],
      password: [[], [Validators.required]],
    });
    this.forgotPasswordForm = this.formBuilder.group({
      email: [[], [Validators.required, Validators.email]],
    });
    this.signUpForm = this.formBuilder.group({
      Email: [[], [Validators.required, Validators.email]],
      Name: [[], [Validators.required]],
      Password: [[], [Validators.required]],
      PhoneNo: [[], [Validators.required]],
      ISDCode: [[], [Validators.required]],
      ConfirmPassword: [[], [Validators.required]],
    });
  }
  ngOnInIt() {
    
  }

  get loginFormControls() {
    return this.loginForm.controls;
  }

  get forgotPasswordFormControls() {
    return this.forgotPasswordForm.controls;
  }

  get signUpFormControls() {
    return this.signUpForm.controls;
  }

  changeTab(tabIndex: any) {
    this.selectedTabIndex = tabIndex;
  }

  cancel() {
    this.selectedTabIndex = 0;
  }

  OnClick() {
    // this.isLoading = true;
    // setTimeout(() => {
      
    //   // this.authenticationService.isLogin.next(true);
    //   this.authenticationService.setIsLoggedIn(true);
    //   this.authenticationService.setAuthResult(this.authResult);
    //   this.router.navigate(['./']);
    //   this.isLoading = false;
    // },);

    if(this.loginForm.valid){
      this.isLoading = true;
      const { userName, password } = this.loginForm.value;
      const user = this.loginService.credentials.find((cred) => cred.userName === userName && cred.password === password);
      if (user) {
        this.authenticationService.setIsLoggedIn(true);
        this.authenticationService.setAuthResult(user.AuthUser);
        this.router.navigate(['./']);
        this.isLoading = false;
      } else {
        this.errorMessage = 'Invalid username or password';
        this.isLoading = false;
      }
    }
  }
}
