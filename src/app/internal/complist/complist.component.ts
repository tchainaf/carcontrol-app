import { Component, OnInit } from '@angular/core';
import { CompService } from 'src/app/services/comp.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
	selector: 'app-complist',
	templateUrl: './complist.component.html',
	styleUrls: ['./complist.component.scss']
})
export class ComplistComponent implements OnInit {

	categorias: any[];

	constructor(private compService: CompService,
		private notifyService: NotificationService) { }

	ngOnInit(): void {
		//FT-04# Get categories data via the API and fill list
		this.compService.getCategories()
			.subscribe(ret => {
				this.categorias = ret.items;
			}, error => {
				this.notifyService.showError("Não foi possível carregar a lista de categorias de peças.", "Erro!");
			});
	}

}
