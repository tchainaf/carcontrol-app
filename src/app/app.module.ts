import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from './services/notification.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AutomobileService } from './services/automobile.service';
import { NewcompComponent } from './newcomp/newcomp.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { FooterComponent } from './template/footer/footer.component';
import { HeaderComponent } from './template/header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		NewcompComponent,
		AboutusComponent,
		HowitworksComponent,
		FooterComponent,
		HeaderComponent,
		DashboardComponent,
		HomeComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot(),
		NgSelectModule
	],
	providers: [
		CookieService,
		NotificationService,
		AuthService,
		UserService,
		AutomobileService
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
