import { Component, OnInit } from '@angular/core';
import { CompService } from 'src/app/services/comp.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-newcomp',
	templateUrl: './newcomp.component.html',
	styleUrls: ['./newcomp.component.scss']
})
export class NewcompComponent implements OnInit {

	categorias: any[];
	message: string = "Selecione uma Categoria";
	indexExpanded: number;
	compSelected: any;

	constructor(private route: Router,
		private compService: CompService,
		private notifyService: NotificationService) { }

	ngOnInit(): void {
		this.indexExpanded = -1;

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

		this.message = "Selecione a nova peça instalada";
		this.compService.getList(item.categoria)
			.subscribe(ret => {
				console.log(ret.items);
				item.pecas = ret.items;
			}, error => {
				this.notifyService.showError("Não foi possível carregar a lista de peças.", "Erro!");
			});

	}

	onCompSelect(categoria: string, peca_id: number): void {
		this.compSelected = { peca_id, categoria };
	}

	//FT-04# Send a insert request to the API
	onSubmit(): void {
		this.compSelected.motivo_id = 6; //ID for new components
		this.compService.insertOrUpdate(this.compSelected)
			.subscribe(ret => {
				this.notifyService.showSuccess(ret.message, "Sucesso!");
				this.ngOnInit();
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}
}
