<template>
    <div class="temperatureDa">
      <el-card class="cardm">
        <el-row type="flex" justify="center">
          <el-col :xs="22" :sm="20" :md="20" :lg="18" :xl="18">

            <div id="Weather" style="width: 700px; height:433px;">未来一周温度</div>
          </el-col>
        </el-row>
      </el-card>
      <el-card class="cardm">
        <el-card style="background-color: #F0F2F5">
          <el-row type="flex" justify="right">
            <el-col>
              {{weekWeek[0]}}
            </el-col>
            <el-col>
              {{weekWeek[1]}}
            </el-col>
            <el-col>
              {{weekWeek[2]}}
            </el-col>
            <el-col>
              {{weekWeek[3]}}
            </el-col>
            <el-col>
              {{weekWeek[4]}}
            </el-col>
            <el-col>
              {{weekWeek[5]}}
            </el-col>
            <el-col>
              {{weekWeek[6]}}
            </el-col>

          </el-row>
        </el-card>
        <el-card>
          <el-row type="flex" justify="right">
            <el-col>
              {{weekWeather[0]}}
            </el-col>
            <el-col>
              {{weekWeather[1]}}
            </el-col>
            <el-col>
              {{weekWeather[2]}}
            </el-col>
            <el-col>
              {{weekWeather[3]}}
            </el-col>
            <el-col>
              {{weekWeather[4]}}
            </el-col>
            <el-col>
              {{weekWeather[5]}}
            </el-col>
            <el-col>
              {{weekWeather[6]}}
            </el-col>

          </el-row>
        </el-card>
        <el-card>
          <el-row type="flex" justify="right">
            <el-col>
              {{weekWind[0]}}
            </el-col>
            <el-col>
              {{weekWind[1]}}
            </el-col>
            <el-col>
              {{weekWind[2]}}
            </el-col>
            <el-col>
              {{weekWind[3]}}
            </el-col>
            <el-col>
              {{weekWind[4]}}
            </el-col>
            <el-col>
              {{weekWind[5]}}
            </el-col>
            <el-col>
              {{weekWind[6]}}
            </el-col>

          </el-row>
        </el-card>
      </el-card>
      <el-card class="mbg1">
        <el-row type="flex" justify="right">
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            天气:<img :src="weatherimg" class="imgstyle">
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{todayDescription.weather}}
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            当前温度:<img :src="temperatureimg" class="imgstyle">
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{skDescription.temp}}℃
          </el-col>
        </el-row>
      </el-card>
        <el-card class="mbg2">
          <el-row type="flex" justify="right">
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
              风速:
            </el-col>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
              {{skDescription.wind_strength}}
            </el-col>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
              风向:
            </el-col>
            <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
              {{skDescription.wind_direction}}
            </el-col>
          </el-row>
        </el-card>
      <el-card class="mbg1">
        <el-row type="flex" justify="right">
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            湿度:    <img :src="humidity" class="imgstyle">
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{skDescription.humidity}}
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            紫外线指标:
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{todayDescription.uv_index}}
          </el-col>
        </el-row>
      </el-card>
      <el-card class="mbg2">
        <el-row type="flex" justify="right">
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            着装指标:
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{todayDescription.dressing_index}}
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            着装建议:
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{todayDescription.dressing_advice}}
          </el-col>
        </el-row>
      </el-card>
      <el-card class="mbg1">
        <el-row type="flex" justify="right">
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            洗涤指标:
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{todayDescription.wash_index}}
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            旅行指标:
          </el-col>
          <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="4">
            {{todayDescription.travel_index}}
          </el-col>
        </el-row>
      </el-card>

    </div>
</template>

