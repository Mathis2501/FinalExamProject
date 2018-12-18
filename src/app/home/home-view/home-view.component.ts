import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
selectedFile: File = null;
wordlist: string[];

  constructor(private httpclient: HttpClient) {
    this.wordlist = [];
   }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  UploadFile() {
    const secretKey = 'sk_051b80e7f3c7ab5ec7ec953d';
    const fd = new FormData;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // tslint:disable-next-line:max-line-length
    this.httpclient.post<any>('https://api.openalpr.com/v2/recognize?recognize_vehicle=1&country=eu&secret_key=' + secretKey, fd, httpOptions)
    .subscribe(
      (val) => {
        console.log(val);
        val.results.forEach(result => {
          this.wordlist.push(result.candidates[0].plate);
        });
      },
      response => {
        console.log('POST call in error', response);
    },
    () => {
        console.log('The POST observable is now completed.');
    });
    }
}
