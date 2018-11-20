import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective, FileItem } from 'ng2-file-upload/ng2-file-upload';
import { DataService } from '../app/data.service';
import { Observable } from 'rxjs';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FinalExamProject';

  constructor(private data: DataService) {}

  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: FileItem, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      this.data.handleImage(item.file.rawFile);
      alert('File uploaded successfully');
    };
  }
}
