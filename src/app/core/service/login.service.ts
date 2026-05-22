import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  credentials = [
    {
      userName: 'toheed',
      password: 'toheed123',
      AuthUser: {
      FirstName: 'Toheed',
      LastName: 'Shaikh',
      Email: 'toheeed@misto.com',
      PhoneNumber: 9898876543,
      AuthUserId: 145,
      IsAdmin : true,
    },
    },
    {
      userName: 'misba',
      password: 'misba123',
      AuthUser: {
      FirstName: 'Misba',
      LastName: 'Shaikh',
      Email: 'misba@misto.com',
      PhoneNumber: 9898876543,
      AuthUserId: 146,
      IsAdmin : false,
    },
    },
    {
      userName: 'saniya',
      password: 'saniya123',
      AuthUser: {
      FirstName: 'Saniya',
      LastName: 'Shaikh',
      Email: 'saniya@misto.com',
      PhoneNumber: 9898876543,
      AuthUserId: 147,
      IsAdmin : false,
    },
    }
  ]
  
}
