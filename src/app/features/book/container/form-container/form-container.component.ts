import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BookInterface } from '../../../../models/book.interface';
import { MyErrorStateMatcher } from '../../../../shared/error-state-matcher';

@Component({
	selector: 'app-book-form-container',
	templateUrl: './form-container.component.html',
	styleUrls: ['./form-container.component.scss']
})
export class BookFormContainerComponent implements OnInit {

	@Output() public submitEvent = new EventEmitter<BookInterface>();

	public formGroup!: FormGroup;

	private _model: BookInterface | null = null;

	constructor(
		private readonly formBuilder: FormBuilder,
		public errorStateMatcher: MyErrorStateMatcher
	) {
	}

	@Input()
	public set model(value: BookInterface) {
		this._model = value;
	}

	public get model(): BookInterface {
		return this._model as BookInterface;
	}

	public ngOnInit(): void {
		this.createForm();
	}

	public createForm(): void {
		this.formGroup = this.formBuilder.group({
			id: [null],
			title: [null, [Validators.required]],
			author: [null, [
				Validators.required,
				Validators.maxLength(20)
			]],
			publishingHouse: [null, [
				Validators.required,
				Validators.maxLength(20)
			]],
			description: [null, [Validators.maxLength(200)]],
			imageUrl: [null],
			releasedYear: [null, [
				Validators.required,
				Validators.minLength(4),
				Validators.maxLength(4)
			]]
		});
		this.patchForm();
	}

	public submit(): void {
		if (this.formGroup.valid) {
			const model = this.formGroup.value as BookInterface;
			this.submitEvent.emit(model);
		}
	}

	public patchForm(): void {
		if (this.formGroup && this.model) {
			this.formGroup.patchValue(this.model);
		}
	}

}
