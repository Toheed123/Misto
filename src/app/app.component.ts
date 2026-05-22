import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { SharedService } from './core/service/shared.service';
import { AuthenticationService } from './core/service/authentication.service';
import { environment } from 'src/environments/environment';
import { AppService } from './core/service/app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent {
  title = environment.appName;
  iconName: string = '';
  name: string = ''
  profileDetail : any = {};
  constructor (
    private sharedService : SharedService,
    public appService : AppService,
    private router : Router,  
    private route : ActivatedRoute,
    public authenticationService : AuthenticationService,
  ){}

  ngOnInit(){   
    // this.sharedService.sideMenuName.subscribe ((val) => {
    //   console.log('value is' + val)
    //   this.iconName = val.toLowerCase();
    //   this.name = val.toUpperCase();
    // })
    this.profileDetail = {
            Name : this.authenticationService.getAuthResult?.FirstName ,
            Email : this.authenticationService.getAuthResult?.Email
        }
  }

  navigate(name: string) {
        // this.sharedService.sideMenuName.next(name);
        let url = name.toLowerCase();        
        this.router.navigate([url], {relativeTo: this.route})
    }

    logOut(){
        this.authenticationService.logOut();
        this.router.navigate(['/login']);
    }
}
