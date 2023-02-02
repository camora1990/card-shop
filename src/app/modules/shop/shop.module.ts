import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { OrganismsModule } from '../../shared/organisms/organisms.module';
import { AtomsModule } from '../../shared/atoms/atoms.module';
import { MoleculesModule } from '../../shared/molecules/molecules.module';
import { MyDeckComponent } from './pages/my-deck/my-deck.component';


@NgModule({
  declarations: [
    HomeComponent,
    MyDeckComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,OrganismsModule,AtomsModule,MoleculesModule
  ]
})
export class ShopModule { }
