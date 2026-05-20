
import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, finalize, take } from 'rxjs';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';
import { AppService } from 'src/app/core/service/app.service';
import { NotificationService } from 'src/app/core/service/notification.service';
import { ConfirmDialogComponent } from 'src/app/shared/component/confirm-dialog/confirm-dialog.component';


interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-expences-list',
  standalone: false,
  templateUrl: './expences-list.component.html',
  styleUrl: './expences-list.component.scss',
})
export class ExpencesListComponent {
  searchForm: FormGroup;
  filteredData: Transaction[]
  dataSource = signal([]);
  columns = [
    { columnDefination: 'ExpenceId', visibleYN: true },
    { columnDefination: 'Date', visibleYN: true },
    { columnDefination: 'Exepence Type', visibleYN: true },
    { columnDefination: 'Amount', visibleYN: true },
    { columnDefination: 'Payment Method', visibleYN: true },
    { columnDefination: 'Transaction Id', visibleYN: true },
    { columnDefination: 'Description', visibleYN: true },
    { columnDefination: 'ActionBtn', visibleYN: true }
  ]; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private dialiog: MatDialog,
    private snackbarService : NotificationService,
    private googleSheetService: GoogleSheetService,

  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getExpenceList();

    this.appService.refreshMainMenu$.subscribe((refresh) => {
      if(refresh){
        this.getExpenceList();
        this.appService.setRefreshMainMenu(false);
      }
    })
  }

  ngAfterViewInit() {
    this.searchForm.valueChanges.pipe( /* distinctUntilChanged(isEqual) */ debounceTime(500))
      .subscribe((val) => {
        this.onSearch()
      })
  }

  createForm() {
    this.searchForm = this.formBuilder.group({
      searchInput: ['', []]
    })
  }

  getColumnDefination() {
    return this.columns.filter((column) => column.visibleYN == true).map((val) => val.columnDefination);
  }

  get searchFormControls() {
    return this.searchForm.controls;
  }

  onSearch() {
    // if(this.searchFormControls.searchInput.value){
    let searchInputValue = this.searchFormControls.searchInput.value.toUpperCase();
    // this.filteredData = this.transactions.filter((val) => val.item.toUpperCase().includes(searchInputValue))
    // }
  }

  reset() {
    this.searchForm.reset()
  }

  addClicked() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  getExpenceList() {
    setTimeout(() => {
      this.appService.setLoading(true);
    })
    this.googleSheetService.getExpenceList()
      .pipe(take(1), finalize(() => this.appService.setLoading(false)))
      .subscribe((res) => {
        if(res && res.State ){
          this.dataSource.set(res.Data ?? []);
        }else{      
          this.snackbarService.error('Error', 'Failed to fetch expence list');
        }
      })
  }

  editClicked(row: any){
    this.router.navigate([`edit/${row.ExepenceId}`], { relativeTo: this.route });

  }

  deleteClicked(row: any){
    setTimeout(() => {
      this.appService.setLoading(true);
    });
    this.googleSheetService.deleteExpense(row.ExepenceId)
      .pipe(take(1), finalize(() => this.appService.setLoading(false)))
      .subscribe((res) => {
        if(res && res.State ){
          this.getExpenceList();
          this.snackbarService.success('Success', 'Expence deleted successfully');
        }else{
          this.snackbarService.error('Error', 'Failed to delete expence');
        }
      }, (error) => {
        this.snackbarService.error('Error', 'Failed to delete expence');
        console.error('Delete error', error);
      })
  }

  confirmDialog(entity: any){
    const dialogRef = this.dialiog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this record?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteClicked(entity);
      }
    });
  }
}