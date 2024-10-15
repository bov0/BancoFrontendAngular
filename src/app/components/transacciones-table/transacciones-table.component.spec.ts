import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesTableComponent } from './transacciones-table.component';

describe('TransaccionesTableComponent', () => {
  let component: TransaccionesTableComponent;
  let fixture: ComponentFixture<TransaccionesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransaccionesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransaccionesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
