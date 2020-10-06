import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { BookInterface } from '../../models/book.interface';

@Component({
	selector: 'app-confirmation-modal',
	templateUrl: './confirmation-modal.component.html',
	styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public book: BookInterface,
		public dialogRef: MatDialogRef<ConfirmationModalComponent>
	) {
	}

	public ngOnInit(): void {
	}

}
