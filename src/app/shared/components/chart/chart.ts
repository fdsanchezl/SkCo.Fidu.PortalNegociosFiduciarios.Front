import { AfterViewInit, Component,  ElementRef,  Input,  OnChanges,  SimpleChanges,  ViewChild } from '@angular/core';
import * as echarts from 'echarts'

@Component({
  selector: 'app-chart',
  imports: [],
  templateUrl: './chart.html',
  styleUrl: './chart.scss'
})
export class Chart implements  AfterViewInit, OnChanges  {
  @ViewChild('chartLineExisting') chartRefExisting!: ElementRef<HTMLElement>
  @ViewChild('chartLineOverdue') chartRefOverdue!: ElementRef<HTMLElement>
  @ViewChild('chartBarTIR') chartRefTir!: ElementRef<HTMLElement>
  
  private chartInstanceExisting: echarts.ECharts | null = null
  private chartInstanceOverdue: echarts.ECharts | null = null
  private chartInstanceTir: echarts.ECharts | null = null

  @Input() category!:string[]
  @Input() renderChart = false

  ngOnChanges(changes: SimpleChanges) {
    if (changes['renderChart'] && changes['renderChart'].currentValue) {
      this.renderOrResizeChart();
    }
  }

  ngAfterViewInit(): void {
    this.initializeChart()
  }

  renderOrResizeChart(){
    this.chartInstanceExisting?.resize()
    this.chartInstanceOverdue?.resize()
    this.chartInstanceTir?.resize()
  }

  private initializeChart(){
    //chart cartera vigente
    if(this.chartRefExisting && this.chartRefExisting.nativeElement){
      this.chartInstanceExisting = echarts.init(this.chartRefExisting.nativeElement);
      const option : echarts.EChartsOption = this.getOptionsExisting()
      this.chartInstanceExisting.setOption(option)
    }
    //chart cartera vencida
    if(this.chartRefOverdue && this.chartRefOverdue.nativeElement){
      this.chartInstanceOverdue = echarts.init(this.chartRefOverdue.nativeElement);
      const option : echarts.EChartsOption = this.getOptionsExisting()
      this.chartInstanceOverdue.setOption(option)
    }
    //chart TIR
    if(this.chartRefTir && this.chartRefTir.nativeElement){
      this.chartInstanceTir = echarts.init(this.chartRefTir.nativeElement);
      const option : echarts.EChartsOption = this.getOptionsTIR()
      this.chartInstanceTir.setOption(option)
    }
  }

  getOptionsExisting(): echarts.EChartsOption{
    return {
      xAxis: {
        type: 'category',
        data: this.category,
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          lineStyle:{
            color:'#1DD64C',
            width:2,
          },
          smooth: true,
          itemStyle: {
            color: '#1DD64C',
            borderColor: '#FFFFFF',
            borderWidth: 2
          },
          symbol: 'circle',
        }
      ]
    };
  }

  getOptionsTIR(): echarts.EChartsOption{
    return {
      xAxis: {
        type: 'category',
        data: this.category,
        splitLine: { show: false },
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar',
          itemStyle: {
            color: '#1DD64C',
          },
          barWidth: '40%',
        },
      ]
    };
  }
}