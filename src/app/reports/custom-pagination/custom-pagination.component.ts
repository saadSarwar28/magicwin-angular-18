import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reports-custom-pagination',
  template: `
    <div class="custom-pagination">
      <!-- First page button -->
<!--      <button (click)="firstPage()" [disabled]="currentPage === 1">First</button>-->

      <!-- Previous page button -->
      <button (click)="previousPage()" [disabled]="currentPage === 1">Previous</button>

      <!-- Page numbers -->
      <ng-container *ngFor="let page of visiblePages">
        <button
          class="page-numbers"
          (click)="goToPage(page)"
          [class.active]="page === currentPage">
          {{ page }}
        </button>
      </ng-container>

      <!-- Next page button -->
      <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>

      <!-- Last page button -->
<!--      <button (click)="lastPage()" [disabled]="currentPage === totalPages">Last</button>-->
    </div>
  `,
  styles: [`
    /* Custom Pagination Styles */
    .custom-pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 0px;
      padding: 10px;

      border-radius: 5px;
    }

    .custom-pagination button {
      background: var(--reports-pagination-btn-bg);
      color: var(--reports-pagination-btn-clr);
      border: none;
      border-radius: 4px;
      padding: 10px 15px;
      margin: 0 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .page-numbers {
      width: 35px;
      padding: 0px !important;
      height: 43px;
    }

    .page-numbers:hover {
      background: var(--reports-pagination-btn-active-bg) !important;
      color: var(--reports-pagination-btn-active-clr) !important;
    }

    .custom-pagination button.active {
      background: var(--reports-pagination-btn-active-bg);
      color: var(--reports-pagination-btn-active-clr);
    }

    .custom-pagination button:disabled {
      background: var(--reports-pagination-btn-disable-bg);
      color:var(--reports-pagination-btn-disable-clr);
      cursor: not-allowed;
    }


    .custom-pagination span {
      margin: 0 10px;
      color: var(--reports-pagination-btn-clr);
    }

    @media (max-width: 768px) {
      .custom-pagination {
        padding: 0px;
      }

      .custom-pagination button {
        font-size: 12px;
      }
    }

  `]
})
export class CustomPaginationComponent {
  @Input() currentPage: number = 1;  // Current page index
  @Input() totalPages: number = 1;    // Total number of pages
  @Input() maxVisiblePages: number = 5;
  @Output() pageChange = new EventEmitter<number>();  // Output for page change

  get visiblePages(): number[] {
    const pages: any = [];
    const startPage = Math.max(1, this.currentPage - Math.floor(this.maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + this.maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  goToPage(page: number) {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  // Go to the first page
  firstPage() {
    this.goToPage(1);
  }

  // Go to the last page
  lastPage() {
    this.goToPage(this.totalPages);
  }
}
