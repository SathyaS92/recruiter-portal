import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionLinkRendererComponent } from './action-link-renderer.component';

describe('ActionLinkRendererComponent', () => {
  let component: ActionLinkRendererComponent;
  let fixture: ComponentFixture<ActionLinkRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActionLinkRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionLinkRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
