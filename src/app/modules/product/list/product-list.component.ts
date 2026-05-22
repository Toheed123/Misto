import { Component, signal} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, finalize, take } from 'rxjs';
import { ProductService } from 'src/app/core/http/product.service';
import { AppService } from 'src/app/core/service/app.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';
// import { isEqual } from 'lodash';


@Component({
    selector: ' app-productList',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: false
})


export class ProductListComponent {

  searchForm: FormGroup;

  filteredData: any[];

  dataSource = signal<any[]>([]);

  originalData: any[] = [];

  columns = [
    { columnDefination: 'Image', visibleYN: true },
    { columnDefination: 'ProductId', visibleYN: true },
    { columnDefination: 'ProductName', visibleYN: true },
    { columnDefination: 'Category', visibleYN: true },
    { columnDefination: 'Size', visibleYN: true },
    { columnDefination: 'Color', visibleYN: true },
    { columnDefination: 'Quantity', visibleYN: true },
    { columnDefination: 'SellingPrice', visibleYN: true },
    { columnDefination: 'DealerName', visibleYN: true },
    { columnDefination: 'ActionBtn', visibleYN: true }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private dialog: MatDialog,
    private productService: ProductService,
    private snackbarService: NotificationService,
  ) {

    this.createForm();

  }

  ngOnInit() {

    this.getProductList();

    this.appService.refreshMainMenu$
      .subscribe((refresh) => {

        if (refresh) {

          this.getProductList();

          this.appService.setRefreshMainMenu(false);

        }

      });

  }

  ngAfterViewInit() {

    this.searchForm.valueChanges
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {

        this.onSearch();

      });

  }

  // =====================================================
  // CREATE FORM
  // =====================================================

  createForm() {

    this.searchForm = this.formBuilder.group({

      searchInput: ['']

    });

  }

  // =====================================================
  // COLUMN DEFINATION
  // =====================================================

  getColumnDefination() {

    return this.columns
      .filter((column) => column.visibleYN == true)
      .map((val) => val.columnDefination);

  }

  // =====================================================
  // FORM CONTROLS
  // =====================================================

  get searchFormControls() {

    return this.searchForm.controls;

  }

  // =====================================================
  // SEARCH
  // =====================================================

  onSearch() {

    let searchInputValue =
      this.searchFormControls.searchInput.value?.toUpperCase();

    if (!searchInputValue) {

      this.dataSource.set(this.originalData);

      return;

    }

    this.filteredData = this.originalData.filter((product: any) => {

      return (
        product.ProductId?.toUpperCase().includes(searchInputValue) ||
        product.ProductName?.toUpperCase().includes(searchInputValue) ||
        product.Category?.toUpperCase().includes(searchInputValue) ||
        product.Color?.toUpperCase().includes(searchInputValue) ||
        product.DealerName?.toUpperCase().includes(searchInputValue)
      );

    });

    this.dataSource.set(this.filteredData);

  }

  // =====================================================
  // RESET
  // =====================================================

  reset() {

    this.searchForm.reset();

  }

  // =====================================================
  // ADD CLICKED
  // =====================================================

  addClicked() {

    this.router.navigate(
      ['add'],
      { relativeTo: this.route }
    );

  }

  // =====================================================
  // GET PRODUCT LIST
  // =====================================================

  getProductList() {

    setTimeout(() => {

      this.appService.setLoading(true);

    });

    this.productService.getProductList()
      .pipe(
        take(1),
        finalize(() => this.appService.setLoading(false))
      )
      .subscribe((res) => {

        if (res && res.State) {

          this.originalData = res.Data ?? [];

          this.dataSource.set(this.originalData);

        } else {

          this.snackbarService.error(
            'Error',
            'Failed to fetch product list'
          );

        }

      });

  }

  // =====================================================
  // EDIT CLICKED
  // =====================================================

  editClicked(row: any) {

    this.router.navigate(
      [`edit/${row.ProductId}`],
      { relativeTo: this.route }
    );

  }

  // =====================================================
  // DELETE CLICKED
  // =====================================================

  deleteClicked(row: any) {

    setTimeout(() => {

      this.appService.setLoading(true);

    });

    this.productService.deleteProduct(row.ProductId)
      .pipe(
        take(1),
        finalize(() => this.appService.setLoading(false))
      )
      .subscribe((res) => {

        if (res && res.State) {

          this.getProductList();

          this.snackbarService.success(
            'Success',
            'Product deleted successfully'
          );

        } else {

          this.snackbarService.error(
            'Error',
            'Failed to delete product'
          );

        }

      }, (error) => {

        this.snackbarService.error(
          'Error',
          'Failed to delete product'
        );

        console.error('Delete error', error);

      });

  }

  // =====================================================
  // CONFIRM DIALOG
  // =====================================================

  confirmDialog(entity: any) {

    const dialogRef = this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this product?'
        }
      }
    );

    dialogRef.afterClosed()
      .subscribe(result => {

        if (result) {

          this.deleteClicked(entity);

        }

      });

  }

  getImageUrl(url: string): string {

  if (!url) return '';

  // Extract file id
  const match = url.match(/\/d\/(.*?)\//);

  if (match && match[1]) {

    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;

  }

  return url;

}

}