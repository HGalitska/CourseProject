import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {DocumentsService} from "../../services/documents.service";

@Component({
  selector: 'app-doc-tile',
  templateUrl: './doc-tile.component.html',
  styleUrls: ['./doc-tile.component.css']
})
export class DocTileComponent implements OnInit {

  @Input() doc;
  @Input() editMode;

  constructor(private router : Router, private http :Http, private documentsService : DocumentsService) { }

  ngOnInit() {
  }

  downloadFile() {
    window.open("http://localhost:3000/uploads/" + this.doc.filePath, "_blank");
  }

  deleteFile(){
    const docId = this.doc._id;

    this.documentsService.deleteDocumentById(docId, localStorage.getItem("currentToken")).subscribe(
      deleted => {
        console.log(deleted);
      }
    )


  }

}
