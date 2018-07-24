<template>
 <!-- <h1>首页，展示传感器实时数据图表</h1>-->
  <div class="dashboard-container">
  <panel-group v-bind:data1=number @handleSetLineChartData="handleSetLineChartData" class="panel-group"
               :data1=100
               :data2="this.windStep"
               :data3="this.temperatureNumber"
               :data4="this.humidityNumber"
               :wind-direction="windDirection"
  ></panel-group>


    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData"  :x-axis-data="this.xAxisData" :len-data="lengData" ></line-chart>
    </el-row>

    <el-row  :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
        <raddar-chart></raddar-chart>
         </div>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <div class="chart-wrapper">
          <box-card></box-card>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :lg="6">
        <div class="chart-wrapper">
          <box-card></box-card>
        </div>
      </el-col>

    </el-row>

  </div>



</template>

<script>

  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import RaddarChart from './components/RaddarChart'
  import BoxCard from './components/BoxCard'

  // 这个数据后期由后台传递生成

  const lineChartData = {
    newVisitis: {
      lastWeekData: [100, 120, 161, 134, 105, 160, 165],
       thisWeekData: [120, 82, 91, 154, 162, 140, 145]
    },
    wind: {
      lastWeekData: [200, 192, 120, 144, 160, 130, 140],
      thisWeekData: [180, 160, 151, 106, 145, 150, 130]
    },
    temperature: {
      lastWeekData: [80, 100, 121, 104, 105, 90, 100],
      thisWeekData: [120, 90, 100, 138, 142, 130, 130]
    },
    humidity: {
      lastWeekData: [130, 140, 141, 142, 145, 150, 160],
      thisWeekData: [120, 82, 91, 154, 162, 140, 130]
    }
  }



    export default {
        name: "dashboard",
      components:{PanelGroup, LineChart, RaddarChart, BoxCard},
      created(){
          // 此时dom元素还没有被渲染，但是可以找到data中的数据，在此生命周期中初始化data
        for (let i=0; i<7; i++) {
          let thisDay = "周"+"日一二三四五六".charAt((new Date().getDay() + 7 - i) % 7);
          this.xAxisData.unshift(thisDay);
        }
      },
      mounted(){ //获取当前位置

        var myCity = new BMap.LocalCity();
        myCity.get(this.myFun); //获得 获取位置南京市
      },
      data()
      {
        return {
          number: 1024,
          lineChartData: lineChartData.temperature,
          xAxisData:[],
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
          windLow:[],
          windHigh:[],
          lenData: {
            newVisitis: ['最高','最低']
            ,
            wind: ['最低风力级别','最高风力级别'],
            temperature:  ['最高温度','最低温度'],
            humidity:  ['最高4','最低']
          },
          lengData:['最高','最低'],
          windStep:2,
          temperatureNumber:28,
          humidityNumber:84,
          windDirection:''
        }
      },
      methods:{
        getRandomNumber() {
          return
        },
        handleSetLineChartData(type){

          if (type == 'humidity' || type == 'newVisitis') return;
          this.lengData = this.lenData[type]
          this.lineChartData = lineChartData[type]
        },
        handlePanelData(data)
        {
          console.log(data)
          const strHumdity = data.humidity.replace(/[^0-9]/ig,""); //只获取数据
          this.humidityNumber = Number(strHumdity);
          this.temperatureNumber= Number(data.temp); //获取当前温度
          this.windDirection = data.wind_direction; // 获取风的位置
          this.windStep  =  Number(data.wind_strength.replace(/[^0-9]/ig,"")); //2级别

        } ,
        handleData(data){
          console.log(data)
          this.handlePanelData(data.sk);
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
            var windTmep = That.weekfuture[key].wind.split("-")
            That.weatherLower.push(tmp[0].toString().replace(/[^0-9]/ig,"")) // 最低温度数组
            That.weatherHigh.push(tmp[1].toString().replace(/[^0-9]/ig,"")) // 最高温度数组
          //  That.windHigh.push()
            That.windLow.push(windTmep[0].toString().replace(/[^0-9]/ig,"")) // 最风级别度数组
            That.windHigh.push(windTmep[1].toString().replace(/[^0-9]/ig,"")) // 最低风级别

            That.weekWeather.push(That.weekfuture[key].weather) //天气情况
            That.weekWind.push(That.weekfuture[key].wind)  //风力级别
            That.weekWeek.push(That.weekfuture[key].week)  // 横坐标，及星期几
            That.weektemperature1.push(That.weekfuture[key].temperature)
            // console.log(That.weekfuture[key].temperatrue)
          }
          console.log("windlow",That.windLow);
          That.xAxisData = That.weekWeek;
          lineChartData.temperature.thisWeekData = That.weatherLower
          lineChartData.temperature.lastWeekData = That.weatherHigh
          lineChartData.wind.thisWeekData = That.windHigh;
          lineChartData.wind.lastWeekData = That.windLow;


        },
        myFun(result){
          var cityName = result.name;
          this.$notify.success("根据您的IP地址定位当前城市："+cityName); //城市名称
          this.nowCity = cityName;

          this.getWeatherData(this.nowCity); // 获得南京市的天气
        },
        getWeatherData(city){

          var This = this;
          $.ajax('http://v.juhe.cn/weather/index', {
            data:{cityname:city,key:"60eac358d8575e583538007d5d3f667e"},
            dataType: 'jsonp',
            crossDomain: true,
            success: function (data) {
              if (data && data.resultcode === '200') {

                const res = data.result;
                This.handleData(res);
                //打印数据
              }else{
                This.$message.error("获得天气数据失败");
              }
            }

          })
        },

      }
  }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-container {
      padding: 32px;
      background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
