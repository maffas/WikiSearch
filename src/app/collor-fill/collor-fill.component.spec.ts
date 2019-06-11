import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollorFillComponent } from './collor-fill.component';

describe('CollorFillComponent', () => {
  let component: CollorFillComponent;
  let fixture: ComponentFixture<CollorFillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollorFillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollorFillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
