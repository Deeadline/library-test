import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';

import { AuthDataProvider } from '../../../../data-providers/auth/auth.data-provider';
import { BookDataProvider } from '../../../../data-providers/book/book.data-provider';
import { BookInterface } from '../../../../models/book.interface';
import { UserCommentInterface } from '../../../../models/user-comment.interface';
import { UserNoteInterface } from '../../../../models/user-note.interface';
import { UserInterface } from '../../../../models/user.interface';
import { MyErrorStateMatcher } from '../../../../shared/error-state-matcher';

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
	public book: BookInterface;
	public isLoading = true;
	public currentUser: UserInterface;
	public formGroup: FormGroup;
	public bookId: number = null;
	public currentUserRate = 1;

	constructor(
		public errorStateMatcher: MyErrorStateMatcher,
		private readonly authDataProvider: AuthDataProvider,
		private readonly bookDataProvider: BookDataProvider,
		private readonly route: ActivatedRoute,
		private readonly formBuilder: FormBuilder
	) {
	}

	public get isUserCommentedBook(): boolean {
		const userNames = this.comments?.map((c: UserCommentInterface) => c.createdBy.username);
		return userNames?.includes(this.currentUser.username);
	}

	public get isUserRated(): boolean {
		return !!this.book.notes?.find((c: UserNoteInterface) => c.user.username === this.currentUser.username);
	}

	public get comments(): UserCommentInterface[] {
		return this.book.comments?.filter((c: UserCommentInterface) => c.comment !== null) || [];
	}

	public ngOnInit(): void {
		this.bookId = +(this.route.snapshot.paramMap.get('book_id'));
		if (this.bookId) {
			combineLatest([
				this.bookDataProvider.getById(this.bookId),
				this.authDataProvider.currentUser()]
			).subscribe(([book, currentUser]: [BookInterface, UserInterface]) => {
				this.book = book;
				this.currentUser = currentUser;
				this.isLoading = false;
				this.currentUserRate = this.book.notes?.find((note: UserNoteInterface) => note.user.username === this.currentUser.username)?.note || 0;
				this.formGroup = this.formBuilder.group({
					createdBy: [this.currentUser],
					comment: [null, [Validators.required, Validators.maxLength(200)]],
					createdAt: [Date.now()]
				});
			});
		}
	}

	public addComment(): void {
		if (this.formGroup.valid) {
			this.isLoading = true;
			const comments = [...this.comments, this.formGroup.value as UserCommentInterface];
			const book = {...this.book, comments} as BookInterface;
			this.bookDataProvider.update(this.book.id, book)
				.subscribe((x: BookInterface) => {
					this.book.comments = x.comments;
					this.isLoading = false;
				});
		}
	}

	public addRate(): void {
		if (this.currentUserRate > 0) {
			const note: UserNoteInterface = {note: this.currentUserRate, user: this.currentUser} as UserNoteInterface;
			this.isLoading = true;
			const notes: UserNoteInterface[] = [...(this.book.notes || []), note];
			const book = {...this.book, notes};
			this.bookDataProvider.update(this.bookId, book)
				.subscribe((x: BookInterface) => {
					this.book.notes = x.notes;
					this.isLoading = false;
				});
		}
	}

}
