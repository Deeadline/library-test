import {BookService} from './book.service';
import {BookInterface} from '../../models/book.interface';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {HttpErrorResponse, HttpParams} from '@angular/common/http';

const mockedBooksCollection: BookInterface[] = [
  {author: 'J.K. Rowling', title: 'Harry Potter and the Philosopher Stone', publishingHouse: 'Media Rodzina', releasedYear: 2000},
  {author: 'J.K. Rowling', title: 'Harry Potter and the Chamber of Secrets', publishingHouse: 'Media Rodzina', releasedYear: 2000},
  {author: 'J.K. Rowling', title: 'Harry Potter and the Prisoner of Azkaban', publishingHouse: 'Media Rodzina', releasedYear: 2001},
  {author: 'Rick Riordan', title: 'Percy Jackson and The Lightning Thief', publishingHouse: 'Galeria Książki', releasedYear: 2009}
];

describe('BookService', () => {
  let service: BookService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  test('The book service is created', () => {
    expect(service).toBeTruthy();
  });

  test('getList() should return collection from backend', () => {
    service.getList().subscribe(response => {
      expect(response).toEqual(mockedBooksCollection);
    });
    const request = httpMock.expectOne(`${service.API_URL}books`);
    expect(request.request.method).toEqual('GET');
    request.flush(mockedBooksCollection);
    httpMock.verify();
  });

  test('getList() should throw if backend returns an error', () => {
    let error = false;
    service.getList().subscribe(() => {
    }, () => error = true);

    const request = httpMock.expectOne(`${service.API_URL}books`, 'expected to make a request');
    expect(request.request.method).toEqual('GET');
    request.flush('ERROR', {status: 500, statusText: 'Internal server error'});
    expect(error).toBeTruthy();
    httpMock.verify();
  });

  test('getById() should return desired book', () => {
    service.getById(1).subscribe(response => {
      expect(response).toEqual(mockedBooksCollection[0]);
    });
    const request = httpMock.expectOne(`${service.API_URL}books/1`);
    expect(request.request.method).toEqual('GET');
    request.flush(mockedBooksCollection[0]);
    httpMock.verify();
  });

  test('getById() should throw if backend returns an error', () => {
    let error = false;
    service.getById(1).subscribe(() => {
    }, () => error = true);

    const request = httpMock.expectOne(`${service.API_URL}books/1`, 'expected to make a request');
    expect(request.request.method).toEqual('GET');
    request.flush('ERROR', {status: 500, statusText: 'Internal server error'});
    expect(error).toBeTruthy();
    httpMock.verify();
  });

  test('getListByQuery() should return collection', () => {
    const query = new HttpParams().set('title', 'Harry Potter');
    const filteredBooks = mockedBooksCollection.filter(c => c.title.includes('Harry Potter'));
    service.getListByQuery(query).subscribe(response => {
      expect(response).toEqual(filteredBooks);
    });
    const request = httpMock.expectOne(`${service.API_URL}books?${query}`);
    expect(request.request.method).toEqual('GET');
    request.flush(filteredBooks);
    httpMock.verify();
  });

  test('getListByQuery() should throw if backend returns error', () => {
    const query = new HttpParams().set('title', 'Harry Potter');
    let error = false;
    service.getListByQuery(query).subscribe(() => {
    }, () => error = true);

    const request = httpMock.expectOne(`${service.API_URL}books?${query}`, 'expected to make a request');
    expect(request.request.method).toEqual('GET');
    request.flush('ERROR', {status: 500, statusText: 'Internal server error'});
    expect(error).toBeTruthy();
    httpMock.verify();
  });

  test('create() should add book and return with new id', () => {
    const book = mockedBooksCollection[0];
    service.create(mockedBooksCollection[0]).subscribe(response => {
      expect(response.id).toEqual(1);
    });

    const request = httpMock.expectOne(`${service.API_URL}books`);
    expect(request.request.method).toEqual('POST');
    request.flush({...book, id: 1}, {status: 201, statusText: 'Created'});
    httpMock.verify();
  });

  test('create() should throw if backend returns error', () => {
    let error = false;
    service.create(mockedBooksCollection[0]).subscribe(() => {
    }, () => error = true);

    const request = httpMock.expectOne(`${service.API_URL}books`, 'expected to make a request');
    expect(request.request.method).toEqual('POST');
    request.flush('ERROR', {status: 500, statusText: 'Internal server error'});
    expect(error).toBeTruthy();
    httpMock.verify();
  });

  test('update() should return modified book', () => {
    const oldBook: BookInterface = mockedBooksCollection[0];
    const description = 'The boy who lived started new year in Hogwart school. New experiences are waiting for him.';
    service.update(1, {
      ...oldBook,
      description
    } as BookInterface).subscribe(response => {
      expect(response.description).toEqual(description);
    });

    const request = httpMock.expectOne(`${service.API_URL}books/1`);
    expect(request.request.method).toEqual('PUT');
    request.flush({
      ...oldBook,
      description
    } as BookInterface, {status: 200, statusText: 'Updated'});
    httpMock.verify();
  });

  test('Update() should receive 404 when backend returns error', () => {
    let error: HttpErrorResponse = null;
    const oldBook: BookInterface = mockedBooksCollection[0];
    const description = 'The boy who lived started new year in Hogwart school. New experiences are waiting for him.';
    service.update(1, {
      ...oldBook,
      description
    } as BookInterface).subscribe(() => {
    }, (err) => {
      error = err;
    });

    const request = httpMock.expectOne(`${service.API_URL}books/1`, 'expected to make a request');
    expect(request.request.method).toEqual('PUT');
    request.flush('ERROR', {status: 404, statusText: 'Book not found'});
    expect(error.status).toBe(404);
    httpMock.verify();
  });

});
