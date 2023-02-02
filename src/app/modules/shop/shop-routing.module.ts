import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MyDeckComponent } from './pages/my-deck/my-deck.component';
import { CardShopComponent } from './pages/card-shop/card-shop.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		children: [
			{
				path: '',
				pathMatch: 'full',
				redirectTo: '/card-shop/marvel',
			},
			{
				path: 'marvel',
				pathMatch: 'full',
				component: CardShopComponent,
			},
			{
				path: 'my-deck',
				component: MyDeckComponent,
			},
			{
				path: '**',
				redirectTo: 'card-shop',
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShopRoutingModule {}
