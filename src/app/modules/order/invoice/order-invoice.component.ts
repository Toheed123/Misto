import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { sliderAnimation } from 'src/app/core/animation/slider.animation';
import { OrderService } from 'src/app/core/http/order.service';
import { AppService } from 'src/app/core/service/app.service';

@Component({
  selector: 'app-order-invoice',
  standalone: false,
  templateUrl: './order-invoice.component.html',
  styleUrl: './order-invoice.component.scss',
  animations: [sliderAnimation],

})
export class OrderInvoiceComponent {

  order: any;
  products: any[] = [];
  orderId: any;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    private appService: AppService,
    private route: Router 
  ) {
    this.activatedRoute.params
          .pipe(take(1))
          .subscribe((params) => {    
            this.orderId = params['id'];    
          });
  }

  ngOnInit() {
    this.getOrder();
  }

  // GET BY ID
  getOrder() {
    setTimeout(() => {
      this.appService.setLoading(true);
    })

    this.orderService.getOrderById(this.orderId)
      .pipe(take(1), finalize(() => this.appService.setLoading(false)))
      .subscribe((res: any) => {

        if (res?.State) {

          this.order = res.Data;

          this.products = this.parseProducts(res.Data);

        }

      });

  }

  // PARSE PRODUCTS
  parseProducts(data: any) {

    const ids = String(data.ProductId ?? '').split(',');
    const names = String(data.ProductName ?? '').split(',');
    const qty = Number(data.Quantity ?? 1);
    const amt = Number(data.TotalAmount ?? 0);

    let result = [];

    for (let i = 0; i < ids.length; i++) {

      result.push({
        ProductId: ids[i],
        ProductName: names[i],
        Quantity: qty,
        TotalAmount: amt
      });

    }

    return result;
  }

  // PRINT
printInvoice() {

  const printContent = document.querySelector('.invoice-print-area') as HTMLElement;

  const WindowPrt = window.open('', '', 'width=900,height=650');

  WindowPrt?.document.write(`

    <html>
      <head>
        <title>Invoice</title>

        <style>

          body {
            font-family: Arial;
            padding: 20px;
            color: #333;
          }

          h1, h2, h3 {
            margin: 0;
          }

          .invoice-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
          }

          .info-section {
            display: flex;
            justify-content: space-between;
            margin: 20px 0;
          }

          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          .invoice-table th {
            background: #6a4cff;
            color: white;
            padding: 10px;
          }

          .invoice-table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
          }

          .total-box {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
          }

        </style>

      </head>

      <body>

        ${printContent?.innerHTML}

        <script>
          window.onload = function () {
            window.print();
            window.onafterprint = function () {
              window.close();
            };
          }
        </script>

      </body>
    </html>

  `);

  WindowPrt?.document.close();
}

  // PDF (simple browser method)
  downloadPDF() {
    window.print();
  }

   back() {

    this.route.navigate(["/orders"]);

  }
}
