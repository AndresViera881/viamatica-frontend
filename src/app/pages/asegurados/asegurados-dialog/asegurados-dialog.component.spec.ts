import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseguradosDialogComponent } from './asegurados-dialog.component';

describe('AseguradosDialogComponent', () => {
  let component: AseguradosDialogComponent;
  let fixture: ComponentFixture<AseguradosDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseguradosDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AseguradosDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
