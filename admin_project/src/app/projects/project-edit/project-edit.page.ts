import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.interface';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.page.html',
  styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {

  project: Project = {

    cliente: '',
    comp_id: '',
    date_beg: '',
    date_end: '',     
    project_name: '',
    status: ''
      };

  ProjectId = null;


  constructor( private route: ActivatedRoute,
    private nav: NavController,
    private projectService: ProjectsService,
    private loadingController: LoadingController  ) {

     }

  ngOnInit() {
    this.ProjectId = this.route.snapshot.params['id'];
    if(this.ProjectId){
      this.loadProject();
  }

}

  async loadProject(){
    const loading = await this.loadingController.create({
      message: 'Loading....'

    });
    await loading.present();
    this.projectService.getProject(this.ProjectId).subscribe(res=> {
      loading.dismiss();
      console.log(res);
      console.log(this.ProjectId);
      this.project = res;
    
    } );

  }

  
  async saveProject(){
    const loading = await this.loadingController.create({
      message: 'Saving .....'

    });
    await loading.present();

   if(this.ProjectId){
     //Update
     this.projectService.updateProject(this.project, this.ProjectId).then(()=>{
       loading.dismiss();
       this.nav.navigateForward('/');

     });


   } else{
     // add nuevo

     this.projectService.addProject(this.project).then(()=>{
      loading.dismiss();
      this.nav.navigateForward('/project-list');
    });

   }

  }

  async onRemove(idProject:string){

    
   // const loading = await this.loadingController.create({
   //   message: 'Saving .....'

   // });
   // await loading.present();

    //this.todoService.getTodos(this.TodoId)
    this.projectService.removeProject(idProject);

  }



}
