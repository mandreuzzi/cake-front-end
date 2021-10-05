import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioDolciComponent } from './dettaglio-dolci.component';

describe('DettaglioDolciComponent', () => {
  let component: DettaglioDolciComponent;
  let fixture: ComponentFixture<DettaglioDolciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioDolciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioDolciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
