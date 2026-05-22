import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { take, finalize } from 'rxjs';
import { sliderAnimation } from 'src/app/core/animation/slider.animation';
import { ProductService } from 'src/app/core/http/product.service';
import { AppService } from 'src/app/core/service/app.service';
import { NotificationService } from 'src/app/core/service/notification.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  animations: [ sliderAnimation ]
})
export class ProductDetailComponent {

  form: FormGroup;

  productId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private productService: ProductService,
    private snackbarService: NotificationService,
    private formBuilder: FormBuilder,
  ) {

    this.activatedRoute.params
      .pipe(take(1))
      .subscribe((params) => {

        this.productId = params['id'];

      });

    this.createForm();

  }

  // =====================================================
  // ON INIT
  // =====================================================

  ngOnInit() {

    this.getDetails();

  }

  // =====================================================
  // CREATE FORM
  // =====================================================

  createForm() {

    this.form = this.formBuilder.group({

      ProductId: [
        '',
        [Validators.required]
      ],

      ProductName: [
        '',
        [Validators.required]
      ],

      Category: [
        '',
        [Validators.required]
      ],

      Size: [
        '',
        [Validators.required]
      ],

      Color: [
        '',
        [Validators.required]
      ],

      Quantity: [
        1,
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      SellingPrice: [
        '',
        [
          Validators.required,
          Validators.min(1)
        ]
      ],

      DealerName: [
        '',
        [Validators.required]
      ],

      ImageUrl: [
        ''
      ]

    });

  }

  // =====================================================
  // FORM CONTROLS
  // =====================================================

  get formControls() {

    return this.form.controls;

  }

  // =====================================================
  // BACK
  // =====================================================

  back() {

    this.router.navigate(['/products']);

  }

  // =====================================================
  // GET DETAILS
  // =====================================================

  getDetails() {

    setTimeout(() => {

      this.appService.setLoading(true);

    });

    this.productService.getProductById(this.productId)
      .pipe(
        take(1),
        finalize(() => this.appService.setLoading(false))
      )
      .subscribe((res) => {

        if (res && res.State) {

          this.form.patchValue({

            ProductId: res.Data.ProductId,

            ProductName: res.Data.ProductName,

            Category: res.Data.Category,

            Size: res.Data.Size,

            Color: res.Data.Color,

            Quantity: Number(res.Data.Quantity),

            SellingPrice: Number(res.Data.SellingPrice),

            DealerName: res.Data.DealerName,

            ImageUrl: res.Data.ImageUrl

          });

        } else {

          this.snackbarService.error(
            'Error',
            'Failed to fetch product details'
          );

        }

      }, (error) => {

        this.snackbarService.error(
          'Error',
          'Failed to fetch product details'
        );

        console.error('Details error', error);

      });

  }

  // =====================================================
  // SUBMIT
  // =====================================================

  onSubmit() {

    if (this.form.valid) {

      this.appService.setLoading(true);

      let formValues = this.form.getRawValue();

      let payload = {

        ProductId: formValues.ProductId,

        ProductName: formValues.ProductName,

        Category: formValues.Category,

        Size: formValues.Size,

        Color: formValues.Color,

        Quantity: Number(formValues.Quantity),

        SellingPrice: Number(formValues.SellingPrice),

        DealerName: formValues.DealerName,

        ImageUrl: formValues.ImageUrl

      };

      console.log('Update payload', payload);

      // =====================================
      // API CALL
      // =====================================

      this.productService.updateProduct(payload)
        .pipe(
          take(1),
          finalize(() => this.appService.setLoading(false))
        )
        .subscribe((res) => {

          if (res && res.State) {

            this.snackbarService.success(
              'Success',
              'Product updated successfully'
            );

            this.router.navigate(['/products']);

            this.appService.setRefreshMainMenu(true);

          } else {

            this.snackbarService.error(
              'Error',
              'Failed to update product'
            );

          }

          console.log('Update response', res);

        }, (error) => {

          this.snackbarService.error(
            'Error',
            'Failed to update product'
          );

          console.error('Update error', error);

        });

    }

  }

}
