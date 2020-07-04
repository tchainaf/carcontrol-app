import { Component, OnInit } from '@angular/core';
import { DashService } from 'src/app/services/dash.service';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';

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

  constructor(private userService: UserService, private dashService: DashService, private notifyService: NotificationService) {

  }

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
		this.mainReason = ret.item;
	}, error => {
		this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
	});

	this.dashService.getCategory()
	.subscribe(ret => {
		this.category = ret.item;
	}, error => {
		this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
	});

	this.dashService.getParts()
	.subscribe(ret => {
		this.parts = ret.item;
	}, error => {
		this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
	});

	this.dashService.getNextExchange()
	.subscribe(ret => {
		this.nextExchange = ret.item;
	}, error => {
		this.notifyService.showError("Não foi possível carregar seus dados", "Erro!");
	});

  }
}


