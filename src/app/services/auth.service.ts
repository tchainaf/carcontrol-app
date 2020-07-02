import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, throwError, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	apiUrl: string = 'http://localhost:3000/api/auth';
	@Output() getLoggedIn: EventEmitter<any> = new EventEmitter();

	constructor(private http: HttpClient, private cookieService: CookieService) { }

	//FT-01# Send the login request to the API
	login(email: string, senha: string): Observable<any> {
		var object = { email, senha };
		var httpRet = this.http.post(this.apiUrl + '/login', object)
			.pipe(
				catchError(this.handleError)
			);

		//#BF-02# Emit event when user logs in
		httpRet.subscribe(res => {
			this.getLoggedIn.emit(true);
			var obj: any = res;

			//#FT-01# Save jwt on a cookie
			this.cookieService.set('jwt', obj.token);
		}, error => {
			this.getLoggedIn.emit(false);
		});
		return httpRet;
	}

	//#BF-02# Emit event when user logs out
	logout(): void {
		this.cookieService.delete('jwt');
		this.getLoggedIn.emit(false);
	}

	//FT-01# Handle request API errors
	handleError(error: HttpErrorResponse) {
		let errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}\nDetails: ${error.error.details}`;
		console.log(errorMessage);
		return throwError(error.error);
	}
}
