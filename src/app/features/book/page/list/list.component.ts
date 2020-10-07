import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AuthDataProvider } from '../../../../data-providers/auth/auth.data-provider';
import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';
import { BookInterface } from '../../../../models/book.interface';
import { QueryParameterInterface } from '../../../../models/query-parameter.interface';
import { UserInterface } from '../../../../models/user.interface';
import { ConfirmationModalComponent } from '../../../../shared/confirmation-modal/confirmation-modal.component';

@Component({
	selector: 'app-book-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class BookListComponent implements OnInit {
	public books: BookInterface[] = [];
	public queryParams = new Subject<QueryParameterInterface>();
	public qp: QueryParameterInterface = {};
	public textInput = new FormControl('');
	public years: SelectItem[] = Array.from(Array(2020 - 1950), (v: unknown, i: number) => (
		{
			value: `${1950 + i}`,
			label: `${1950 + i}`
		}
	));
	public selectedYears!: SelectItem[];

	public notes: SelectItem[] = Array.from(Array(10), (v: unknown, i: number) => (
		{
			value: `${i + 1}`,
			label: `${i + 1}`
		}
	));

	public selectedNotes!: SelectItem[];
	private user!: UserInterface;

	constructor(
		private readonly authDataProvider: AuthDataProvider,
		private readonly bookDataProvider: BookDataProvider,
		private readonly dialog: MatDialog
	) {
		this.findAll();
		const values = this.textInput.valueChanges;
		const validChange = this.textInput.statusChanges;

		const validValues = validChange.pipe(
			withLatestFrom(values),
			map(([_, value]: [unknown, string]) => value),
			debounceTime(400),
			distinctUntilChanged()
		);

		validValues.subscribe((value: string) => {
			if (value.length < 3) {
				delete this.qp.author;
				this.qp = {...this.qp};
			} else {
				this.qp = {...this.qp, author: value};
			}
			this.queryParams.next(this.qp);
		});
	}

	public ngOnInit(): void {
		this.authDataProvider.user$.subscribe((user: UserInterface) => {
			this.user = user;
			this.queryParams.next(this.qp);
		});
	}

	public onYearHide(): void {
		if (this.selectedYears) {
			this.qp = {...this.qp, releasedYear: this.selectedYears.map((cy: SelectItem) => Number(cy.value))};
			this.queryParams.next(this.qp);
		}
	}

	public onNoteHide(): void {
		if (this.selectedNotes) {
			this.qp = {...this.qp, averageNote: this.selectedNotes.map((cy: SelectItem) => Number(cy.value))};
			this.queryParams.next(this.qp);
		}
	}

	public loanBook(book: BookInterface): void {
		const confirmationDialogRef = this.dialog.open(ConfirmationModalComponent, {
			width: '400px',
			data: book
		});
		confirmationDialogRef.afterClosed().subscribe((accepted: boolean): void => {
			if (accepted) {
				book.isLoaned = true;
				book.loanedBy = this.user;
				this.bookDataProvider.update(book.id as number, book)
					.subscribe((x: BookInterface): void => {
						const indexOf = this.books.indexOf(book);
						this.books[indexOf].isLoaned = true;
						this.books[indexOf].loanedBy = this.user;
					});
			}
		});
	}

	public returnBook(book: BookInterface): void {
		const indexOf = this.books.indexOf(book);
		if (this.user.username === this.books[indexOf].loanedBy?.username) {
			const confirmationDialogRef = this.dialog.open(ConfirmationModalComponent, {
				width: '400px',
				data: book
			});
			confirmationDialogRef
				.afterClosed()
				.subscribe((accepted: boolean) => {
					if (accepted) {
						book.isLoaned = false;
						book.loanedBy = undefined;
						this.bookDataProvider.update(book.id as number, book)
							.subscribe(() => {
								this.books[indexOf].isLoaned = false;
								this.books[indexOf].loanedBy = undefined;
							});
					}
				});
		}
	}

	private findAll(): void {
		this.queryParams.pipe(
			debounceTime(500),
			distinctUntilChanged(),
			switchMap((queryParams: QueryParameterInterface) => {
				return this.bookDataProvider.getAll(queryParams);
			})
		).subscribe((x: BookInterface[]) => {
			this.books = x;
		});
	}
}
