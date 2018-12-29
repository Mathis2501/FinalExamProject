import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-box',
  templateUrl: './car-box.component.html',
  styleUrls: ['./car-box.component.css']
})
export class CarBoxComponent implements OnInit {
 @Input() wordList: string[];

  constructor(private router: Router) {
   }

  ngOnInit() {
  }

  onSelect(wordList) {
    this.router.navigate(['forsikring'], { queryParams: { infoList: wordList } });
  }

}
