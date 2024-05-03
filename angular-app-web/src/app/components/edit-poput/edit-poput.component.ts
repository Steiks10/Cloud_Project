import { Component, EventEmitter, Input, Output } from '@angular/core';
import {CommonModule} from '@angular/common'
import {DialogModule} from 'primeng/dialog'
import { Product } from '../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-edit-poput',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule],
  templateUrl: './edit-poput.component.html',
  styleUrl: './edit-poput.component.scss'
})
export class EditPoputComponent {
  @Input() display: boolean = false;
  @Output() confirm = new EventEmitter<Product>();
  @Output() cancel = new EventEmitter<void>();

  @Input() header!: string;
  @Input() product: Product = {
    name:'',
    image: '',
    price: '',
    rating: 0,
  }

  onConfirm() {
    this.confirm.emit(this.product)
  }

  onCancel() {
    this.display = false;
  }
}
