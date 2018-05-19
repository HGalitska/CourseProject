import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocTileComponent } from './doc-tile.component';

describe('DocTileComponent', () => {
  let component: DocTileComponent;
  let fixture: ComponentFixture<DocTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocTileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
