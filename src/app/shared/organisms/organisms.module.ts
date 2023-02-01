import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';
import { CardComponent } from './components/card/card.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
	declarations: [
    CardComponent,
    NavBarComponent
  ],
	imports: [CommonModule,MoleculesModule,AtomsModule],
  exports:[CardComponent,NavBarComponent]
})
export class OrganismsModule {}
