import { TestBed } from '@angular/core/testing';
import { MedireminderComponent } from './medireminder.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedireminderComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MedireminderComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'mediremind' title`, () => {
    const fixture = TestBed.createComponent(MedireminderComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('mediremind');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(MedireminderComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, mediremind');
  });
});
