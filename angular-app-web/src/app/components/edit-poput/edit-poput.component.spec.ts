import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPoputComponent } from './edit-poput.component';

describe('EditPoputComponent', () => {
  let component: EditPoputComponent;
  let fixture: ComponentFixture<EditPoputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPoputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditPoputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
