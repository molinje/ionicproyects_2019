import { Component, OnInit } from '@angular/core';
import { TaskI } from '../../models/task.interface';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular'
@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.page.html',
  styleUrls: ['./todo-details.page.scss'],
})
export class TodoDetailsPage implements OnInit {

  todo: TaskI = {
    task:'',
    priority:0
  };
  TodoId = null;

  constructor(private route: ActivatedRoute,
              private nav: NavController,
              private todoService: TodoService,
              private loadingController: LoadingController ) { }

  ngOnInit() {
    this.TodoId = this.route.snapshot.params['id'];
    if(this.TodoId){
      this.loadTodo();
    }
  }

 async loadTodo(){
    const loading = await this.loadingController.create({
      message: 'Loading....'

    });
    await loading.present();
    this.todoService.getTodo(this.TodoId).subscribe(res=> {
      loading.dismiss();
      console.log(res);
      console.log(this.TodoId);
      this.todo = res;
    
    } );

  }

  async saveTodo(){
    const loading = await this.loadingController.create({
      message: 'Saving .....'

    });
    await loading.present();

   if(this.TodoId){
     //Update
     this.todoService.updateTodo(this.todo, this.TodoId).then(()=>{
       loading.dismiss();
       this.nav.navigateForward('/');

     });


   } else{
     // add nuevo

     this.todoService.addTodo(this.todo).then(()=>{
      loading.dismiss();
      this.nav.navigateForward('/');
    });

   }

  }

  async onRemove(idTodo:string){

    
    //const loading = await this.loadingController.create({
    //  message: 'Saving .....'

    //});
    //await loading.present();

    //this.todoService.getTodos(this.TodoId)
    this.todoService.removeTodo(idTodo);

  }


}
