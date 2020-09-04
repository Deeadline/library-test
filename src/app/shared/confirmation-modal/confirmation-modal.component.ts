import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BookInterface} from '../../models/book.interface';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public book: BookInterface
  ) {
  }

  ngOnInit(): void {
  }

}
