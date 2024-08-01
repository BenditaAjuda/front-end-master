import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletarPrestadorComponent } from './completar-prestador.component';

describe('CompletarPrestadorComponent', () => {
  let component: CompletarPrestadorComponent;
  let fixture: ComponentFixture<CompletarPrestadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletarPrestadorComponent]
    });
    fixture = TestBed.createComponent(CompletarPrestadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
