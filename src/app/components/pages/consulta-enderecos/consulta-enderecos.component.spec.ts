import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaEnderecosComponent } from './consulta-enderecos.component';

describe('ConsultaEnderecosComponent', () => {
  let component: ConsultaEnderecosComponent;
  let fixture: ComponentFixture<ConsultaEnderecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaEnderecosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaEnderecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
