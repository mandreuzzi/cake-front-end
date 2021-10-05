import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDolciComponent } from './lista-dolci.component';

describe('ListaDolciComponent', () => {
  let component: ListaDolciComponent;
  let fixture: ComponentFixture<ListaDolciComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaDolciComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDolciComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
