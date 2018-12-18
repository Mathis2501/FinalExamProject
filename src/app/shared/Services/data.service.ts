import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  wordList: string[];
  resultList;

  constructor(private httpclient: HttpClient) { }


  ScanNumberPlate(selectedFile: File) {
    const secretKey = 'sk_051b80e7f3c7ab5ec7ec953d';
    const fd = new FormData;
    const httpOptions = {
      headers: new HttpHeaders({
      }),
    };
    fd.append('image', selectedFile, selectedFile.name);
    // tslint:disable-next-line:max-line-length
    this.httpclient.post<any>('https://api.openalpr.com/v2/recognize?recognize_vehicle=1&country=eu&secret_key=' + secretKey, fd, httpOptions)
    .subscribe(
      (val) => {
        console.log(val);
        val.results.forEach(result => {
          this.wordList = [];
          if (result.matches_template === 1) {
            if (result.candidates[0].confidence > 80) {
              this.wordList.push('Nummerplade: ' + result.candidates[0].plate);

              if (result.vehicle.make[0].confidence > 60) {
                this.wordList.push('Mærke: ' + result.vehicle.make[0].name.replace('_', ' '));
              } else {
                this.wordList.push('Mærke: ikke fundet');
              }

              if (result.vehicle.make_model[0].confidence > 50) {
                this.wordList.push('Model: ' + result.vehicle.make_model[0].name.replace('_', ' '));
              } else {
                this.wordList.push('Model: ikke fundet');
              }

              if (result.vehicle.color[0].confidence > 70) {
                this.wordList.push('Farve: ' + this.InterpretColor(result.vehicle.color[0].name));
              } else {
                this.wordList.push('Farve: ikke fundet');
              }

              if (result.vehicle.year[0].confidence > 60) {
                this.wordList.push('Årsinterval: ' + result.vehicle.year[0].name);
              }
            } else {
              this.wordList.push('Ingen nummerplade fundet');
            }
          }
          this.resultList.push(this.wordList);
        });
      },
      response => {
        console.log('POST call in error', response);
    },
    () => {
        console.log('The POST observable is now completed.');
    });
    return this.resultList;
  }


  InterpretColor(color: string) {
    switch (color) {
      case 'red':
        return 'rød';
      case 'black':
        return 'sort';
      case 'brown':
        return 'brun';
      case 'purple':
        return 'lilla';
      case 'green':
        return 'grøn';
      case 'silver-gray':
        return 'sølvgrå';
      case 'yellow':
        return 'gul';
      case 'white':
        return 'hvid';
      case 'blue':
        return 'blå';
      case 'gold-beige':
        return 'beige';

      default:
        return color;
    }
  }
}
