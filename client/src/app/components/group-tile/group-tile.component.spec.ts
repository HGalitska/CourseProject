import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTileComponent } from './group-tile.component';

describe('GroupTileComponent', () => {
  let component: GroupTileComponent;
  let fixture: ComponentFixture<GroupTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
