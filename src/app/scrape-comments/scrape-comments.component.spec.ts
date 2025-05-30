import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrapeCommentsComponent } from './scrape-comments.component';

describe('ScrapeCommentsComponent', () => {
  let component: ScrapeCommentsComponent;
  let fixture: ComponentFixture<ScrapeCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScrapeCommentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScrapeCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
