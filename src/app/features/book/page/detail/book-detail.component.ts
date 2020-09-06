import {Component, OnInit} from '@angular/core';
import {BookInterface} from '../../../../models/book.interface';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../../shared/error-state-matcher';
import {ActivatedRoute} from '@angular/router';
import {BookDataProvider} from '../../../../data-providers/book/book.data-provider';
import {AuthDataProvider} from '../../../../data-providers/auth/auth.data-provider';
import {UserCommentInterface} from '../../../../models/user-comment.interface';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  public book: BookInterface;
  public isLoading = true;
  public currentUserName: string;
  public formGroup: FormGroup;

  constructor(
    public errorStateMatcher: MyErrorStateMatcher,
    private authDataProvider: AuthDataProvider,
    private bookDataProvider: BookDataProvider,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookDataProvider.getById(+id)
        .subscribe((book: BookInterface) => {
          this.book = book;
          this.currentUserName = this.authDataProvider.currentUsername();
          this.isLoading = false;
          this.formGroup = this.formBuilder.group({
            bookId: [this.book.id],
            username: [this.currentUserName],
            comment: [null, [Validators.required, Validators.maxLength(200)]]
          });
        });
    }
  }

  public get isUserCommentedBook(): boolean {
    const userNames = this.comments.map(c => c.createdBy.username);
    return userNames.includes(this.currentUserName);
  }

  public addComment(): void {
    if (this.formGroup.valid) {
      this.isLoading = true;
      const comments = [...this.comments, this.formGroup.value as UserCommentInterface];
      const book = {...this.book, comments} as BookInterface;
      this.bookDataProvider.update(this.book.id, book)
        .subscribe(x => {
          this.book.comments = x.comments;
          this.isLoading = false;
        });
    }
  }

  public get comments(): UserCommentInterface[] {
    return this.book.comments.filter(c => c.comment !== null);
  }

}
