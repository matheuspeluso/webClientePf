import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoEnderecoComponent } from './edicao-endereco.component';

describe('EdicaoEnderecoComponent', () => {
  let component: EdicaoEnderecoComponent;
  let fixture: ComponentFixture<EdicaoEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoEnderecoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicaoEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
