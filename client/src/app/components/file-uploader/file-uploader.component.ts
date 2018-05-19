import { Component, OnInit } from '@angular/core';
import {Http} from "@angular/http";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent implements OnInit {

  filesToUpload: Array<File> = [];

  constructor(private http:Http) { }

  ngOnInit() {
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);

    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   '+ formData.toString());
    this.http.post('http://localhost:3000/documents/', formData)
      .map(files => files.json())
      .subscribe(files => console.log('files', files))
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }

}
