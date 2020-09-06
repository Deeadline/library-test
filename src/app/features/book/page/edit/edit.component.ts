import {Component, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {BookInterface} from '../../../../models/book.interface';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {BookDataProvider} from '../../../../data-providers/book/book.data-provider';

@Component({
  selector: 'app-book-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class BookEditComponent implements OnInit {
  public isLoading = true;
  public model: BookInterface = {} as BookInterface;

  constructor(
    private dataProvider: BookDataProvider,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dataProvider.getById(+id).subscribe((model) => {
        this.model = model;
        this.isLoading = false;
      });
    }
  }

  public onSubmit(book: BookInterface): void {
    this.isLoading = true;
    this.dataProvider
      .update(book.id, book)
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
          this.snackBar.open('Book successfully modified', null, {
            verticalPosition: 'top', duration: 5000
          });
          this.router.navigate(['/app/book']);
        });
  }

}
