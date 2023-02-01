import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import { TitleComponent } from './components/title/title.component';
import { ButtonComponent } from './components/button/button.component';
import { SubtitleComponent } from './components/subtitle/subtitle.component';
import { BrandComponent } from './components/brand/brand.component';
import { RouterModule } from '@angular/router';
import { IconMenuComponent } from './components/icon-menu/icon-menu.component';
import { ItemMenuComponent } from './components/item-menu/item-menu.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { DropdownItemComponent } from './components/dropdown-item/dropdown-item.component';
import { ImageComponent } from './components/image/image.component';
import { TextComponent } from './components/text/text.component';

@NgModule({
	declarations: [
		IconComponent,
		TitleComponent,
		ButtonComponent,
		SubtitleComponent,
		BrandComponent,
		IconMenuComponent,
		ItemMenuComponent,
		AvatarComponent,
		DropdownItemComponent,
		ImageComponent,
		TextComponent,
	],
	imports: [CommonModule, RouterModule],
	exports: [
		IconComponent,
		TitleComponent,
		ButtonComponent,
		SubtitleComponent,
		BrandComponent,
		IconMenuComponent,
		ItemMenuComponent,
		AvatarComponent,
		DropdownItemComponent,
		ImageComponent,
		TextComponent,
	],
})
export class AtomsModule {}
