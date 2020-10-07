import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';
import { BookInterface } from '../../../../models/book.interface';

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

	public ngOnInit(): void {
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
					this.snackBar.open(e.error, undefined, {
						verticalPosition: 'top', duration: 5000
					});
				},
				() => {
					this.isLoading = false;
					this.snackBar.open('Book has been successfully added', undefined, {
						verticalPosition: 'top', duration: 5000
					});
					this.router.navigate(['/app/book']);
				});
	}
}
