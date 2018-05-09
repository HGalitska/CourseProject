import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlainnavbarComponent } from './plainnavbar.component';

describe('PlainnavbarComponent', () => {
  let component: PlainnavbarComponent;
  let fixture: ComponentFixture<PlainnavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlainnavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlainnavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
