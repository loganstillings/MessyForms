import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubInputComponent } from './sub-input.component';

describe('SubInputComponent', () => {
  let component: SubInputComponent;
  let fixture: ComponentFixture<SubInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
