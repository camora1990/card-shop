import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { AtomsModule } from '../atoms/atoms.module';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
	declarations: [ButtonIconComponent, MenuComponent],
	imports: [CommonModule, AtomsModule],
	exports: [ButtonIconComponent,MenuComponent],
})
export class MoleculesModule {}
