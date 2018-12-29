import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-insurance-view',
  templateUrl: './insurance-view.component.html',
  styleUrls: ['./insurance-view.component.css']
})
export class InsuranceViewComponent implements OnInit {
  wordList: any[];
  insuranceList: any[];
  sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.insuranceList = [];
    this.sub = this.route
      .queryParams
      .subscribe(params => {
        this.wordList = [];
        this.wordList = params['infoList'];
        console.log('pretending to call insurance service to get price for specific number plate');
        this.insuranceList.push('Standard: 15 kr om dagen');
        this.insuranceList.push('Premium: 18 kr om dagen');
        this.insuranceList.push('Euro Ncap: 3 stjerner');
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
