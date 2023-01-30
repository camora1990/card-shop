import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { AtomsModule } from '../atoms/atoms.module';

@NgModule({
	declarations: [ButtonIconComponent],
	imports: [CommonModule, AtomsModule],
	exports: [ButtonIconComponent],
})
export class MoleculesModule {}
