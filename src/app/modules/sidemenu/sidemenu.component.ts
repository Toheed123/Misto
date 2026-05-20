import { Component } from '@angular/core'
import { SharedService } from 'src/app/core/service/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/core/service/notification.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment.development';
import { AuthenticationService } from 'src/app/core/service/authentication.service';

export interface profile {
    profilePicturePath : string,
    Name : string,
    email : string
}
@Component( {
    selector: 'app-sidemenu',
    templateUrl: './sidemenu.component.html',
    styleUrls: ['./sidemenu.component.scss'],
    standalone: false
})

export class SideMenuComponent {
    appName: string;
    profileDetail : profile;
    menuItems = [
        {
            name : 'Dashboard',
            navigationUrl : 'dashboard',
            IconClass : 'Material',
            IconName: 'dashboard'
        },
        {
            name : 'Products',
            navigationUrl : 'products',
            IconClass : 'Material',
            IconName: 'view_module'
        },
        {
            name : 'Order',
            navigationUrl : 'order',
            IconClass : 'Material',
            
            IconName: 'add_shopping_cart'
        },
        {
            name : 'Expenses',
            navigationUrl : 'expences',
            IconClass : 'Material',
            IconName: 'money_off'
        }
        
    ]

    constructor(
        private sharedService: SharedService,
        private router : Router,
        private route : ActivatedRoute,
        private authenticationService : AuthenticationService,
        private notificationService : NotificationService,
        private snackBarService : MatSnackBar        
    ) {
        this.appName = environment.appName;
        this.profileDetail = {
            profilePicturePath : "../../../assets/LOGO_3.jpg",
            Name : 'Joe Miller',
            email : 'Joe@flowHour.in'
        }
    }

    ngOnInit(){
        // this.sharedService.sideMenuName.subscribe((val) => {
        // });
    }

    navigate(name: string) {
        // this.sharedService.sideMenuName.next(name);
        let url = name.toLowerCase();        
        this.router.navigate([url], {relativeTo: this.route})
        
    }

    logOut(){
        this.authenticationService.logOut();
    }
}