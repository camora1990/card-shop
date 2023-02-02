import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyDeckComponent } from './pages/my-deck/my-deck.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: 'my-deck',
				component: MyDeckComponent,
			},
			{
				path:"**",
				redirectTo:"card-shop"
			}
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShopRoutingModule {}
