import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Project } from '../models/project.interface';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projectsCollection: AngularFirestoreCollection<Project>;
  private projects: Observable<Project[]>;

  constructor(db: AngularFirestore) {
    console.log('Constructor Service ProjectsService');
    this.projectsCollection = db.collection<Project>('projects');
    this.projects = this.projectsCollection.snapshotChanges().pipe(map(actions =>{
      return actions.map(a =>{
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return {id, ...data};
      });
}
));

   }
   getProjects(){
    console.log('console.log Service ProjectsService');
    return this.projects;
}

getProject(id: string){
  console.log('getProject Service ProjectsService');
  return this.projectsCollection.doc<Project>(id).valueChanges();

}

updateProject(project:Project, id: string){
  console.log('updateProject Service ProjectsService');
  return this.projectsCollection.doc(id).update(project);

}

addProject(project:Project){
  console.log('addProject Service ProjectsService');
  return this.projectsCollection.add(project);

}

removeProject(id: string){
  console.log("removeProject Service ProjectsService");
  return this.projectsCollection.doc(id).delete();

}


}
