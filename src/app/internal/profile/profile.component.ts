import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Automobile } from 'src/app/models/automobile.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	editable: boolean = false;
	usuario: User;
	conf_senha: string;

	constructor(private route: Router,
		private authService: AuthService,
		private userService: UserService,
		private notifyService: NotificationService) { }

	//FT-02# Get user data via the API and fill form
	ngOnInit(): void {
		this.userService.read()
			.subscribe(ret => {
				this.usuario = ret.user;
				this.usuario.automovel = new Automobile;
				this.usuario.automovel.automovel_id = ret.user.Automovel_ID;
			}, error => {
				if (error.auth != null && !error.auth) {
					this.notifyService.showError("Não há usuário conectado. Faça login", "Erro!");
					this.route.navigateByUrl('/login');
				}
				else
					this.notifyService.showError(error.message, "Erro!");
			});
	}

	//FT-02# Enable user data to edit
	onEdit(): void {
		this.editable = true;
		this.usuario.senha = "";
	}

	//FT-02# Send a delete request to the API
	onDelete(): void {
		if (confirm('Você tem certeza que deseja remover sua conta?\nEssa ação é irreversível.')) {
			this.userService.delete()
				.subscribe(ret => {
					this.notifyService.showSuccess(ret.message, "Sucesso!");
					this.authService.logout();
					this.route.navigateByUrl('');
				}, error => {
					this.notifyService.showError(error.message, "Erro!");
				});
		}
	}

	//FT-02# Send a update request to the API
	onSubmit(): void {

		if (this.onValidate()) {
			return;
		}

		if (this.conf_senha != null && (this.usuario.senha != this.conf_senha)) {
			this.notifyService.showError("A senha e a confirmação de senha não são iguais!", "Erro!");
			return;
		}

		this.userService.update(this.usuario)
			.subscribe(ret => {
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}

	//FT-02# Cancel edition of user data
	onCancel(): void {
		this.editable = false;
		this.conf_senha = "";
		this.userService.read()
			.subscribe(ret => {
				this.usuario = ret.user;
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}

	//BF-03# Validation of inputs in the user registry
	onValidate(): boolean {
		var validation = false;
		if (this.usuario.nome == "" || this.usuario.nome == null || this.usuario.nome.length < 3) {
			this.notifyService.showError("Insira um nome válido!", "Erro!");
			validation = true
		}
		if (this.usuario.sobrenome == "" || this.usuario.sobrenome == null) {
			this.notifyService.showError("Insira um sobrenome válido!", "Erro!");
			validation = true
		}
		if (this.usuario.telefone == null) {
			this.notifyService.showError("Insira um telefone", "Erro!");
			validation = true
		}
		if (this.usuario.email.indexOf("@") == -1 || this.usuario.email.indexOf(".") == -1 || this.usuario.email == "" || this.usuario.email == null) {
			this.notifyService.showError("Insira email válido!", "Erro!");
			validation = true
		}

		return validation
	}
}
