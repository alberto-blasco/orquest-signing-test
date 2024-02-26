import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailHeaderComponent } from './employee-detail-header.component';

describe('EmployeeDetailHeaderComponent', () => {
  let component: EmployeeDetailHeaderComponent;
  let fixture: ComponentFixture<EmployeeDetailHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeDetailHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployeeDetailHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
