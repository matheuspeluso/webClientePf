import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoClintesComponent } from './edicao-clintes.component';

describe('EdicaoClintesComponent', () => {
  let component: EdicaoClintesComponent;
  let fixture: ComponentFixture<EdicaoClintesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoClintesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicaoClintesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
