import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesAddComponent } from './expences-add.component';

describe('ExpencesAddComponent', () => {
  let component: ExpencesAddComponent;
  let fixture: ComponentFixture<ExpencesAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpencesAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpencesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
