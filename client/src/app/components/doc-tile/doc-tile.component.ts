import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Http} from "@angular/http";

@Component({
  selector: 'app-doc-tile',
  templateUrl: './doc-tile.component.html',
  styleUrls: ['./doc-tile.component.css']
})
export class DocTileComponent implements OnInit {

  @Input() doc;

  constructor(private router : Router, private http :Http) { }

  ngOnInit() {
  }

  downloadFile() {
    console.log(this.doc);
    console.log("downloaded");

    location.href = "";
    window.open("http://localhost:3000/uploads/" + this.doc.filePath, "_blank");

    // http://localhost:3000/uploads/Info.pdf-1526722019313

    // let b:any = new Blob([this.doc], { type: 'application/pdf' });
    // var url= window.URL.createObjectURL(b);
    // window.open(url);
  }

}
