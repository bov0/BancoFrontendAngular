import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetaCardDetailsComponent } from './tarjeta-card-details.component';

describe('TarjetaCardDetailsComponent', () => {
  let component: TarjetaCardDetailsComponent;
  let fixture: ComponentFixture<TarjetaCardDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetaCardDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetaCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
