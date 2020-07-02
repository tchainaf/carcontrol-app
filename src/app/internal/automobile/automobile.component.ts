import { Component, OnInit } from '@angular/core';
import { Automobile } from 'src/app/models/automobile.model';
import { AutomobileService } from 'src/app/services/automobile.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-automobile',
	templateUrl: './automobile.component.html',
	styleUrls: ['./automobile.component.scss']
})
export class AutomobileComponent implements OnInit {

	editable: boolean = false;
	auto: Automobile;
	quilometragem: number;
	tipoSelecionado: any;

	tipos: { [key: string]: Object; }[];
	public fieldsTypeAuto: Object = { text: 'tipo', value: 'Tipo_ID' };

	automoveis: { [key: string]: Object; }[];
	public fieldsAutomobile: Object = { text: 'Name', value: 'id_automovel' };

	constructor(private automobileService: AutomobileService,
		private notifyService: NotificationService) { }

	//FT-03# Get automobile data via the API and fill form
	ngOnInit(): void {
		this.automobileService.read()
			.subscribe(ret => {
				this.auto = ret.auto;
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}

	//FT-03# Enable automobile data to edit, get types data via the API and fill combobox
	onEdit(): void {
		this.editable = true;
		this.automobileService.getTypes()
			.subscribe(ret => {
				this.tipos = ret.items;
			}, error => {
				this.notifyService.showError("Não foi possível carregar a lista de tipo de veículos.", "Erro!");
			});
	}

	//FT-03# Get vehicles data via the API and fill combobox
	onTypeSelect(): void {
		if (this.tipoSelecionado == null) return;
		this.automobileService.getList(this.tipoSelecionado)
			.subscribe(ret => {
				this.automoveis = ret.items;
			}, error => {
				this.notifyService.showError("Não foi possível carregar a lista de veículos.", "Erro!");
			});
	}

	//FT-03# Send a update request to the API
	onSubmit(): void {
		this.automobileService.update(this.auto.automovel_id, this.quilometragem)
			.subscribe(ret => {
				this.editable = false;
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}

	//FT-03# Cancel edition of automobile data
	onCancel(): void {
		this.editable = false;
	}
}
