import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/core/service/shared.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
    standalone: false
})
export class MyAccountComponent {
  myAccountForm: FormGroup;
  changePasswordForm: FormGroup;
  expandedAcc: 'myProfile' | 'changePassword' | null = 'myProfile'; 

   constructor(
    private sharedService : SharedService,
    private formBuilder : FormBuilder,
  ) {
    sharedService.setTitleName('Products');
  }

  ngOnInit(){
    this.createForm();
  }

  createForm(){
    this.myAccountForm = this.formBuilder.group({
      FirstName : ['', [Validators.required]],
      LastName : ['', [Validators.required]],
      Email : ['', [Validators.required, Validators.email]],
      PhoneNumber : ['', [Validators.required]],
      ISDCode : ['', [Validators.required]],
    });
    this.changePasswordForm = this.formBuilder.group({
      OldPassword : ['', [Validators.required]],
      NewPassword : ['', [Validators.required]],
      RepeatPassword : ['', [Validators.required]],
    });
  }

  get myAccountFormControl(){ return this.myAccountForm.controls };
  get changePasswordFormControl(){ return this.changePasswordForm.controls };

  expansiomChange(isExpanded: boolean, expnsionType: 'myProfile' | 'changePassword') {
    if (isExpanded) {
      this.expandedAcc = expnsionType; 
    } else if (this.expandedAcc === expnsionType) {
      this.expandedAcc = null;
    }
  }
}
