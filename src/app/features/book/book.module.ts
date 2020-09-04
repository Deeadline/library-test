import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './list/list.component';
import { BookCreateComponent } from './create/create.component';
import { BookEditComponent } from './edit/edit.component';


@NgModule({
  declarations: [BookListComponent, BookCreateComponent, BookEditComponent],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
