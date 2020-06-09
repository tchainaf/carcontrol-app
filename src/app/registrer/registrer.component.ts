import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registrer',
  templateUrl: './registrer.component.html',
  styleUrls: ['./registrer.component.scss']
})
export class RegistrerComponent implements OnInit {

  constructor() { }
  
  nome:string;
  sobrenome:string;
  telefone:number;
  email:string;
  senha:string;
  quilometragem:number;

  ngOnInit(): void {
  }

}
