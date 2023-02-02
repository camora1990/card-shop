import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserModel } from '../../../core/domain/entities/user.model';
import { UserService } from '../../../core/services/user.service';
import { tap, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
	user: UserModel | null = null;
	suscriptions: Subscription[] = [];
	constructor(private $user: UserService, private $route: Router, private $loading:LoadingService) {}
	ngOnDestroy(): void {
		this.suscriptions.forEach((e) => e.unsubscribe());
	}

	ngOnInit(): void {
		this.$loading.showLoading.next(true)
		this.suscriptions.push(
			this.$user
				.getUser(this.$user.currenUser?.uid!)
				.pipe(tap((user) => (this.user = user[0])))
				.subscribe(()=>this.$loading.showLoading.next(false)),
		);
	}

	click(event: MouseEvent) {
		this.$route.navigate(['/card-shop']);
	}
}
