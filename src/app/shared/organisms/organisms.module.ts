import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtomsModule } from '../atoms/atoms.module';
import { CardComponent } from './components/card/card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MoleculesModule } from '../molecules/molecules.module';

@NgModule({
	declarations: [
    CardComponent,
    NavBarComponent
  ],
	imports: [CommonModule,AtomsModule,MoleculesModule],
  exports:[CardComponent,NavBarComponent]
})
export class OrganismsModule {}
