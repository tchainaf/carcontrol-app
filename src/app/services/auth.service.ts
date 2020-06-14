import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	apiUrl: string = 'http://localhost:3000/api/auth';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private http: HttpClient) { }

	//FT-01# Send the login request to the API
	login(email: string, senha: string): Observable<any> {
		var object = { email, senha };
		return this.http.post(this.apiUrl + '/login', object)
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-01# Handle request API errors
	handleError(error: HttpErrorResponse) {
		let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}\nDetails: ${error.error.details}`;
		console.log(errorMessage);
		return throwError(error.error);
	}
}
