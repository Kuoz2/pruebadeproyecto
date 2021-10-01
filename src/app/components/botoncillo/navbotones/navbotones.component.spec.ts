import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbotonesComponent } from './navbotones.component';

describe('NavbotonesComponent', () => {
  let component: NavbotonesComponent;
  let fixture: ComponentFixture<NavbotonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbotonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbotonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
