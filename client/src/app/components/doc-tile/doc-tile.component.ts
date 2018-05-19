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

    window.open("http://localhost:3000/uploads/" + this.doc.filePath, "_blank");
  }

}
