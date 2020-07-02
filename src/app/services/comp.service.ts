import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class CompService {
	apiUrl: string = 'http://localhost:3000/api/part';

	constructor(private http: HttpClient) { }

	//FT-04# Get categories data via the API
	getCategories(): Observable<any> {
		return this.http.get(this.apiUrl + '/getCategories')
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-04# Get components data via the API
	getList(id_cat: number): Observable<any> {
		return this.http.get(this.apiUrl + '/getList/' + id_cat)
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-04# Handle request API errors
	handleError(error: HttpErrorResponse) {
		let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
		console.log(errorMessage);
		return throwError(error.error);
	}
}
