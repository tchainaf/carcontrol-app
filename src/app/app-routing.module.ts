import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './external/home/home.component';
import { LoginComponent } from './external/login/login.component';
import { RegisterComponent } from './external/register/register.component';
import { NewcompComponent } from './internal/newcomp/newcomp.component';
import { AboutusComponent } from './external/aboutus/aboutus.component';
import { HowitworksComponent } from './external/howitworks/howitworks.component';
import { DashboardComponent } from './internal/dashboard/dashboard.component';
import { ProfileComponent } from './internal/profile/profile.component';
import { AutomobileComponent } from './internal/automobile/automobile.component';
import { ComplistComponent } from './internal/complist/complist.component';

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
	path: 'automobile',
	component: AutomobileComponent
},
{
	path: 'profile',
	component: ProfileComponent
},
{
	path: 'complist',
	component: ComplistComponent
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
