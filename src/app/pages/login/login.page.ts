import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UserLogedService } from 'src/app/core/services/api/user-loged.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userName: FormControl = new FormControl('');
  password: FormControl = new FormControl('');

  constructor(private userService: UserLogedService) { }

  ngOnInit() {
  }

  // Temporal
  verUsuariosConsole(): void {
    console.log(this.userService.user);
  }

}
