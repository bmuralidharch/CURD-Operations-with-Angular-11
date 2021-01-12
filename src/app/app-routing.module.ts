import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { CreateuserComponent } from './createuser/createuser.component';


const routes: Routes = [
 {path : '' , component : UsersComponent },
 {path : 'create' , component : CreateuserComponent },
 {path: 'edit/:id', component: CreateuserComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
