import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	apiUrl: string = 'http://localhost:3000/api/user';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private http: HttpClient) { }

	//FT-01# Send the create request to the API
	create(nome: string, sobrenome: string, telefone: number, email: string, senha: string, id_automovel: number, quilometragem: number): Observable<any> {
		var object = { nome, sobrenome, telefone, email, senha, id_automovel, quilometragem };
		return this.http.post(this.apiUrl + '/create', object)
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-01# Handle request API errors
	handleError(error: HttpErrorResponse) {
		let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
		console.log(errorMessage);
		return throwError(error.error);
	}
}
