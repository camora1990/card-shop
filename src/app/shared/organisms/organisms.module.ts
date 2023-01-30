import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';
import { CardComponent } from './components/card/card.component';

@NgModule({
	declarations: [
    CardComponent
  ],
	imports: [CommonModule,MoleculesModule,AtomsModule],
  exports:[CardComponent]
})
export class OrganismsModule {}
