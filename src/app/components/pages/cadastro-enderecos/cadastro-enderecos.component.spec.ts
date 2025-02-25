import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEnderecosComponent } from './cadastro-enderecos.component';

describe('CadastroEnderecosComponent', () => {
  let component: CadastroEnderecosComponent;
  let fixture: ComponentFixture<CadastroEnderecosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEnderecosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEnderecosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
