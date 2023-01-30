import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { TitleComponent } from './components/title/title.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
	declarations: [IconComponent, TitleComponent, ButtonComponent],
	imports: [CommonModule],
	exports: [IconComponent, TitleComponent, ButtonComponent],
})
export class AtomsModule {}
