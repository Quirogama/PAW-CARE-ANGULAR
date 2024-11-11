import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioTablaDetailComponent } from './veterinario-tabla-detail.component';

describe('VeterinarioTablaDetailComponent', () => {
  let component: VeterinarioTablaDetailComponent;
  let fixture: ComponentFixture<VeterinarioTablaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioTablaDetailComponent]
    });
    fixture = TestBed.createComponent(VeterinarioTablaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
