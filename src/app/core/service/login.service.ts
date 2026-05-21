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
    },
    }
  ]
  
}
