import {Injectable} from '@angular/core';
import {BookService} from '../../http/book/book.service';
import {BookInterface} from '../../models/book.interface';
import {Observable} from 'rxjs';
import {HttpParams} from '@angular/common/http';
import {QueryParameterInterface} from '../../models/query-parameter.interface';

@Injectable({
  providedIn: 'root'
})
export class BookDataProvider {

  constructor(
    private bookService: BookService
  ) {
  }

  public create(request: BookInterface): Observable<BookInterface> {
    return this.bookService.create(request);
  }

  public update(id: number, request: BookInterface): Observable<BookInterface> {
    return this.bookService.update(id, request);
  }

  public getAll(queryParams?: QueryParameterInterface): Observable<BookInterface[]> {
    let params = new HttpParams();
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        if (['releasedYear', 'averageNote'].includes(key)) {
          value.forEach(v => {
            params = params.append(key, v);
          });
        } else {
          params = params.append(key, value);
        }
      });
      return this.bookService.getListByQuery(params);
    }
    return this.bookService.getList();
  }

  public getById(id: number): Observable<BookInterface> {
    return this.bookService.getById(id);
  }
}
