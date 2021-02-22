import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextHighlightRenderer } from './text-highlight-renderer.component';

describe('ActionLinkTBRCellRendererComponent', () => {
  let component: TextHighlightRenderer;
  let fixture: ComponentFixture<TextHighlightRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextHighlightRenderer ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextHighlightRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
