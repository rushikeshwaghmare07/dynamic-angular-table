import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { IProduct } from '../../services/product.mode';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

  products: IProduct[] = [];

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts() {
    this.productService.getProduct().subscribe({
      next:(products) => {
        // console.log(products);
        this.products = products;
      }
    })
  }
}
