import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverListComponent } from './deliver-list.component';

describe('DeliverListComponent', () => {
  let component: DeliverListComponent;
  let fixture: ComponentFixture<DeliverListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliverListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliverListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
