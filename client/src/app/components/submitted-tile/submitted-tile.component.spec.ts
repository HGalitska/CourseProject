import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittedTileComponent } from './submitted-tile.component';

describe('SubmittedTileComponent', () => {
  let component: SubmittedTileComponent;
  let fixture: ComponentFixture<SubmittedTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittedTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittedTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
