import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './message/message.component';
import { AdminComponent } from './gps/gps.component';


const routes: Routes = [
  {path: 'message', component: HomeComponent},
  {path: 'gps', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
