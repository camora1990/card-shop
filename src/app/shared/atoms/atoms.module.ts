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
import { BadgeComponent } from './components/badge/badge.component';
import { LoadingComponent } from './components/loading/loading.component';
import { InputComponent } from './components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
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
		BadgeComponent,
		LoadingComponent,
		InputComponent,
	],
	imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
		BadgeComponent,
		LoadingComponent,
		InputComponent,
	],
})
export class AtomsModule {}
