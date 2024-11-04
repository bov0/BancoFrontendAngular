import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTarjetaFormComponent } from './crear-tarjeta-form.component';

describe('CrearTarjetaFormComponent', () => {
  let component: CrearTarjetaFormComponent;
  let fixture: ComponentFixture<CrearTarjetaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTarjetaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTarjetaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
