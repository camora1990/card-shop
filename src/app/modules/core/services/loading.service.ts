import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  showLoading: Subject<boolean> = new Subject()
  constructor() {
    this.showLoading.next(false)
   }
}
