import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpencesListComponent } from './expences-list.component';

describe('ExpencesListComponent', () => {
  let component: ExpencesListComponent;
  let fixture: ComponentFixture<ExpencesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpencesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
