import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoAseguradoComponent } from './mantenimiento-asegurado.component';

describe('MantenimientoAseguradoComponent', () => {
  let component: MantenimientoAseguradoComponent;
  let fixture: ComponentFixture<MantenimientoAseguradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoAseguradoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoAseguradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
