import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCardDetailsComponent } from './cuenta-card-details.component';

describe('CuentaCardDetailsComponent', () => {
  let component: CuentaCardDetailsComponent;
  let fixture: ComponentFixture<CuentaCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaCardDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
