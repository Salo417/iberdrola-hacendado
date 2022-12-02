import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common'
import { IonInput } from '@ionic/angular';
import { UserLogedService } from 'src/app/core/services/api/user-loged.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  @ViewChild('user')     user: IonInput;
  @ViewChild('password') pass: IonInput;

  constructor(private userService: UserLogedService, private location: Location) { }

  ngOnInit() {
  }

  signingUp(): void {

    if (this.user.value != null  ||  this.pass.value != null) {
      let user:     string = this.user.value.toString();
      let password: string = this.pass.value.toString();


      this.userService.user = {user: user, password: password, picture: null}
      console.log(this.userService.user);
      this.location.back();
    }

  }

}
