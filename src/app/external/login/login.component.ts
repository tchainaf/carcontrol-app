import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private route: Router,
		private authService: AuthService,
		private notifyService: NotificationService) { }

	email: string;
	senha: string;

	ngOnInit(): void {

	}

	//FT-01# Send the login request to the API and show the returned message
	onSubmit(): void {
		this.authService.login(this.email, this.senha)
			.subscribe(ret => {
				this.route.navigateByUrl('/dashboard');
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}
}
