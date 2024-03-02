import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, TemplateRef } from '@angular/core';
import { UITablePaginationStatus } from './table.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() tableHead: TemplateRef<any> | null = null;
  @Input() tableBody: TemplateRef<any> | null = null;
  @Input() pagination: boolean = false;
  @Input() search: boolean = false;
  @Input() pageSize = 5;
  @Input() filterColumn = ['name'];

  tableData: any[] = [];
  totalRecords = 0;
  paginationStatus: UITablePaginationStatus = {
    page: 1,
    pageSize: 5,
    totalPages: 0,
  };

  searchTerm = '';

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

    // Searching
    if (this.searchTerm !== '') {
      data = this.data.filter((item) => this.matches(item));
    }

    this.totalRecords = data.length;
    this.paginationStatus.totalPages = Math.ceil(
      this.totalRecords / this.paginationStatus.pageSize
    );

    this.paginationStatus.totalPages = Math.ceil(
      this.totalRecords / this.paginationStatus.pageSize
    );

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

  matches(data: any) {
    let columns = Object.keys(data);

    for (let i = 0; i < columns.length; i++) {
      if (this.filterColumn.includes(columns[i])) {
        if (data[columns[i]].toLowerCase().includes(this.searchTerm.toLowerCase())) {
          return true;
        }
      }
    }

    return false;
  }
}
