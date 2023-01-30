import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardLoginComponent } from './components/card-login/card-login.component';
import { MoleculesModule } from '../molecules/molecules.module';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
	declarations: [
    CardLoginComponent
  ],
	imports: [CommonModule,MoleculesModule,AtomsModule],
  exports:[CardLoginComponent]
})
export class OrganismsModule {}
