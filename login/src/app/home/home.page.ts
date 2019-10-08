import { Component } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authSvc: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth 
    ) {

    }
  
  onLogout(){
    console.log('Inicia Logout');
    this.afAuth.auth.signOut();
    this.router.navigateByUrl('/login');

  }
}
