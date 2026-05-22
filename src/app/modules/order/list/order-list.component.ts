import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { take, finalize, debounceTime } from 'rxjs';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';
import { OrderService } from 'src/app/core/http/order.service';
import { AppService } from 'src/app/core/service/app.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-order-list',
  standalone: false,
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss',
})
export class OrderListComponent {
  searchForm: FormGroup;

  filteredData: any[];

  dataSource = signal([]);

  columns = [
    { columnDefination: 'OrderId', visibleYN: true },
    { columnDefination: 'Date', visibleYN: true },
    { columnDefination: 'OrderStatus', visibleYN: true },
    { columnDefination: 'PaymentMethod', visibleYN: true },
    { columnDefination: 'PaymentStatus', visibleYN: true },
    { columnDefination: 'DeliveryAddress', visibleYN: true },
    { columnDefination: 'Description', visibleYN: true },
    { columnDefination: 'ProductId', visibleYN: true },
    { columnDefination: 'ProductName', visibleYN: true },
    { columnDefination: 'Quantity', visibleYN: true },
    { columnDefination: 'OrderType', visibleYN: true },
    { columnDefination: 'TotalAmount', visibleYN: true },
    { columnDefination: 'ActionBtn', visibleYN: true }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private dialiog: MatDialog,
    private orderService : OrderService,
    private snackbarService: NotificationService,
    private googleSheetService: GoogleSheetService,
  ) {
    this.createForm();
  }


  ngOnInit() {

    this.getOrderList();

    this.appService.refreshMainMenu$
      .subscribe((refresh) => {

        if (refresh) {

          this.getOrderList();

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

  createForm() {

    this.searchForm = this.formBuilder.group({

      searchInput: ['', []]

    });

  }


  getColumnDefination() {

    return this.columns
      .filter((column) => column.visibleYN == true)
      .map((val) => val.columnDefination);

  }


  get searchFormControls() {

    return this.searchForm.controls;

  }


  onSearch() {

    let searchInputValue =
      this.searchFormControls.searchInput.value?.toUpperCase();

    // Add filter logic here if needed

  }



  reset() {

    this.searchForm.reset();

  }


  addClicked() {

    this.router.navigate(
      ['add'],
      { relativeTo: this.route }
    );

  }

  getOrderList() {

    setTimeout(() => {

      this.appService.setLoading(true);

    });

    this.orderService.getOrderList()
      .pipe(
        take(1),
        finalize(() => this.appService.setLoading(false))
      )
      .subscribe((res) => {

        if (res && res.State) {

          this.dataSource.set(res.Data ?? []);

        } else {

          this.snackbarService.error(
            'Error',
            'Failed to fetch order list'
          );

        }

      });

  }

  editClicked(row: any) {

    this.router.navigate(
      [`edit/${row.OrderId}`],
      { relativeTo: this.route }
    );

  }

  invoiceClicked(row: any) {

    this.router.navigate(
      [`invoice/${row.OrderId}`],
      { relativeTo: this.route }
    );

  }

  deleteClicked(row: any) {

    setTimeout(() => {

      this.appService.setLoading(true);

    });

    this.orderService.deleteOrder(row.OrderId)
      .pipe(
        take(1),
        finalize(() => this.appService.setLoading(false))
      )
      .subscribe((res) => {

        if (res && res.State) {

          this.getOrderList();

          this.snackbarService.success(
            'Success',
            'Order deleted successfully'
          );

        } else {

          this.snackbarService.error(
            'Error',
            'Failed to delete order'
          );

        }

      }, (error) => {

        this.snackbarService.error(
          'Error',
          'Failed to delete order'
        );

        console.error('Delete error', error);

      });

  }


  confirmDialog(entity: any) {

    const dialogRef = this.dialiog.open(
      ConfirmDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Confirm Delete',
          message: 'Are you sure you want to delete this order?'
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

}