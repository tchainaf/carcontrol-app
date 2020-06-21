import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NewcompComponent } from './newcomp/newcomp.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
	path: 'login',
	component: LoginComponent
},
{
	path: 'register',
	component: RegisterComponent
},
{
	path: 'newcomp',
	component: NewcompComponent
},
{
	path: 'aboutus',
	component: AboutusComponent
},
{
	path: 'dashboard',
	component: DashboardComponent
},
{
	path: 'howitworks',
	component: HowitworksComponent
},
{
	path: '',
	component: HomeComponent,
	pathMatch: 'full'
}];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
