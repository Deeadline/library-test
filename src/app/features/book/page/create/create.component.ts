import {Component, OnInit} from '@angular/core';
import {BookInterface} from '../../../../models/book.interface';
import {BookDataProvider} from '../../../../data-providers/book/book.data-provider';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class BookCreateComponent implements OnInit {
  public isLoading = true;

  constructor(
    public bookDataProvider: BookDataProvider,
    public router: Router,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.isLoading = false;
  }

  public onSubmit(book: BookInterface): void {
    this.isLoading = true;
    this.bookDataProvider
      .create(book)
      .subscribe(
        () => {
        },
        (e: HttpErrorResponse) => {
          this.isLoading = false;
          this.snackBar.open(e.error, null, {
            verticalPosition: 'top', duration: 5000
          });
        },
        () => {
          this.isLoading = false;
          this.snackBar.open('Book has been successfully added', null, {
            verticalPosition: 'top', duration: 5000
          });
          this.router.navigate(['/app/book']);
        });
  }
}
