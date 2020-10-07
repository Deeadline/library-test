import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';
import { BookInterface } from '../../../../models/book.interface';

@Component({
	selector: 'app-book-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.scss']
})
export class BookEditComponent implements OnInit {
	public isLoading = true;
	public model: BookInterface = {} as BookInterface;
	public bookId!: number;

	constructor(
		public dataProvider: BookDataProvider,
		public route: ActivatedRoute,
		public router: Router,
		public snackBar: MatSnackBar
	) {
	}

	public ngOnInit(): void {
		this.bookId = +(this.route.snapshot.paramMap.get('book_id') as string);
		if (this.bookId) {
			this.dataProvider.getById(this.bookId)
				.subscribe((model: BookInterface) => {
					this.model = model;
					this.isLoading = false;
				});
		}
	}

	public onSubmit(book: BookInterface): void {
		this.isLoading = true;
		this.dataProvider
			.update(book.id as number, book)
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
					this.snackBar.open('Book has been successfully modified', undefined, {
						verticalPosition: 'top', duration: 5000
					});
					this.router.navigate(['/app/book']);
				});
	}

}
