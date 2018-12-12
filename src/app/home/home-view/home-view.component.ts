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

  onFileSelected(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = document.createElement('img');
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const MAX_WIDTH = 3200;
        const MAX_HEIGHT = 3200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const secondaryCtx = canvas.getContext('2d');
        secondaryCtx.drawImage(img, 0, 0, width, height);
        const dataurl = canvas.toDataURL('image/png');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    this.selectedFile = <File>event.target.files[0];
  }

  UploadFile() {
    const fd = new FormData;
    const httpOptions = {
      headers: new HttpHeaders({
        'Ocp-Apim-Subscription-Key': '764da9f070ad481d87ce80f1b50c2fdc'
      }),
    };
    fd.append('image', this.selectedFile, this.selectedFile.name);
    // tslint:disable-next-line:max-line-length
    this.httpclient.post<any>('https://northeurope.api.cognitive.microsoft.com/vision/v2.0/ocr?language=unk&detectOrientation =true', fd, httpOptions)
    .subscribe(
      (val) => {
        console.log(val);
        val.regions.forEach(region => {
          region.lines.forEach(line => {
            line.words.forEach(word => {
              console.log(word.text);
              this.wordlist.push(word.text);
            });
          });
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
