import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import {HttpClientModule} from '@angular/common/http';
import { WordComponent } from './word/word.component';
import { CarBoxComponent } from './car-box/car-box.component'
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomeViewComponent, WordComponent, CarBoxComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ]
})
export class HomeModule { }
