
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, take } from 'rxjs';
import { GoogleSheetService } from 'src/app/core/http/google-sheet.service';


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
  searchForm : FormGroup;
  filteredData : Transaction[]
    column = [
      {columnDefination : 'item', visibleYN : true},
      {columnDefination : 'cost', visibleYN : true},
    ]    

    transactions: Transaction[] = [
      {item: 'Beach ball', cost: 4},
      {item: 'Towel', cost: 5},
      {item: 'Frisbee', cost: 2},
      {item: 'Sunscreen', cost: 4},
      {item: 'Cooler', cost: 25},
      {item: 'Swim suit', cost: 15},
      {item: 'Beach ball', cost: 4},
      {item: 'Towel', cost: 5},
      {item: 'Frisbee', cost: 2},
      {item: 'Sunscreen', cost: 4},
      {item: 'Cooler', cost: 25},
      {item: 'Swim suit', cost: 15},
      {item: 'Beach ball', cost: 4},
      {item: 'Towel', cost: 5},
      {item: 'Frisbee', cost: 2},
      {item: 'Sunscreen', cost: 4},
      {item: 'Cooler', cost: 25},
      {item: 'Swim suit', cost: 15},
    ];

    constructor(
      private formBuilder: FormBuilder,
      private router : Router,
      private route : ActivatedRoute,
      private googleSheetService : GoogleSheetService,
      
    ){
      this.createForm()
      this.filteredData = this.transactions
    }

    ngOnInit(){
      this.getExpenceList();
    }

    ngAfterViewInit(){
      this.searchForm.valueChanges.pipe( /* distinctUntilChanged(isEqual) */ debounceTime(500))
      .subscribe((val )=> {
        this.onSearch()
      })
    }

    createForm(){
      this.searchForm = this.formBuilder.group({
        searchInput : ['',[]]
      })
    }

    getColumnDefination(){
      return this.column.filter((column) => column.visibleYN == true).map((val) => val.columnDefination);
    }

    get searchFormControls(){
      return this.searchForm.controls;
    }

    onSearch(){
      // if(this.searchFormControls.searchInput.value){
      let searchInputValue = this.searchFormControls.searchInput.value.toUpperCase();
        this.filteredData = this.transactions.filter((val) => val.item.toUpperCase().includes(searchInputValue))
      // }
    }

    reset(){
      this.searchForm.reset()
      this.filteredData  = this.transactions
    }

    addProduct(){
      this.router.navigate(['add'], {relativeTo : this.route});
    }

    getExpenceList(){
      this.googleSheetService.getExpenceList()
      .pipe(take(1))
      .subscribe((res) => {
        console.log(res)
      })
    }
}