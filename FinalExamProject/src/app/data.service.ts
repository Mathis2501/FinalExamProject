import { Injectable } from '@angular/core';
import * as Tesseract from 'tesseract.js';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( ) {
  }

  handleImage(image: Tesseract.ImageLike) {
    Tesseract.recognize(image)
    .progress(message => console.log(message))
    .catch(err => console.error(err))
    .then(result => console.log(result))
    .finally(resultOrError => console.log(resultOrError));
    console.log(image);
  }
}
