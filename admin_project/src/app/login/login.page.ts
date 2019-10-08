import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../services/auth.service';
import { User } from '../shared/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = new User();
  constructor(private router: Router, private authSvc: AuthService) { }


  ngOnInit() {
  }

  async onLogin(){
    // llamamos el metodo onLogin de auth.service
    const user = await this.authSvc.onLogin(this.user);
    if(user){
      console.log('Successfully logged in!');
      this.router.navigateByUrl('/');
    } 

  }

}
