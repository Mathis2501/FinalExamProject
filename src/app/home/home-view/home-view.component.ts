import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
selectedFile: File = null;

  constructor(private httpclient: HttpClient) { }

  ngOnInit() {
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  UploadFile(){
    const fd = new FormData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': '764da9f070ad481d87ce80f1b50c2fdc'
      })
    }
    fd.append('image', this.selectedFile, this.selectedFile.name)
    this.httpclient.post<any>('https://northeurope.api.cognitive.microsoft.com/vision/v2.0/ocr?language=unk&detectOrientation =true', fd, httpOptions)
      .subscribe(response => {console.log(response)});
  }

}
