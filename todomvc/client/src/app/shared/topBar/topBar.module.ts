import { NgModule } from '@angular/core';import { CommonModule } from '@angular/common';import { TopBarComponent } from './components/topBar/topBar.component';import { MaterialModule } from '../material/material.module';import { FlexLayoutModule } from '@angular/flex-layout';import { RouterModule } from '@angular/router';@NgModule({  imports: [CommonModule, MaterialModule, FlexLayoutModule, RouterModule],  declarations: [TopBarComponent],  exports: [TopBarComponent]})export class TopBarModule {}