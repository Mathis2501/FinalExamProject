import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-car-box',
  templateUrl: './car-box.component.html',
  styleUrls: ['./car-box.component.css']
})
export class CarBoxComponent implements OnInit {
 @Input() wordList: string[];

  constructor() {
   }

  ngOnInit() {
  }

}
