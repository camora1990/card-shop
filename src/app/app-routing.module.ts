import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate,redirectLoggedInTo} from '@angular/fire/auth-guard';

const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () =>
			import('./modules/auth/auth.module').then((m) => m.AuthModule),
    ...canActivate(()=>redirectLoggedInTo(['card-shop']))
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
