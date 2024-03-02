import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  TemplateRef,
} from '@angular/core';
import { UITablePaginationStatus } from './table.model';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() tableHead: TemplateRef<any> | null = null;
  @Input() tableBody: TemplateRef<any> | null = null;
  @Input() pagination: boolean = false;
  @Input() pageSize = 5;

  tableData: any[] = [];
  totalRecords = 0;
  paginationStatus: UITablePaginationStatus = {
    page: 1,
    pageSize: 5,
    totalPages: 0,
  };

  ngOnChanges(): void {
    this.initialPagination();
  }

  initialPagination() {
    this.totalRecords = this.data.length;
    this.paginationStatus = {
      ...this.paginationStatus,
      pageSize: this.pageSize,
      totalPages: Math.ceil(this.totalRecords / this.paginationStatus.pageSize),
    };

    this.refreshTable();
  }

  refreshTable() {
    let data = this.data;

    this.paginationStatus.totalPages = Math.ceil(this.totalRecords / this.paginationStatus.pageSize);

    this.tableData = data.slice(
      (this.paginationStatus.page - 1) * this.paginationStatus.pageSize,
      (this.paginationStatus.page - 1) * this.paginationStatus.pageSize +
        this.paginationStatus.pageSize
    );
  }

  pageChange(page: number) {
    this.paginationStatus = {
      ...this.paginationStatus,
      page: page,
    };

    this.refreshTable();
  }
}
