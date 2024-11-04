import { CommonModule } from '@angular/common';
import { Component, Input,TemplateRef } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <app-button [contenidoButton]="contenidoButton" (click)="toggleModal()"></app-button>

    <div *ngIf="showModal" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
      <div class="relative w-auto my-6 mx-auto max-w-6xl">
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
            <h3 class="text-3xl font-semibold">
              {{ modalTitle }}
            </h3>
            <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none" (click)="toggleModal()">
              <span class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <ng-container *ngTemplateOutlet="contenidoModal"></ng-container>          
          </div>
          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
            <app-button [contenidoButton]="'Cerrar'" [class]="'text-red-500 bg-transparent shadow-none hover:bg-red-500 hover:text-white font-bold uppercase ease-linear transition-all duration-200'" type="button" (click)="toggleModal()">
              Cerrar
            </app-button>
          </div>
        </div>
      </div>
    </div>
    <div *ngIf="showModal" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
  `
})
export class ModalComponent {
  @Input() contenidoButton!: string;
  @Input() modalTitle: string = 'Modal Title';
  @Input() contenidoModal!: TemplateRef<any>;
  showModal = false;

  toggleModal() {
    this.showModal = !this.showModal;
  }
}
