import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'messages', component: MessagesComponent },
  { path: 'user/:username', component: UserComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }