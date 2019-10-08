import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../shared/user.class';
import {  AlertController } from '@ionic/angular';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLogged: any = false;

  constructor(public afAuth: AngularFireAuth,
              public alertController: AlertController) { 
    // este metodo nos devuelve un usuario en caso que 
    //haya un usuario logueado, si no nos devuelve null
    afAuth.authState.subscribe(user =>(this.isLogged = user));
  }
  
  //metodo login 
  // async = Funcion asincrona
  async onLogin (user: User){
    try{
      return await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    } catch (error){
    console.log("Error on login", error);
    this.presentAlert(error);
    }
  }
  //Register
  async onRegister (user: User){
    try{
      return await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
    } catch (error){
    console.log("Error on Register", error);
    this.presentAlert(error);
    }
    
  }

  async presentAlert(error:any){
    const  alert = await this.alertController.create(
      {
        header: error.code,
        subHeader: 'Subtitle',
        message: error.message,
        buttons: ['OK']
      }
    );
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);

  }

}
