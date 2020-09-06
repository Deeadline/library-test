import {Component, OnInit} from '@angular/core';
import {BookInterface} from '../../../../models/book.interface';
import {Subject} from 'rxjs';
import {QueryParameterInterface} from '../../../../models/query-parameter.interface';
import {FormControl, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {BookDataProvider} from '../../../../data-providers/book/book.data-provider';
import {MatDialog} from '@angular/material/dialog';
import {debounceTime, distinctUntilChanged, filter, map, switchMap, withLatestFrom} from 'rxjs/operators';
import {ConfirmationModalComponent} from '../../../../shared/confirmation-modal/confirmation-modal.component';
import {AuthDataProvider} from '../../../../data-providers/auth/auth.data-provider';
import {UserInterface} from '../../../../models/user.interface';

@Component({
  selector: 'app-book-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BookListComponent implements OnInit {
  public books: BookInterface[] = [];
  public queryParams = new Subject<QueryParameterInterface>();
  public qp: QueryParameterInterface = {};
  public textInput = new FormControl('', [Validators.minLength(3)]);
  public years: SelectItem[] = Array.from(Array(2020 - 1950), (v, i) => (
    {
      value: '' + (1950 + i),
      label: '' + (1950 + i)
    }
  ));
  public selectedYears: SelectItem[];

  public notes: SelectItem[] = Array.from(Array(10), (v, i) => (
    {
      value: '' + (i + 1),
      label: '' + (i + 1)
    }
  ));
  public selectedNotes: SelectItem[];
  private user: UserInterface;

  constructor(
    private authDataProvider: AuthDataProvider,
    private bookDataProvider: BookDataProvider,
    private dialog: MatDialog
  ) {
    this.findAll();
    const values = this.textInput.valueChanges;


    const validChange = this.textInput
      .statusChanges.pipe(filter(s => s === 'VALID'));

    const validValues = validChange.pipe(
      withLatestFrom(values),
      map(([valid, value]) => value),
      debounceTime(400),
      distinctUntilChanged()
    );

    validValues.subscribe((value) => {
      this.qp = {...this.qp, author: value};
      this.queryParams.next(this.qp);
    });
  }

  ngOnInit(): void {
    this.authDataProvider.user$.subscribe(user => {
      this.user = user;
      this.queryParams.next(this.qp);
    });
  }

  private findAll(): void {
    this.queryParams.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((queryParams: QueryParameterInterface) => {
        return this.bookDataProvider.getAll(queryParams);
      })
    ).subscribe(x => {
      this.books = x;
    });
  }

  public onYearHide(): void {
    if (this.selectedYears) {
      this.qp = {...this.qp, releaseDate: this.selectedYears.map(sy => sy.value)};
      this.queryParams.next(this.qp);
    }
  }

  public onNoteHide(): void {
    if (this.selectedNotes) {
      this.qp = {...this.qp, averageNotes: this.selectedNotes.map(sy => sy.value)};
      this.queryParams.next(this.qp);
    }
  }

  public loanBook(book: BookInterface): void {
    const confirmationDialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: book
    });
    confirmationDialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
        book.isLoaned = true;
        book.loanedBy = this.user;
        this.bookDataProvider.update(book.id, book)
          .subscribe(x => {
            const indexOf = this.books.indexOf(book);
            this.books[indexOf].isLoaned = true;
            this.books[indexOf].loanedBy = this.user;
          });
      }
    });
  }

  public returnBook(book: BookInterface): void {
    const confirmationDialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '400px',
      data: book
    });
    confirmationDialogRef.afterClosed().subscribe(accepted => {
      if (accepted) {
        book.isLoaned = false;
        book.loanedBy = null;
        this.bookDataProvider.update(book.id, book)
          .subscribe(x => {
            const indexOf = this.books.indexOf(book);
            this.books[indexOf].isLoaned = true;
            this.books[indexOf].loanedBy = null;
          });
      }
    });
  }
}
