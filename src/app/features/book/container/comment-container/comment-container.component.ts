import { Component, Input, OnInit } from '@angular/core';

import { UserCommentInterface } from '../../../../models/user-comment.interface';

@Component({
	selector: 'app-book-comment-container',
	templateUrl: './comment-container.component.html',
	styleUrls: ['./comment-container.component.scss']
})
export class BookCommentContainerComponent implements OnInit {

	@Input() public comment: UserCommentInterface;

	constructor() {
	}

	public ngOnInit(): void {
	}

}
