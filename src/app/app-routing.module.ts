import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrerComponent } from './registrer/registrer.component';

const routes: Routes = [{
    path: 'login', 
    component: LoginComponent
    },
    {
    path: 'registrer',
    component: RegistrerComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
