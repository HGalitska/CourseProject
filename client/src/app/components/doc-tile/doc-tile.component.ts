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
  @Input() courseId;
  title;

  constructor(private router : Router, private http :Http, private documentsService : DocumentsService) { }

  ngOnInit() {
    this.title = this.doc.title;
    if (this.title.length > 30) {
      this.title = this.title.substring(0, 23) + "..." + this.title.substring(this.title.length - 5);
    }
  }

  downloadFile() {
    window.open("http://localhost:3000/uploads/" + this.doc.filePath, "_blank");
  }

  deleteFile(){
    var del = confirm("Do you really want to delete this file?");
    if (!del){
      return;
    }
    const docId = this.doc._id;


    this.documentsService.deleteDocumentById(docId, localStorage.getItem("currentToken")).subscribe(
      deleted => {
        this.router.navigate(['/profile/course/', this.courseId])
      }
    )


  }

}
