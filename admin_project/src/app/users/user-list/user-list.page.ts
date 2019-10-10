import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.page.html',
  styleUrls: ['./user-list.page.scss'],
})
export class UserListPage implements OnInit {

  users: User[];

  constructor(private userService:UsersService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(res=>{
      // asignamos la respuesta de nuestro service 
      this.users = res;
     });
  }

}
