import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteTablaDetailComponent } from './cliente-tabla-detail.component';

describe('ClienteTablaDetailComponent', () => {
  let component: ClienteTablaDetailComponent;
  let fixture: ComponentFixture<ClienteTablaDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClienteTablaDetailComponent]
    });
    fixture = TestBed.createComponent(ClienteTablaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
