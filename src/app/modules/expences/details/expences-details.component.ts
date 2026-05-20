import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { take, finalize } from 'rxjs';
import { sliderAnimation } from 'src/app/core/animation/slider.animation';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';
import { AppService } from 'src/app/core/service/app.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-expences-details',
  standalone: false,
  templateUrl: './expences-details.component.html',
  styleUrl: './expences-details.component.scss',
  animations: [sliderAnimation],
})
export class ExpencesDetailsComponent {

  form: FormGroup;
  expenceId: any;

  paymentMethods = signal([
    { Value: 'Cash', Name: 'Cash' },
    { Value: 'UPI', Name: 'UPI' },
    { Value: 'Bank Transfer', Name: 'Bank Transfer' },
  ]);

  ExepenceType = signal([
    { Value: 'Supplier', Name: 'Supplier' },
    { Value: 'Delivery', Name: 'Delivery' },
    { Value: 'Other', Name: 'Other' },
  ]);

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private googleSheetService: GoogleSheetService,
    private snackbarService : NotificationService,
    private formBuilder: FormBuilder,
  ) {
    this.activatedRoute.params.pipe(take(1))
      .subscribe((params) => {
        this.expenceId = params['id'];
      });
    this.createForm();    
  }

  ngOnInit() {
    this.getDetails();
  }

  createForm() {
    this.form = this.formBuilder.group({
      Date: [new Date(), [Validators.required]],
      ExepenceType: ['', [Validators.required]],
      Amount: [, [Validators.required, Validators.min(0.01)]],
      PaymentMethod: ['', [Validators.required]],
      TransactionId: ['', []],
      Description: ['']
    })
  }

  back() {
    this.route.navigate(["/expences"])
  }

  getDetails() {
    setTimeout(() => {
      this.appService.setLoading(true);
      this.googleSheetService.getExpenceById(this.expenceId)
        .pipe(take(1), finalize(() => this.appService.setLoading(false)))
        .subscribe((res) => {
          if(res && res.State){
            this.form.patchValue({
              ...res.Data,
              Date: moment(res.Data.Date, 'DD/MM/yyyy').toDate()
            });
          }
        }, (error) => {
          console.error('Details error', error);
        });
    })
  }

  onSubmit() {
    if (this.form.valid) {
      this.appService.setLoading(true);
      let formValues = this.form.getRawValue();
      formValues.ExepenceId = this.expenceId;
      formValues.Date = moment(formValues.Date).format('DD/MM/yyyy');
      this.googleSheetService.updateExpense(formValues)
        .pipe(take(1), finalize(() => this.appService.setLoading(false)))
        .subscribe((res) => {
          if(res && res.State){
            this.snackbarService.success('Success', 'Expence updated successfully');
            this.route.navigate(["/expences"]);
            this.appService.setRefreshMainMenu(true);
          }else{
            this.snackbarService.error('Error', 'Failed to update expence');
          }
          console.log('Update response', res);
        }, (error) => {
          this.snackbarService.error('Error', 'Failed to update expence');
          console.error('Update error', error);
        });
    }

  }

}

