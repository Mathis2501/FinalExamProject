import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from 'src/app/shared/Services/data.service';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
selectedFile: File;
wordList: string[];
resultList;

  constructor(private httpclient: HttpClient, private dataService: DataService) {
   }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    this.resultList = [];
    this.wordList = [];
    this.selectedFile = event.target.files[0];
    this.DummyScanNumberPlate();
    // this.ScanNumberPlate();
  }

  ScanNumberPlate() {
   this.resultList = this.dataService.ScanNumberPlate(this.selectedFile);
  }

  DummyScanNumberPlate() {
    this.wordList.push('test');
    this.wordList.push('test');
    this.wordList.push('test');
    this.wordList.push('test');
    this.resultList.push(this.wordList);
    this.resultList.push(this.wordList);
    this.resultList.push(this.wordList);
    this.resultList.push(this.wordList);
  }

}
