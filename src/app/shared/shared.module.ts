import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { RatingModule } from 'primeng/rating';

import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { PermissionDirective } from './directive/permission.directive';

@NgModule({
	declarations: [
		ConfirmationModalComponent, PermissionDirective
	],
	imports: [
		CommonModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatRadioModule,
		MatCardModule,
		MatGridListModule,
		MatMenuModule,
		MatIconModule,
		LayoutModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		FlexLayoutModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatDialogModule,
		CalendarModule,
		MultiSelectModule,
		InputTextModule,
		RatingModule
	],
	exports: [
		CommonModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		MatRadioModule,
		MatCardModule,
		MatGridListModule,
		MatMenuModule,
		MatIconModule,
		LayoutModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		FlexLayoutModule,
		MatSnackBarModule,
		MatProgressSpinnerModule,
		MatChipsModule,
		MatDialogModule,
		ConfirmationModalComponent,
		PermissionDirective,
		CalendarModule,
		MultiSelectModule,
		InputTextModule,
		RatingModule
	]
})
export class SharedModule {
}
