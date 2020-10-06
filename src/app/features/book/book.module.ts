import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { BookRoutingModule } from './book-routing.module';
import { BookCommentContainerComponent } from './container/comment-container/comment-container.component';
import { BookFormContainerComponent } from './container/form-container/form-container.component';
import { BookCreateComponent } from './page/create/create.component';
import { BookDetailComponent } from './page/detail/book-detail.component';
import { BookEditComponent } from './page/edit/edit.component';
import { BookListComponent } from './page/list/list.component';

@NgModule({
	declarations: [
		BookListComponent,
		BookCreateComponent,
		BookEditComponent,
		BookDetailComponent,
		BookFormContainerComponent,
		BookCommentContainerComponent
	],
	imports: [
		SharedModule,
		FormsModule,
		ReactiveFormsModule,
		BookRoutingModule
	]
})
export class BookModule {
}
