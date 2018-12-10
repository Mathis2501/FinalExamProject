import { Injectable } from '@angular/core';
import * as Tesseract from '../../node_modules/tesseract.js/dist/tesseract.js';
//import * as cv from 'opencv4nodejs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( ) {
  }

  handleImage(image: Tesseract.ImageLike) {

    // const mat = cv.imread(image);
    // const gray = mat.bgrToGray();
    // cv.imwrite('./img.png', gray);

    Tesseract.recognize(image)
    .progress(message => console.log(message))
    .catch(err => console.error(err))
    .then(result => console.log(result))
    .finally(resultOrError => console.log(resultOrError));
    console.log(image);
  }
}
