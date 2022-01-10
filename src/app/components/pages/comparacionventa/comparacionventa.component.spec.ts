import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparacionventaComponent } from './comparacionventa.component';

describe('ComparacionventaComponent', () => {
  let component: ComparacionventaComponent;
  let fixture: ComponentFixture<ComparacionventaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparacionventaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparacionventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
