import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookCreateComponent } from './page/create/create.component';
import { BookDetailComponent } from './page/detail/book-detail.component';
import { BookEditComponent } from './page/edit/edit.component';
import { BookListComponent } from './page/list/list.component';

const routes: Routes = [
	{
		path: '',
		component: BookListComponent
	},
	{
		path: 'create',
		component: BookCreateComponent
	},
	{
		path: 'edit/:book_id',
		component: BookEditComponent
	},
	{
		path: 'detail/:book_id',
		component: BookDetailComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class BookRoutingModule {
}
