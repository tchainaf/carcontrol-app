import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private authService: AuthService,
		private notifyService: NotificationService,
		private cookieService: CookieService) { }

	email: string;
	senha: string;


	ngOnInit(): void {

	}

	//FT-01# Send the login request to the API and show the returned message
	onSubmit(): void {
		this.authService.login(this.email, this.senha)
			.subscribe(ret => {
				console.log(ret);
				this.notifyService.showSuccess(ret.message, "Sucesso!");

				//#FT-01# Save jwt on a cookie
				if (ret.auth) {
					this.cookieService.set('jwt', ret.token);
				}
			}, error => {
				console.log(error);
				this.notifyService.showError(error.message, "Erro!");
			});
	}
}
