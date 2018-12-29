import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeViewComponent } from './home/home-view/home-view.component';
import { InsuranceViewComponent } from './home/insurance-view/insurance-view.component';

const routes: Routes = [
{path: '', component: HomeViewComponent},
{path: 'forsikring', component: InsuranceViewComponent},
{path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
