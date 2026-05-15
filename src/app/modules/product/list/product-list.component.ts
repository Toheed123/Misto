import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
// import { isEqual } from 'lodash';

interface Transaction {
    item: string;
    cost: number;
  }

@Component({
    selector: ' app-productList',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss'],
    standalone: false
})


export class ProductListComponent{
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
      
    ){
      this.createForm()
      this.filteredData = this.transactions
    }

    ngOnInit(){

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
}