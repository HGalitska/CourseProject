import {Component, Input, OnInit} from '@angular/core';
import {DocumentsService} from "../../services/documents.service";

@Component({
  selector: 'app-submitted-tile',
  templateUrl: './submitted-tile.component.html',
  styleUrls: ['./submitted-tile.component.css']
})
export class SubmittedTileComponent implements OnInit {

  @Input() submittedTask;
  mark;
  documents = [];

  constructor(private documentsService: DocumentsService) { }

  ngOnInit() {
    if (this.submittedTask.mark == -1) {
      this.mark = "-";
    }
    else {
      this.mark = this.submittedTask.mark;
    }

    for (var i = 0; i < this.submittedTask.docs.length; i++) {
      this.documentsService.getDocumentById(this.submittedTask.docs[i], localStorage.getItem("currentToken")).subscribe(
        document => {
          this.documents.push(document);
        }
      )
    }

  }

}
