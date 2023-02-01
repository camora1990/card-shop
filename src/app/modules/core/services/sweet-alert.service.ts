import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
	providedIn: 'root',
})
export class SweetAlertService {
	constructor() {}
  private background: string = "#1e1e1e"

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
    });
  }

  confirmDialog(title:string = "Are you sure?", text: string = "You won't be able to revert this!" ,
  confirmButtonText:string="Yes, buy it!"){
    return Swal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      background: this.background,
    })
  }
}
