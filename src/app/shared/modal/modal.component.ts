import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {BookInterface} from '../../models/book.interface';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(
    public modalRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public book: BookInterface
  ) {
  }

  ngOnInit(): void {
  }

}
