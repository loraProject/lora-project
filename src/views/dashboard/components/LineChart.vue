<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object
    },
    xAxisData:{ // 底部坐标
      type: Array,
      default(){ return []}
    },
    lenData:{
      type:Array,
      default(){return ['最高9','最低']}
    }
  },
  data() {
    return {
      chart: null,
      nowCity:'',
      weekfuture:[],
      weektemperature:[],
      weektemperature1:[],
      weekWeather:[],
      weekWind:[],
      weekWeek:[],
      weatherLower:[],
      weatherHigh:[],
      todayDescription:[],
      skDescription:[],

    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    if (sidebarElm != null)
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)

    var myCity = new BMap.LocalCity();
    myCity.get(this.myFun); //获得


  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    if (sidebarElm != null)
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  methods: {
    setOptions({ lastWeekData, thisWeekData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.xAxisData,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: this.lenData
        },
        series: [{
          name: this.lenData[0], itemStyle: {
            normal: {
              color: '#FF005A',
              lineStyle: {
                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,
          type: 'line',
          data: lastWeekData,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
        {
          name: this.lenData[1],
          smooth: true,
          type: 'line',
          itemStyle: {
            normal: {
              color: '#3888fa',
              lineStyle: {
                color: '#3888fa',
                width: 2
              },
              areaStyle: {
                color: '#f3f8ff'
              }
            }
          },
          data: thisWeekData,
          animationDuration: 2800,
          animationEasing: 'quadraticOut'
        }]
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    },
/*    getWeatherData(city){

      console.log("获得天气数据")
      console.log(this.nowCity)
      var This = this;
      $.ajax('http://v.juhe.cn/weather/index', {
        data:{cityname:city,key:"60eac358d8575e583538007d5d3f667e"},
        dataType: 'jsonp',
        crossDomain: true,
        success: function (data) {
          if (data && data.resultcode === '200') {
            console.log(data);
            const res = data.result;
            This.handleData(res);
            //打印数据
          }else{
            This.$message.error("获得天气数据失败");
          }
        }

      })
    },
    myFun(result){
      var cityName = result.name;
      this.$notify.success("根据您的IP地址定位当前城市："+cityName); //城市名称
      this.nowCity = cityName;

      this.getWeatherData(this.nowCity); // 获得南京市的天气
    },
    handleData(data){

      var That = this;
      That.weatherHigh=[]
      That.weatherLower=[]
      That.weekWeather=[]
      That.weekWind=[]
      That.weekWeek=[]
      That.weektemperature1=[]
      const futerData = data.future; // 未来的天气
      That.weekfuture= futerData;
      That.todayDescription=data.today
      That.skDescription=data.sk;
      for(var key in That.weekfuture){
        //  console.log(key+':'+That.weekfuture[key])
        That.weektemperature.push(That.weekfuture[key].temperature.split("~")) // 日期数组
        var tmp=That.weekfuture[key].temperature.split("~")
        That.weatherLower.push(tmp[0].toString().replace(/[^0-9]/ig,"")) // 最低温度数组
        That.weatherHigh.push(tmp[1].toString().replace(/[^0-9]/ig,"")) // 最高温度数组
        That.weekWeather.push(That.weekfuture[key].weather) //天气情况
        That.weekWind.push(That.weekfuture[key].wind)  //风力级别
        That.weekWeek.push(That.weekfuture[key].week)  // 横坐标，及星期几
        That.weektemperature1.push(That.weekfuture[key].temperature)
        // console.log(That.weekfuture[key].temperatrue)
      }

    }*/
  }
}
</script>
