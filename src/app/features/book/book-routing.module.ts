import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookEditComponent} from './edit/edit.component';
import {BookCreateComponent} from './create/create.component';
import {BookListComponent} from './list/list.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule {
}
