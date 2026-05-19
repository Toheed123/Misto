import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { sliderAnimation } from 'src/app/core/animation/slider.animation';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';
import { AppService } from 'src/app/core/service/app.service';
import moment from 'moment';

@Component({
  selector: 'app-expences-add',
  standalone: false,
  templateUrl: './expences-add.component.html',
  styleUrl: './expences-add.component.scss',
  animations: [sliderAnimation],
})
export class ExpencesAddComponent {

  form: FormGroup;

  paymentMethods = signal([
    { Value: 'Cash', Name: 'Cash' },
    { Value: 'UPI', Name: 'UPI' },
    { Value: 'Bank Transfer', Name: 'Bank Transfer' },
  ]);

  expenceType = signal([
    { Value: 'Supplier', Name: 'Supplier' },
    { Value: 'Delivery', Name: 'Delivery' },
    { Value: 'Other', Name: 'Other' },
  ]);

  constructor(
    private route: Router,
    private appService: AppService,
    private googleSheetService: GoogleSheetService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      Date: [new Date(), [Validators.required]],
      ExpenceType: ['', [Validators.required]],
      Amount: [0, [Validators.required, Validators.min(0.01)]],
      PaymentMethod: ['', [Validators.required]],
      TransactionId: ['', []],
      Description: ['']
    })
  }

  back() {
    this.route.navigate(["/expences"])
  }

  onSubmit() {
    if (this.form.valid) {
      this.appService.setLoading(true);
      let formValues = this.form.getRawValue();
      formValues.Date = moment(formValues.Date).format('DD/MM/yyyy');
      this.googleSheetService.addUser(formValues)
        .pipe(take(1), finalize(() => this.appService.setLoading(false)))
        .subscribe(((res) => {
          console.log('Add response', res);
        }));
    }

  }

}
