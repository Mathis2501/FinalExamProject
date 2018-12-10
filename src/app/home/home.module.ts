import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import {HttpClientModule} from '@angular/common/http'

@NgModule({
  declarations: [HomeViewComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class HomeModule { }
