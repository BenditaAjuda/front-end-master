import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmaEmailComponent } from './confirma-email.component';

describe('ConfirmaEmailComponent', () => {
  let component: ConfirmaEmailComponent;
  let fixture: ComponentFixture<ConfirmaEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmaEmailComponent]
    });
    fixture = TestBed.createComponent(ConfirmaEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
