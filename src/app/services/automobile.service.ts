import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class AutomobileService {
	apiUrl: string = 'http://localhost:3000/api/auto';
	headers = new HttpHeaders().set('Content-Type', 'application/json');

	constructor(private http: HttpClient) { }

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

	//FT-01# Handle request API errors
	handleError(error: HttpErrorResponse) {
		let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
		console.log(errorMessage);
		return throwError(error.error);
	}
}
