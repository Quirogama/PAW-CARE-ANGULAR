import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioEditComponent } from './veterinario-edit.component';

describe('VeterinarioEditComponent', () => {
  let component: VeterinarioEditComponent;
  let fixture: ComponentFixture<VeterinarioEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VeterinarioEditComponent]
    });
    fixture = TestBed.createComponent(VeterinarioEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
