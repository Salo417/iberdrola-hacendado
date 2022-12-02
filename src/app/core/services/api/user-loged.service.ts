import { Injectable } from '@angular/core';
import { IUser } from 'src/app/core/classes/IUser';

@Injectable({
  providedIn: 'root'
})
export class UserLogedService {
  private _user: IUser;

  // Getters
  public get user(): (IUser | null) { return this._user; }

  // Setters
  public set user(user: IUser) {
    if (user.user.length <= 0) {
      console.log("Cadena no puede estár vacía. Arreglar esto en el futuro con throw exception y password también y otras variables y en el otro setter.");
    }

    this._user = user; 
  }
  constructor() { }
}
