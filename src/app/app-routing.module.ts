import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	canActivate,
	redirectLoggedInTo,
	redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then((m) => m.AuthModule),
		...canActivate(() => redirectLoggedInTo(['card-shop'])),
	},
	{
		path: 'card-shop',
		loadChildren: () =>
			import('./modules/shop/shop.module').then((m) => m.ShopModule),
		...canActivate(() => redirectUnauthorizedTo(['auth/login'])),
	},
	{
		path: '**',
		redirectTo: 'auth',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
