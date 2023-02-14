import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	constructor() {}
	private background: string = '#1e1e1e';

	seccessMessage(
		message: string = 'Your work has been saved',
		timer: number = 1500,
	) {
		return Swal.fire({
			position: 'center',
			icon: 'success',
			title: message,
			showConfirmButton: false,
			timer: timer,
			background: this.background,
			showClass: {
				popup: 'animate__animated animate__fadeInDown'
			  },
			  hideClass: {
				popup: 'animate__animated animate__fadeOutUp'
			  }
		});
	}

	confirmDialog(
		title: string = 'Are you sure?',
		text: string = "You won't be able to revert this!",
		confirmButtonText: string = 'Yes, buy it!',
	) {
		return Swal.fire({
      color: '#ffffff',
			title: title,
			text: text,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: confirmButtonText,
			background: `${this.background} url(/assets/musellpage-masthead-dsk.6c842245.jpg) no-repeat`,
			showClass: {
				popup: 'animate__animated animate__fadeInDown'
			  },
			  hideClass: {
				popup: 'animate__animated animate__fadeOutUp'
			  }
		});
	}
	errorMessage(
		title: string = 'Oops...',
		text: string = 'Something went wrong',
	) {
		return Swal.fire({
			icon: 'error',
			iconColor: 'rgb(185 28 28)',
			title: title,
			text: text,
			background: `${this.background} url(/assets/captain-america-char.4b7f4c07.png) no-repeat`,
			color: '#ffffff',
			confirmButtonColor: 'rgb(185 28 28)',
			showClass: {
				popup: 'animate__animated animate__fadeInDown'
			  },
			  hideClass: {
				popup: 'animate__animated animate__fadeOutUp'
			  }
		});
	}
}
