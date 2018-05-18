import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/documents';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: URL, itemAlias: 'document'
  });
  title = 'document';

  constructor() { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
    };

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("ImageUpload:uploaded:", item, status, response);
    };

    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      fileItem.file.push({ "title": this.title });
    };

  }

}
