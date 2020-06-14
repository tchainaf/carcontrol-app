import { Component, OnInit } from '@angular/core';
import { AutomobileService } from '../services/automobile.service';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

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

	nome: string;
	sobrenome: string;
	telefone: number;
	email: string;
	senha: string;
	quilometragem: number;
	tipoSelecionado: any;
	automovelSelecionado: any;

	tipos: { [key: string]: Object; }[];
	public fieldsTypeAuto: Object = { text: 'tipo', value: 'Tipo_ID' };

	automoveis: { [key: string]: Object; }[];
	public fieldsAutomobile: Object = { text: 'Name', value: 'id_automovel' };

	//FT-01# Get types data via the API and fill combobox
	ngOnInit(): void {
		this.automobileService.getTypes()
			.subscribe(ret => {
				console.log(ret);
				this.tipos = ret.items;
			}, error => {
				console.log(error);
				this.notifyService.showError("Não foi possível carregar a lista de tipo de veículos.", "Erro!");
			});
	}

	//FT-01# Get vehicles data via the API and fill combobox
	onTypeSelect(): void {
		if (this.tipoSelecionado.length == 0) return;
		debugger;
		this.automobileService.getList(this.tipoSelecionado[0])
			.subscribe(ret => {
				console.log(ret);
				this.automoveis = ret.items;
			}, error => {
				console.log(error);
				this.notifyService.showError("Não foi possível carregar a lista de veículos.", "Erro!");
			});
	}

	//FT-01# Send the create request to the API and show the returned message
	onSubmit(): void {
		this.userService.create(this.nome, this.sobrenome, this.telefone, this.email, this.senha, this.automovelSelecionado[0], this.quilometragem)
			.subscribe(ret => {
				console.log(ret);
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				console.log(error);
				this.notifyService.showError(error.message, "Erro!");
			});
	}
}
