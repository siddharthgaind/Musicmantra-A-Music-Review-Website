
import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'jw-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;
  constructor(private modalService: ModalService, private ef: ElementRef) {
    this.element = ef.nativeElement;
  }

  ngOnInit():void {
    if (!this.id) {
      console.error('modal should have an id');
      return;
  }
  // move element to bottom of page
  document.body.appendChild(this.element);
  // close modal on click
  this.element.addEventListener('click', ef => {
      if (ef.target.className === 'jw-modal') {
          this.close();
      }
  });
  this.modalService.add(this);
}
// remove self from modal service
ngOnDestroy(): void {
  this.modalService.remove(this.id);
  this.element.remove();
}
// open modal
open(): void {
  this.element.style.display = 'block';
  document.body.classList.add('jw-modal-open');
}
// close modal
close(): void {
  this.element.style.display = 'none';
  document.body.classList.remove('jw-modal-open');
}
}