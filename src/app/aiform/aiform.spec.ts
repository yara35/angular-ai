import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aiform } from './aiform';

describe('Aiform', () => {
  let component: Aiform;
  let fixture: ComponentFixture<Aiform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aiform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Aiform);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
