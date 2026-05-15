import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesDetailsComponent } from './expences-details.component';

describe('ExpencesDetailsComponent', () => {
  let component: ExpencesDetailsComponent;
  let fixture: ComponentFixture<ExpencesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpencesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpencesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
