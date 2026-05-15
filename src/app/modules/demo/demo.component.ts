import { Component } from '@angular/core';
import { FormGroup} from '@angular/forms';

@Component({
    selector: 'app-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    standalone: false
})
export class DemoComponent {

  form : FormGroup;

  constructor(){
    this.form = new FormGroup({

    })
  }
}
