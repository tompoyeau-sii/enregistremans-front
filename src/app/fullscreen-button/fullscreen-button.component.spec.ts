import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullscreenButtonComponent } from './fullscreen-button.component';

describe('FullscreenButtonComponent', () => {
  let component: FullscreenButtonComponent;
  let fixture: ComponentFixture<FullscreenButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FullscreenButtonComponent]
    });
    fixture = TestBed.createComponent(FullscreenButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
