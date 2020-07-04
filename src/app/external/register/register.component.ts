import { Component, OnInit } from '@angular/core';
import { AutomobileService } from '../../services/automobile.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user.model';
import { FormGroup } from '@angular/forms';
import { isNumber } from 'util';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	constructor(private automobileService: AutomobileService,
		private userService: UserService,
		private notifyService: NotificationService
	) { }

	usuario: User;
	tipoSelecionado: any;

	tipos: { [key: string]: Object; }[];
	public fieldsTypeAuto: Object = { text: 'tipo', value: 'Tipo_ID' };

	automoveis: { [key: string]: Object; }[];
	public fieldsAutomobile: Object = { text: 'Name', value: 'id_automovel' };

	//FT-01# Get types data via the API and fill combobox
	ngOnInit(): void {
		this.automobileService.getTypes()
			.subscribe(ret => {
				this.tipos = ret.items;
			}, error => {
				this.notifyService.showError("Não foi possível carregar a lista de tipo de veículos.", "Erro!");
			});
	}

	//FT-01# Get vehicles data via the API and fill combobox
	onTypeSelect(): void {
		if (this.tipoSelecionado == null) return;
		this.automobileService.getList(this.tipoSelecionado)
			.subscribe(ret => {
				this.automoveis = ret.items;
			}, error => {
				this.notifyService.showError("Não foi possível carregar a lista de veículos.", "Erro!");
			});
	}

	//FT-01# Send the create request to the API and show the returned message
	onSubmit(): void {

		if (this.onValidate()){
			return;
		}

		this.userService.create(this.usuario)
			.subscribe(ret => {
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}
	//BF-03# Validation of inputs in the user registry
	onValidate(): boolean {
		var validation = false;
		if (this.usuario.nome == "" || this.usuario.nome == null || this.usuario.nome.length < 3) {
			this.notifyService.showError("Insira um nome válido!","Erro!");
			validation = true
		}
		if (this.usuario.sobrenome == "" || this.usuario.sobrenome == null){
			this.notifyService.showError("Insira um sobrenome válido!","Erro!");
			validation = true
		}
		if (this.usuario.telefone == null){
			this.notifyService.showError("Insira um telefone","Erro!");
			validation = true
		}
		if (this.usuario.email.indexOf("@") == -1 || this.usuario.email.indexOf(".") == -1 || this.usuario.email == "" || this.usuario.email == null){
			this.notifyService.showError("Insira email válido!","Erro!");
			validation = true
		}
		if (this.usuario.senha == "" || this.usuario.senha == null || this.usuario.senha.length < 5) {
			this.notifyService.showError("Insira uma senha maior que 5 caracteres","Erro!");
			validation = true
		}
		return validation
	}

}



