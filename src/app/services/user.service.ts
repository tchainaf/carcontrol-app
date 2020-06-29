import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	apiUrl: string = 'http://localhost:3000/api/user';

	constructor(private http: HttpClient,
		private cookieService: CookieService) { }

	//FT-01# Send the create request to the API
	create(usuario: User): Observable<any> {
		return this.http.post(this.apiUrl + '/create', usuario)
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-02# Send the read request to the API
	read(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/read', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-02# Send the update request to the API
	update(usuario: User): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.post(this.apiUrl + '/update', usuario, { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-02# Send the delete request to the API
	delete(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.post(this.apiUrl + '/delete', null, { headers })
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
