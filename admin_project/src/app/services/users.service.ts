import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;

  constructor(db: AngularFirestore) {
    console.log('Constructor User UsersService');
    this.usersCollection = db.collection<User>('users');
    this.users = this.usersCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
}
));

   }
   //Hasta aqui va el constructor
   getUsers(){
    console.log('console.log Service UsersService');
    return this.users;
   }


   getUser(id: string){
    console.log('getUser Service UsersService');
    return this.usersCollection.doc<User>(id).valueChanges();
  
  }

  updateUser(user:User, id: string){
    console.log('updateProject Service ProjectsService');
    return this.usersCollection.doc(id).update(user);
  
  }

  addUser(user:User){
    console.log('addProject Service ProjectsService');
    return this.usersCollection.add(user);
  
  }

  removeUser(id: string){
    console.log("removeProject Service ProjectsService");
    return this.usersCollection.doc(id).delete();
  
  }


}
