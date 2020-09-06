import {NgModule} from '@angular/core';

import {BookRoutingModule} from './book-routing.module';
import {BookListComponent} from './page/list/list.component';
import {BookCreateComponent} from './page/create/create.component';
import {BookEditComponent} from './page/edit/edit.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BookDetailComponent } from './page/detail/book-detail.component';
import { BookFormContainerComponent } from './container/form-container/form-container.component';


@NgModule({
  declarations: [BookListComponent, BookCreateComponent, BookEditComponent, BookDetailComponent, BookFormContainerComponent],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    BookRoutingModule
  ]
})
export class BookModule {
}
