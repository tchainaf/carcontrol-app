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

	//FT-02# Enable user data to edit
	onEdit(): void {
		this.editable = true;
	}

	//FT-02# Send a delete request to the API
	onDelete(): void {
		if (confirm('Você tem certeza que deseja remover sua conta?\nEssa ação é irreversível.')) {
			this.userService.delete()
				.subscribe(ret => {
					console.log(ret);
					this.notifyService.showSuccess(ret.message, "Sucesso!");
				}, error => {
					debugger;
					console.log(error);
					this.notifyService.showError(error.message, "Erro!");
				});
		}
	}

	//FT-02# Send a update request to the API
	onSubmit(): void {
		this.userService.update(this.usuario)
			.subscribe(ret => {
				console.log(ret);
				this.editable = false;
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				debugger;
				console.log(error);
				this.notifyService.showError(error.message, "Erro!");
			});
	}

	//FT-02# Cancel edition of user data
	onCancel(): void {
		this.editable = false;
		this.userService.read()
			.subscribe(ret => {
				console.log(ret);
				this.usuario = ret.user;
			}, error => {
				debugger;
				console.log(error);
				this.notifyService.showError(error.message, "Erro!");
			});
	}
}
