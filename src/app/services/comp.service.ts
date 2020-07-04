import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})

export class CompService {
	apiUrl: string = 'http://localhost:3000/api/part';

	constructor(private http: HttpClient, private cookieService: CookieService) { }

	//FT-04# Get categories data via the API
	getCategories(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/getCategories', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-04# Get components data via the API
	getList(cat: string): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/getList/' + cat, { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-04# Get components data via the API
	getPart(cat: string): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/read/' + cat, { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-04# Get list of reasons to exchange via the API
	getReasons(): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.get(this.apiUrl + '/getReasons', { headers })
			.pipe(
				catchError(this.handleError)
			);
	}

	//FT-04# Send the update request to the API
	insertOrUpdate(obj: any): Observable<any> {
		var headers = new HttpHeaders().set('authorization', this.cookieService.get('jwt'));
		return this.http.post(this.apiUrl + '/put', obj, { headers })
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
