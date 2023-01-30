import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { OrganismsModule } from '../../shared/organisms/organisms.module';
import { MoleculesModule } from '../../shared/molecules/molecules.module';

@NgModule({
	declarations: [LoginComponent],
	imports: [CommonModule, AuthRoutingModule,OrganismsModule,MoleculesModule],
})
export class AuthModule {}
