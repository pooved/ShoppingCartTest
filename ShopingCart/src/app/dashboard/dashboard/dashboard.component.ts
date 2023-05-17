import { category } from './../../model/category.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { product } from 'src/app/model/product.model';
import { CartService } from 'src/app/service/cart.service';
import { ServiceService } from 'src/app/service/service.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexAnnotations,
  ApexPlotOptions,
  ApexYAxis,
  ApexFill,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexTheme,
  ApexLegend,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
export type CateChartOption = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
};

export type ChartBar = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  purchaseDetails: product[] = [];
  chartDetail1: any;
  @ViewChild('chart')
  chart!: ChartComponent;
  @ViewChild('catChart')
  catChart!: ChartComponent;
  @ViewChild('chartBar') chartBar!: ChartComponent;

  totalProducts: any;
  totalPrice: any;
  totalOrderSale: any;
  g_data: any[] = [];
  cat_data: any[] = [];
  public chartOptions!: Partial<ChartOptions>;
  public CateChartOption!: Partial<CateChartOption>;
  public ChartBar!: Partial<ChartBar>;
  constructor(private serviceAPI: ServiceService) {}
  ngOnInit(): void {
    this.serviceAPI.getPurchaseDetails().subscribe({
      next: (data) => {
        this.purchaseDetails = data;

        let totalProducts = 0;
        let totalPrice = 0;

        //Total order
        this.totalOrderSale = data.length;

        //statics
        this.purchaseDetails.forEach((item: any) => {
          //total number of products
          totalProducts = Number(item.quantity + totalProducts);

          //Total Amount
          totalPrice = Number(item.total + totalPrice);
          this.totalProducts = totalProducts;
          this.totalPrice = totalPrice;

          //bar chart
        });
        //Highest percentage of product ordered
        let counts = this.purchaseDetails.reduce((acc: any, curr: any) => {
          const str = JSON.stringify(curr.name);
          acc[str] = (acc[str] || 0) + 1;
          return acc;
        }, {});

        let obj = {
          x: Object.keys(counts),
          y: Object.values(counts),
        };
        this.g_data.push(obj);

        console.log(this.g_data);
        this.g_data.forEach((item) => {
          this.chartOptions = {
            series: item.y,
            chart: {
              width: 380,
              type: 'pie',
            },
            labels: item.x,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: 'bottom',
                  },
                },
              },
            ],
          };
        });

        //most category product ordered
        let categoryCount = this.purchaseDetails.reduce(
          (acc: any, curr: any) => {
            const str = JSON.stringify(curr.category);
            acc[str] = (acc[str] || 0) + 1;
            return acc;
          },
          {}
        );

        let objCat = {
          x: Object.keys(categoryCount),
          y: Object.values(categoryCount),
        };
        this.cat_data.push(objCat);

        console.log(this.cat_data);
        this.cat_data.forEach((item) => {
          this.CateChartOption = {
            series: item.y,
            chart: {
              width: 380,
              type: 'polarArea',
            },
            labels: item.x,
            fill: {
              opacity: 1,
            },
            stroke: {
              width: 1,
              colors: undefined,
            },
            yaxis: {
              show: false,
            },
            legend: {
              position: 'bottom',
            },
            plotOptions: {
              polarArea: {
                rings: {
                  strokeWidth: 0,
                },
              },
            },
            theme: {
              monochrome: {
                //    enabled: true,
                shadeTo: 'light',
                shadeIntensity: 0.6,
              },
            },
          };
        });
      },
    });
  }
}
