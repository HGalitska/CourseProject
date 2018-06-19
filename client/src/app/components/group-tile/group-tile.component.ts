import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-group-tile',
  templateUrl: './group-tile.component.html',
  styleUrls: ['./group-tile.component.css']
})
export class GroupTileComponent implements OnInit {

  @Input() group;

  constructor(private router: Router) {
  }

  ngOnInit() {

  }

  openGroupPage() {
    this.router.navigate(['/admin/group', this.group._id])
  }

}
