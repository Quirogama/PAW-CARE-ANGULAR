import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioPerfilComponent } from './veterinario-perfil.component';

describe('VeterinarioPerfilComponent', () => {
  let component: VeterinarioPerfilComponent;
  let fixture: ComponentFixture<VeterinarioPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioPerfilComponent]
    });
    fixture = TestBed.createComponent(VeterinarioPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
