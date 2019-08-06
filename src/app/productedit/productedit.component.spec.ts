import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducteditComponent } from './productedit.component';

describe('ProducteditComponent', () => {
  let component: ProducteditComponent;
  let fixture: ComponentFixture<ProducteditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProducteditComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProducteditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
