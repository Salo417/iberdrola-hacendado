import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { IonInput } from '@ionic/angular';
import { UserLogedService } from 'src/app/core/services/api/user-loged.service';
import { FormControl } from '@angular/forms';
import { IUser } from 'src/app/core/classes/IUser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  @ViewChild('user')     user: IonInput;
  @ViewChild('password') pass: IonInput;

  userName: FormControl = new FormControl('');
  textPassword: FormControl = new FormControl('');


  constructor(private userService: UserLogedService, private location: Location) { }

  ngOnInit() {
  }

  signingUp(): void {

    /*
    if (this.user.value != null  ||  this.pass.value != null) {
      let user:     string = this.user.value.toString();
      let password: string = this.pass.value.toString();
      */
      let user:     string = this.userName.value.toString();
      let password: string = this.textPassword.value.toString();
      let createdUser: IUser = {email: user, password: password, picture: null}

/*
      this.userService.user = {user: user, password: password, picture: null}
      console.log(this.userService.user);
      */

      /*
      this.userService.user = {user: user, password: password, picture: null}
      console.log(this.userService.user);
      */
     this.userService.postUser(createdUser);

      this.location.back();

  }

}
