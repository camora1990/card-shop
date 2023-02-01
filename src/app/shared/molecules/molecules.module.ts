import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonIconComponent } from './components/button-icon/button-icon.component';
import { AtomsModule } from '../atoms/atoms.module';
import { MenuComponent } from './components/menu/menu.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
	declarations: [ButtonIconComponent, MenuComponent, DropdownComponent],
	imports: [CommonModule, AtomsModule],
	exports: [ButtonIconComponent,MenuComponent,DropdownComponent],
})
export class MoleculesModule {}
