import { Automobile } from './automobile.model';

export class User {
	id_usuario: number;
	nome: string;
	sobrenome: string;
	telefone: number;
	email: string;
	senha: string;
	quilometragem: number;
	automovel: Automobile;
}
