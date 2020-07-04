import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})

export class DashService {
	apiUrl: string = 'http://localhost:3000/api/dash';

	constructor(private http: HttpClient, private cookieService: CookieService) { }

	//FT-06# Get data via the API
	getMainReason(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/getMainReason', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-06# Get data via the API
	getCategory(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/getCategory', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-06# Get data via the API
	getParts(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/getParts', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-06# Get data via the API
	getNextExchange(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/getNextExchange', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-06# Handle request API errors
	handleError(error: HttpErrorResponse) {
		let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
		console.log(errorMessage);
		return throwError(error.error);
	}
}
