import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	isLogged: boolean = false;

	constructor(private route: Router,
		private authService: AuthService) { }

	//#BF-02# Subscribe to authentication service
	ngOnInit(): void {
		this.authService.getLoggedIn.subscribe(ret => {
			this.isLogged = ret;
		})

		this.authService.isLogged();
	}

	//#BF-02# Logout implemented
	logout(): void {
		this.authService.logout();
		this.route.navigateByUrl('');
	}
}
