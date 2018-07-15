<template>

  <div class="EchartData">
    <h1>用来展示过去一天历史数据图表</h1>
    <div id="alldata1" style="width: 1000px; height:500px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Vue from 'vue';
  Vue.prototype.$echarts=echarts
    export default {
        name: "EchartsData",
        data(){
            return{
              numberx:['01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00'],
              number1:[2.0, 4.9, 7.0, 23.2, 25.6, 6.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3],
              number2:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              number3:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
              number4:[2.5, 5.9, 3.6, 7.5, 7.3, 8.9, 17.3, 19.4, 16.0, 18.5, 14.0, 10.2],
              optionData:{

                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    type: 'cross'
                  }
                },
                grid: {
                  right: '20%'
                },
                toolbox: {
                  feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                  }
                },
                legend: {
                  data:['风速','降水量','平均温度','溶解氧'],
                  selectedMode:"multiple"
                },
                xAxis: [
                  {
                    type: 'category',
                    axisTick: {
                      alignWithLabel: true
                    },
                    /*data: ['00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00','00:00'*/
                  }
                ],
                yAxis: [
                  {
                    type: 'value',
                    name: '风速',
                    min: 0,
                    max: 250,
                    position: 'right',
                    axisLine: {
                      lineStyle: {
                        color: '#5793f3'
                      }
                    },
                    axisLabel: {
                      formatter: '{value} m/s'
                    }
                  },
                  {
                    type: 'value',
                    name: '降水量',
                    min: 0,
                    max: 250,
                    position: 'right',
                    offset: 80,
                    axisLine: {
                      lineStyle: {
                        color: '#d14a61'
                      }
                    },
                    axisLabel: {
                      formatter: '{value} ml'
                    }
                  },
                  {
                    type: 'value',
                    name: '温度',
                    min: 0,
                    max: 25,
                    position: 'left',
                    axisLine: {
                      lineStyle: {
                        color: '#675bba'
                      }
                    },
                    axisLabel: {
                      formatter: '{value} °C'
                    }
                  },
                  {
                    type: 'value',
                    name: '溶解氧',
                    position: 'left',
                    offset: 60,
                    axisLine: {
                      lineStyle: {
                        color: '#675bff'
                      }
                    },
                    axisLabel: {
                      formatter: '{value} mg/L'
                    }
                  }
                ],
                series: [
                  {
                    name:'风速',
                    type:'line',
                    data:this.number1
                  },
                  {
                    name:'降水量',
                    type:'line',
                    yAxisIndex: 1,
                    data:this.number2
                  },
                  {
                    name:'平均温度',
                    type:'line',
                    yAxisIndex: 2,
                    data:this.number3
                  },
                  {
                    name:'溶解氧',
                    type:'line',
                    yAxisIndex: 3,
                    data:this.number4
                  }
                ]
              }
            }
        },
        mounted(){
          this.showdata()
        },
      methods:{
          showdata:function () {
            let allchart =this.$echarts.init(document.getElementById('alldata1'))
            this.optionData.xAxis[0].data=this.numberx
            allchart.setOption(this.optionData)
            /*------------------------------往多数据显示表里添加数据------------------------------*/
            allchart.setOption({
              series: [
                { name:'风速', data: this.number1},
                { name:'降水量', data:this.number2},
                { name:'平均温度', data:this.number3},
                { name:'溶解氧', data:this.number4}]
            });
          }
      }
    }
</script>

<style scoped>

</style>
