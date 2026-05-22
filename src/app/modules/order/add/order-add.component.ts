import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import moment from 'moment';
import { take, finalize } from 'rxjs';
import { sliderAnimation } from 'src/app/core/animation/slider.animation';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';
import { OrderService } from 'src/app/core/http/order.service';
import { AppService } from 'src/app/core/service/app.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-order-add',
  standalone: false,
  templateUrl: './order-add.component.html',
  styleUrl: './order-add.component.scss',
    animations: [sliderAnimation],
})
export class OrderAddComponent {

  form: FormGroup;


  paymentMethods = signal([
    { Value: 'Cash', Name: 'Cash' },
    { Value: 'UPI', Name: 'UPI' },
    { Value: 'Bank Transfer', Name: 'Bank Transfer' },
  ]);


  orderStatusList = signal([
    { Value: 'Pending', Name: 'Pending' },
    { Value: 'Confirmed', Name: 'Confirmed' },
    { Value: 'Delivered', Name: 'Delivered' },
    { Value: 'Cancelled', Name: 'Cancelled' },
  ]);


  paymentStatusList = signal([
    { Value: 'Pending', Name: 'Pending' },
    { Value: 'Paid', Name: 'Paid' },
    { Value: 'Failed', Name: 'Failed' },
  ]);


  orderTypeList = signal([
    { Value: 'Online', Name: 'Online' },
    { Value: 'Offline', Name: 'Offline' },
  ]);

  constructor(
    private route: Router,
    private appService: AppService,
    private googleSheetService: GoogleSheetService,
    private orderService : OrderService,
    private snackbarService: NotificationService,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }


  createForm() {

    this.form = this.formBuilder.group({

      OrderStatus: ['Pending', [Validators.required]],

      PaymentMethod: ['', [Validators.required]],

      PaymentStatus: ['Pending', [Validators.required]],

      DeliveryAddress: ['', [Validators.required]],

      Description: [''],

      OrderType: ['', [Validators.required]],
      Date: [new Date(), [Validators.required]],

      Products: this.formBuilder.array([
        this.createProductForm()
      ])

    });

  }

  createProductForm(): FormGroup {

    return this.formBuilder.group({

      ProductId: ['', [Validators.required]],

      ProductName: ['', [Validators.required]],

      Quantity: [
        1,
        [Validators.required, Validators.min(1)]
      ],

      Amount: [
        ,
        [Validators.required, Validators.min(1)]
      ]

    });

  }


  get products(): FormArray {

    return this.form.get('Products') as FormArray;

  }


  addProduct() {

    this.products.push(
      this.createProductForm()
    );

  }


  removeProduct(index: number) {

    if (this.products.length > 1) {

      this.products.removeAt(index);

    }

  }


  back() {

    this.route.navigate(["/orders"]);

  }


  onSubmit() {

    if (this.form.valid) {

      this.appService.setLoading(true);

      let formValues = this.form.getRawValue();


      let productIds : any = [];
      let productNames : any = [];
      let totalQuantity = 0;
      let totalAmount = 0;

      formValues.Products.forEach((product: any) => {

        // Product Id comma separated
        productIds.push(product.ProductId);

        // Product Name comma separated
        productNames.push(product.ProductName);

        // Total Quantity
        totalQuantity += Number(product.Quantity);

        // Total Amount
        totalAmount += Number(product.Amount);

      });


      let payload = {

        Date : moment(formValues.Date).format('DD/MM/yyyy'),

        OrderStatus: formValues.OrderStatus,

        PaymentMethod: formValues.PaymentMethod,

        PaymentStatus: formValues.PaymentStatus,

        DeliveryAddress: formValues.DeliveryAddress,

        Description: formValues.Description,

        OrderType: formValues.OrderType,

        // COMMA SEPARATED STRING
        ProductId: productIds.join(','),

        ProductName: productNames.join(','),

        Quantity: totalQuantity,

        TotalAmount: totalAmount

      };

      // =====================================
      // API CALL
      // =====================================

      this.orderService.addOrder(payload)
        .pipe(
          take(1),
          finalize(() => this.appService.setLoading(false))
        )
        .subscribe((res) => {

          if (res && res.State) {

            this.snackbarService.success(
              'Success',
              'Order added successfully'
            );

            this.route.navigate(["/orders"]);

            this.appService.setRefreshMainMenu(true);

          } else {

            this.snackbarService.error(
              'Error',
              'Failed to add order'
            );

          }

          console.log('Add response', res);

        }, (error) => {

          this.snackbarService.error(
            'Error',
            'Failed to add order'
          );

          console.error('Add error', error);

        });

    }

  }

}
