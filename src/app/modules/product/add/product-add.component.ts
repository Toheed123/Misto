import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { sliderAnimation } from 'src/app/core/animation/slider.animation';

@Component({
    selector: 'app-product-add',
    templateUrl: './product-add.component.html',
    styleUrls: ['./product-add.component.scss'],
    animations: [sliderAnimation],
    standalone: false
})
export class ProductAddComponent {



constructor(
  private route: Router,
) {
  
}

back(){
  this.route.navigate(["/products"])
}

}
