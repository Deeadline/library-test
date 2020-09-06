import {TestBed} from '@angular/core/testing';
import {BookDataProvider} from './book.data-provider';


describe('Book.DataProviderService', () => {
  let service: BookDataProvider;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookDataProvider);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
