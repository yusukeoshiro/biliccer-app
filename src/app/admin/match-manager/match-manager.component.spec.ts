import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchManagerComponent } from './match-manager.component';

describe('MatchManagerComponent', () => {
  let component: MatchManagerComponent;
  let fixture: ComponentFixture<MatchManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
