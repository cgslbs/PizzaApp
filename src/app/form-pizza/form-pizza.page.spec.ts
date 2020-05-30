import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormPizzaPage } from './form-pizza.page';

describe('FormPizzaPage', () => {
  let component: FormPizzaPage;
  let fixture: ComponentFixture<FormPizzaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormPizzaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormPizzaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
