import { Component, OnInit } from '@angular/core';
import { CompService } from 'src/app/services/comp.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-complist',
	templateUrl: './complist.component.html',
	styleUrls: ['./complist.component.scss']
})
export class ComplistComponent implements OnInit {

	categorias: any[];
	editable: boolean = false;
	indexExpanded: number = -1;
	compSelected: any;
	motivoTroca: any;
	pecaTroca: string;
	motivos: { [key: string]: Object; }[];

	constructor(private route: Router,
		private compService: CompService,
		private notifyService: NotificationService) { }

	ngOnInit(): void {
		//FT-04# Get categories data via the API and fill list
		this.compService.getCategories()
			.subscribe(ret => {
				this.categorias = ret.items;
			}, error => {
				if (error.auth != null && !error.auth) {
					this.notifyService.showError("Não há usuário conectado. Faça login", "Erro!");
					this.route.navigateByUrl('/login');
				}
				else
					this.notifyService.showError("Não foi possível carregar a lista de categorias de peças.", "Erro!");
			});
	}

	//FT-04# Get categories data via the API and fill list
	onCategorySelect(item: any, index: number): void {
		this.indexExpanded = index == this.indexExpanded ? -1 : index;

		if (this.editable) {
			this.compService.getList(item.categoria)
				.subscribe(ret => {
					console.log(ret.items);
					item.pecas = ret.items;
				}, error => {
					this.notifyService.showError("Não foi possível carregar a lista de peças.", "Erro!");
				});
		}
		else {
			this.compService.getPart(item.categoria)
				.subscribe(ret => {
					item.pecas = [ret.part];
				}, error => {
					if (error.message == "Peça não encontrada!")
						this.notifyService.showError("Não há peça " + item.categoria.toLowerCase() + " instalada.", "Erro!");
					else
						this.notifyService.showError("Não foi possível carregar a peça instalada.", "Erro!");
				});
		}
	}

	//FT-04# Enable user data to edit and collapse items
	onEdit(): void {
		this.editable = true;
		this.indexExpanded = -1;

		this.compService.getReasons()
			.subscribe(ret => {
				this.motivos = ret.items;
			}, error => {
				this.notifyService.showError("Não foi possível carregar a lista de motivos de troca.", "Erro!");
			});
	}

	onCompSelect(categoria: string, peca: any): void {
		debugger;
		this.compSelected = { peca_id: peca.Peca_ID, categoria };
		this.pecaTroca = peca.nome + " - " + peca.modelo;
	}

	//FT-04# Send a update request to the API
	onSubmit(): void {
		this.compSelected.motivo_id = this.motivoTroca;
		this.compService.insertOrUpdate(this.compSelected)
			.subscribe(ret => {
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}

	//FT-04# Cancel edition of component
	onCancel(): void {
		this.editable = false;
	}
}
