import { Automobile } from './automobile.model';

export class User {
	usuario_id: number;
	nome: string;
	sobrenome: string;
	telefone: number;
	email: string;
	senha: string;
	quilometragem: number;
	automovel: Automobile;
}
