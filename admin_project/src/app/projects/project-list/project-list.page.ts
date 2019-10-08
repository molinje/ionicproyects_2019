import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project.interface';
import { ProjectsService } from '../../services/projects.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.page.html',
  styleUrls: ['./project-list.page.scss'],
})
export class ProjectListPage implements OnInit {

  projects: Project[];

  constructor(private projectService:ProjectsService) {}

  ngOnInit(){
    console.log('project-list.page.ts metodo ngOnInit '  )
     this.projectService.getProjects().subscribe(res=>{
      // asignamos la respuesta de nuestro service 
      this.projects = res;
     });

  }

}