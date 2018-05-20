import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-member-tile',
  templateUrl: './member-tile.component.html',
  styleUrls: ['./member-tile.component.css']
})
export class MemberTileComponent implements OnInit {

  @Input() member;
  @Input() course;

  constructor(private router : Router) { }

  ngOnInit() {
  }

  openGroupPage(){
    this.router.navigate(['/profile/course', this.course._id, this.member._id])
  }

}
