import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarTransferenciaFormComponent } from './realizar-transferencia-form.component';

describe('RealizarTransferenciaFormComponent', () => {
  let component: RealizarTransferenciaFormComponent;
  let fixture: ComponentFixture<RealizarTransferenciaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RealizarTransferenciaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RealizarTransferenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
