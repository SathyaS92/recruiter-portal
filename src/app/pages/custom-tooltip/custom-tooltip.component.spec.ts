import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTooltip} from './custom-tooltip.component';

describe('CustomTooltipComponent', () => {
  let component: CustomTooltip;
  let fixture: ComponentFixture<CustomTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomTooltip]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTooltip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
