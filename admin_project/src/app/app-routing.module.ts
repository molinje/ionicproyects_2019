import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'admin', 
    loadChildren: './admin/admin.module#AdminPageModule',
    canActivate: [AuthGuard]
  },
  { path: 'project-list', loadChildren: './projects/project-list/project-list.module#ProjectListPageModule' },
  { path: 'project-create', loadChildren: './projects/project-create/project-create.module#ProjectCreatePageModule' },
  { path: 'project-edit/:id', loadChildren: './projects/project-edit/project-edit.module#ProjectEditPageModule' },
  { path: 'project-edit', loadChildren: './projects/project-edit/project-edit.module#ProjectEditPageModule' },
  { path: 'user-list', loadChildren: './users/user-list/user-list.module#UserListPageModule' },
  { path: 'user-edit', loadChildren: './users/user-edit/user-edit.module#UserEditPageModule' },
  { path: 'user-edit/:id', loadChildren: './users/user-edit/user-edit.module#UserEditPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
