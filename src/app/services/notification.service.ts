import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
	providedIn: 'root'
})

export class NotificationService {
	constructor(private toastr: ToastrService) { }

	//#FT-01# Show success messages
	showSuccess(message, title) {
		this.toastr.success(message, title);
	}

	//#FT-01# Show error messages
	showError(message, title) {
		this.toastr.error(message, title);
	}

	//#FT-01# Show information messages
	showInfo(message, title) {
		this.toastr.info(message, title);
	}

	//#FT-01# Show warning messages
	showWarning(message, title) {
		this.toastr.warning(message, title);
	}
}
