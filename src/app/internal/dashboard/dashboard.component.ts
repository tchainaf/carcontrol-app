import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AutomobileService } from 'src/app/services/automobile.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	usuario: User;
	nextExchange: number;
	parts: number;
	mainReason: string;
	category: string;
	km: number;

	constructor(private userService: UserService,
		private dashService: DashService,
		private autoService: AutomobileService,
		private notifyService: NotificationService) { }

	ngOnInit(): void {
		//#FT-06# - Inclusion of dashboard data
		this.userService.read()
			.subscribe(ret => {
				this.usuario = ret.user;
			}, error => {
				this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
			});

		this.dashService.getMainReason()
			.subscribe(ret => {
				this.mainReason = ret.item.motivo;
			}, error => {
				this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
			});

		this.dashService.getCategory()
			.subscribe(ret => {
				this.category = ret.item.categoria;
			}, error => {
				this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
			});

		this.dashService.getParts()
			.subscribe(ret => {
				this.parts = ret.item.Qtd_pecas;
			}, error => {
				this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
			});

		this.dashService.getNextExchange()
			.subscribe(ret => {
				this.nextExchange = ret.item.menor_km;
			}, error => {
				this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
			});

		//if(this.parts == 0)
	}

	updateKilometers(): void {
		this.autoService.updateKilometers(this.km)
			.subscribe(ret => {
				this.usuario.quilometragem = this.km;
				this.km = null;
				this.notifyService.showSuccess(ret.message, "Sucesso!");
			}, error => {
				this.notifyService.showError(error.message, "Erro!");
			});
	}
}


