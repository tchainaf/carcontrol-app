import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { User } from 'src/app/models/user.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	editable: boolean = false;
	usuario: User;

	constructor(private userService: UserService,
		private notifyService: NotificationService) { }

	//FT-02# Get user data via the API and fill form
	ngOnInit(): void {
		this.userService.read()
			.subscribe(ret => {
				console.log(ret);
				this.usuario = ret.user;
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				debugger;
				console.log(error);
				this.notifyService.showError(error.message, "Erro!");
			});
	}

}
