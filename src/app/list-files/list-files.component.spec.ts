import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilesComponent } from './list-files.component';
import {HttpClientModule} from '@angular/common/http';

describe('ListFilesComponent', () => {
  let component: ListFilesComponent;
  let fixture: ComponentFixture<ListFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFilesComponent ],
      imports: [HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
