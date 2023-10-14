import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoAseguradoDialogComponent } from './mantenimiento-asegurado-dialog.component';

describe('MantenimientoAseguradoDialogComponent', () => {
  let component: MantenimientoAseguradoDialogComponent;
  let fixture: ComponentFixture<MantenimientoAseguradoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MantenimientoAseguradoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoAseguradoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