<script>
  import request from '@/utils/request'
  import echarts from 'echarts'
  import Vue from 'vue';
  import ElCard from "element-ui/packages/card/src/main";
  import ElRow from "element-ui/packages/row/src/row";
  Vue.prototype.$echarts=echarts
    export default {
      components: {
        ElRow,
        ElCard},
      name: "temperature-da",
      data(){
          return{
            weekfuture:[],
            weektemperature:[],
            weekWeather:[],
            weekWind:[],
            weekWeek:[],
            weatherLower:[],
            weatherHigh:[],
            todayDescription:[],
            skDescription:[],
            optionWeather:{
              title:{
                text:"未来一周的温度"
              },
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
                  magicType: {type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true},

                }
              },
              legend: {
                data:['最高温度','最低温度'],
                // selectedMode:"multiple"
              },
              xAxis: [
                {
                  type: 'category',
                  axisTick: {
                    alignWithLabel: true
                  },
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: '温度 ℃',
                  position: 'left',
                  axisLine: {
                    lineStyle: {
                      color: '#5793f3'
                    }
                  },

                },
              ],
              series: [
                {
                  name:'最低温度',
                  type:'line',
                  smooth: true
                },
                {
                  name:'最高温度',
                  type:'line',
                  smooth: true
                },
              ]
            },
            sunshine:'../../../../static/img/sunshine.png',
            temperatureimg:'../../../../static/img/temperature.png',
            humidity:'../../../../static/img/humidity.png',
            weatherimg:'../../../../static/img/weather.png'

          }
      },
      mounted(){
          this.getweather()
      },
      methods:{
        getweather:function () {
          const That=this
          let charts =That.$echarts.init(document.getElementById('Weather'))
          charts.setOption(That.optionWeather)
          /*request.get("http://v.juhe.cn/weather/index?cityname=%E5%8D%97%E4%BA%AC&key=60eac358d8575e583538007d5d3f667e",{
          dataType: 'jsonp'}).then(data=>
          {
            console.log(data.data)
          })*/
          /* $.get("http://v.juhe.cn/weather/index?cityname=%E5%8D%97%E4%BA%AC&key=60eac358d8575e583538007d5d3f667e",function(data,status){
            alert("Data: " + data + "nStatus: " + status);
            console.log(data.data)
          });*/
          $.ajax('http://v.juhe.cn/weather/index?cityname=%E5%8D%97%E4%BA%AC&key=60eac358d8575e583538007d5d3f667e', {
            dataType: 'jsonp',
            crossDomain: true,
            success: function (data) {
              if (data && data.resultcode === '200') {
                //console.log(data);
                That.weekfuture=data.result.future
                That.todayDescription=data.result.today
                That.skDescription=data.result.sk
                for(var key in That.weekfuture){
                //  console.log(key+':'+That.weekfuture[key])
                  That.weektemperature.push(That.weekfuture[key].temperature.split("~"))
                  var tmp=That.weekfuture[key].temperature.split("~")
                  That.weatherLower.push(tmp[0].toString().replace(/[^0-9]/ig,""))
                  That.weatherHigh.push(tmp[1].toString().replace(/[^0-9]/ig,""))
                  That.weekWeather.push(That.weekfuture[key].weather)
                  That.weekWind.push(That.weekfuture[key].wind)
                  That.weekWeek.push(That.weekfuture[key].week)
                 // console.log(That.weekfuture[key].temperatrue)
                }
           /*     console.log(That.weektemperature)
                console.log(That.weekWind)
                console.log(That.weekWeather)
                console.log(That.weatherLower)*/
                //console.log(String(nowtime.getFullYear())+String(nowtime.getMonth()))
                // console.log(this.weekfuture)
                charts.setOption({
                  xAxis:[{
                    data:That.weekWeek
                  }],
                  series: [{
                    name:"最低温度",
                    data: That.weatherLower
                  },{
                    name:"最高温度",
                    data: That.weatherHigh
                  }]
                });
              }
            }

          })
        }
      }
    }
</script>

<style scoped>
.cardm{
  margin: 20px;
}
  .mbg1{
    margin-left: 20px;
    margin-right: 20px;
  }
.mbg2{
  margin-left: 20px;
  margin-right: 20px;
  background-color: rgb(240,242,245);
}
  .imgstyle{
    width: 30px;
    height: 30px;
  }
</style>
