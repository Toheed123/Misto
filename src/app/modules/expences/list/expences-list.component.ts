
import { Component, signal } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, finalize, take } from 'rxjs';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';
import { AppService } from 'src/app/core/service/app.service';


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
    { columnDefination: 'Description', visibleYN: true }
  ]; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private googleSheetService: GoogleSheetService,

  ) {
    this.createForm();
  }

  ngOnInit() {
    this.getExpenceList();
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
    this.appService.setLoading(true);
    this.googleSheetService.getExpenceList()
      .pipe(take(1), finalize(() => this.appService.setLoading(false)))
      .subscribe((res) => {
        if(res && res.State ){
          this.dataSource.set(res.Data ?? []);
        }else{      
        }
      })
  }
}