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
    const MAX_WIDTH = 3200;
    const MAX_HEIGHT = 3200;
    const fileName = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    // tslint:disable-next-line:no-shadowed-variable
    reader.onload = event => {
        const img = new Image();
        // result exists typescript is wrong in assuming target is type EventTarget it is instead type FileReader
        img.src = event.target.result;
        img.onload = () => {
                const canvas = document.createElement('canvas');
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
                const ctx = canvas.getContext('2d');
                // img.width and img.height will give the original dimensions
                ctx.drawImage(img, 0, 0, width, height);
                ctx.canvas.toBlob((blob) => {
                    this.selectedFile = new File([blob], fileName, {
                        type: 'image/png',
                        lastModified: Date.now()
                    });
                }, 'image/png', 1);
            },
            reader.onerror = error => console.log(error);
    };
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
