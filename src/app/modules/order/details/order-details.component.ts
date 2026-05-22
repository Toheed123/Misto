import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { take, finalize } from 'rxjs';
import { sliderAnimation } from 'src/app/core/animation/slider.animation';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';
import { OrderService } from 'src/app/core/http/order.service';
import { AppService } from 'src/app/core/service/app.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-order-details',
  standalone: false,
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.scss',
  animations: [sliderAnimation],
})
export class OrderDetailsComponent {

  form: FormGroup;

  orderId: any;

  // =========================================
  // PAYMENT METHODS
  // =========================================

  paymentMethods = signal([
    { Value: 'Cash', Name: 'Cash' },
    { Value: 'UPI', Name: 'UPI' },
    { Value: 'Bank Transfer', Name: 'Bank Transfer' },
  ]);

  // =========================================
  // ORDER STATUS
  // =========================================

  orderStatusList = signal([
    { Value: 'Pending', Name: 'Pending' },
    { Value: 'Confirmed', Name: 'Confirmed' },
    { Value: 'Delivered', Name: 'Delivered' },
    { Value: 'Cancelled', Name: 'Cancelled' },
  ]);

  // =========================================
  // PAYMENT STATUS
  // =========================================

  paymentStatusList = signal([
    { Value: 'Pending', Name: 'Pending' },
    { Value: 'Paid', Name: 'Paid' },
    { Value: 'Failed', Name: 'Failed' },
  ]);

  // =========================================
  // ORDER TYPE
  // =========================================

  orderTypeList = signal([
    { Value: 'Online', Name: 'Online' },
    { Value: 'Offline', Name: 'Offline' },
  ]);

  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private googleSheetService: GoogleSheetService,
    private orderService: OrderService,
    private snackbarService: NotificationService,
    private formBuilder: FormBuilder,
  ) {

    this.activatedRoute.params
      .pipe(take(1))
      .subscribe((params) => {

        this.orderId = params['id'];

      });

    this.createForm();

  }

  // =========================================
  // ON INIT
  // =========================================

  ngOnInit() {

    this.getDetails();

  }

  // =========================================
  // CREATE FORM
  // =========================================

  createForm() {

    this.form = this.formBuilder.group({

      Date: [new Date(), [Validators.required]],

      OrderStatus: ['Pending', [Validators.required]],

      PaymentMethod: ['', [Validators.required]],

      PaymentStatus: ['Pending', [Validators.required]],

      DeliveryAddress: ['', [Validators.required]],

      Description: [''],

      OrderType: ['', [Validators.required]],

      Products: this.formBuilder.array([])

    });

  }

  // =========================================
  // CREATE PRODUCT FORM
  // =========================================

  createProductForm(product?: any): FormGroup {

    return this.formBuilder.group({

      ProductId: [
        product?.ProductId ?? '',
        [Validators.required]
      ],

      ProductName: [
        product?.ProductName ?? '',
        [Validators.required]
      ],

      Quantity: [
        product?.Quantity ?? 1,
        [Validators.required, Validators.min(1)]
      ],

      TotalAmount: [
        product?.TotalAmount ?? 0,
        [Validators.required, Validators.min(1)]
      ]

    });

  }

  // =========================================
  // PRODUCTS ARRAY
  // =========================================

  get products(): FormArray {

    return this.form.get('Products') as FormArray;

  }

  // =========================================
  // ADD PRODUCT
  // =========================================

  addProduct() {

    this.products.push(
      this.createProductForm()
    );

  }

  // =========================================
  // REMOVE PRODUCT
  // =========================================

  removeProduct(index: number) {

    if (this.products.length > 1) {

      this.products.removeAt(index);

    }

  }

  // =========================================
  // BACK
  // =========================================

  back() {

    this.route.navigate(["/orders"]);

  }

  // =========================================
  // GET DETAILS
  // =========================================

  getDetails() {

    setTimeout(() => {

      this.appService.setLoading(true);

      this.orderService.getOrderById(this.orderId)
        .pipe(
          take(1),
          finalize(() => this.appService.setLoading(false))
        )
        .subscribe((res) => {

          if (res && res.State) {

            // =================================
            // PATCH FORM
            // =================================

            this.form.patchValue({

              Date: moment(
                res.Data.Date,
                'DD/MM/yyyy'
              ).toDate(),

              OrderStatus: res.Data.OrderStatus,

              PaymentMethod: res.Data.PaymentMethod,

              PaymentStatus: res.Data.PaymentStatus,

              DeliveryAddress: res.Data.DeliveryAddress,

              Description: res.Data.Description,

              OrderType: res.Data.OrderType

            });

            // =================================
            // PRODUCT ARRAY
            // =================================

            this.products.clear();

            let productIds =
              String(res.Data.ProductId ?? '')
                .split(',');

            let productNames =
              String(res.Data.ProductName ?? '')
                .split(',');

            // Since total quantity and total amount
            // are stored as single value
            // divide equally for edit display

            let quantity =
              Number(res.Data.Quantity ?? 1);

            let totalAmount =
              Number(res.Data.TotalAmount ?? 0);

            for (let i = 0; i < productIds.length; i++) {

              this.products.push(

                this.createProductForm({

                  ProductId: productIds[i] ?? '',

                  ProductName: productNames[i] ?? '',

                  Quantity: quantity,

                  TotalAmount: totalAmount

                })

              );

            }

          }

        }, (error) => {

          console.error('Details error', error);

        });

    });

  }

  // =========================================
  // SUBMIT
  // =========================================

  onSubmit() {

    if (this.form.valid) {

      this.appService.setLoading(true);

      let formValues = this.form.getRawValue();

      // =====================================
      // FORMAT DATE
      // =====================================

      formValues.Date = moment(
        formValues.Date
      ).format('DD/MM/yyyy');

      // =====================================
      // PREPARE PRODUCT DATA
      // =====================================

      let productIds: any = [];
      let productNames: any = [];

      let totalQuantity = 0;

      let totalAmount = 0;

      formValues.Products.forEach((product: any) => {

        productIds.push(product.ProductId);

        productNames.push(product.ProductName);

        totalQuantity += Number(product.Quantity);

        totalAmount += Number(product.TotalAmount);

      });

      // =====================================
      // FINAL PAYLOAD
      // =====================================

      let payload = {

        OrderId: this.orderId,

        Date: formValues.Date,

        OrderStatus: formValues.OrderStatus,

        PaymentMethod: formValues.PaymentMethod,

        PaymentStatus: formValues.PaymentStatus,

        DeliveryAddress: formValues.DeliveryAddress,

        Description: formValues.Description,

        OrderType: formValues.OrderType,

        ProductId: productIds.join(','),

        ProductName: productNames.join(','),

        Quantity: totalQuantity,

        TotalAmount: totalAmount

      };

      console.log('Update payload', payload);

      // =====================================
      // API CALL
      // =====================================

      this.orderService.updateOrder(payload)
        .pipe(
          take(1),
          finalize(() => this.appService.setLoading(false))
        )
        .subscribe((res) => {

          if (res && res.State) {

            this.snackbarService.success(
              'Success',
              'Order updated successfully'
            );

            this.route.navigate(["/orders"]);

            this.appService.setRefreshMainMenu(true);

          } else {

            this.snackbarService.error(
              'Error',
              'Failed to update order'
            );

          }

          console.log('Update response', res);

        }, (error) => {

          this.snackbarService.error(
            'Error',
            'Failed to update order'
          );

          console.error('Update error', error);

        });

    }

  }

}
