import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {

  @Input() data: any[] = [];
  @Input() tableHead: TemplateRef<any> | null = null;
  @Input() tableBody: TemplateRef<any> | null = null;
  @Input() pagination: boolean = false;
}
