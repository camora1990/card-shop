import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OrganismsModule } from '../../shared/organisms/organisms.module';
import { AtomsModule } from '../../shared/atoms/atoms.module';
import { MoleculesModule } from '../../shared/molecules/molecules.module';
import { MyDeckComponent } from './pages/my-deck/my-deck.component';
import { CardShopComponent } from './pages/card-shop/card-shop.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RechargeComponent } from './pages/recharge/recharge.component';



@NgModule({
  declarations: [
    HomeComponent,
    MyDeckComponent,
    CardShopComponent,
    ProfileComponent,
    RechargeComponent,
    
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,OrganismsModule,AtomsModule,MoleculesModule
  ]
})
export class ShopModule { }
