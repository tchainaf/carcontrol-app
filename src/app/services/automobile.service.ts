import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})

export class AutomobileService {
	apiUrl: string = 'http://localhost:3000/api/auto';

	constructor(private http: HttpClient,
		private cookieService: CookieService) { }

	//FT-01# Get types data via the API
	getTypes(): Observable<any> {
		return this.http.get(this.apiUrl + '/getTypes')
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-01# Get vehicles data via the API
	getList(id_tipo: number): Observable<any> {
		return this.http.get(this.apiUrl + '/getList/' + id_tipo)
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-03# Send the read request to the API
	read(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/read', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-03# Send the update request to the API
	update(id_automovel: number, quilometragem: number): Observable<any> {
		var obj = { id_automovel, quilometragem };
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.post(this.apiUrl + '/update', obj, { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-05# Send the update kilometers request to the API
	updateKilometers(quilometragem: number): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.post(this.apiUrl + '/kilometers', { quilometragem }, { headers })
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
