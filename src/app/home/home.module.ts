import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeViewComponent } from './home-view/home-view.component';
import {HttpClientModule} from '@angular/common/http';
import { WordComponent } from './word/word.component'

@NgModule({
  declarations: [HomeViewComponent, WordComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class HomeModule { }
