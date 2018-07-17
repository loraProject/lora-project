<template>

  <div class="EchartData">
    <el-row type="flex" justify="center">
      <el-col  :xs="12" :sm="10" :md="8" :lg="5" :xl="3" class="cardmargin">
        <el-card>
       设备名称：{{this.devName}}
        </el-card>
      </el-col>
        <el-col  :xs="12" :sm="10" :md="8" :lg="5" :xl="3" class="cardmargin">
          <el-card>
        传感器数据类型：{{this.sensorName}}
          </el-card>
        </el-col>
      <el-col  :xs="12" :sm="10" :md="8" :lg="5" :xl="3" class="cardmargin">
        <el-card>
          历史数据的折线显示
        </el-card>
      </el-col>
    </el-row>
   <!-- <el-button type="primary" v-on:click="getdata">
      获取数据
    </el-button>-->
    <el-row type="flex" justify="center">
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="20" :lg="18" :xl="16">
        <el-card>
        <div id="alldata1" style=" height:500px;"></div>
        </el-card>
      <!--  <el-button type="primary" v-on:click="getdata">
          获取数据
        </el-button>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { mapGetters } from 'vuex' // 引入全局vuex的mapGetters
  import Vue from 'vue';
  import  request from '@/utils/request'
  import  store from '../../store'
  import ElRow from "element-ui/packages/row/src/row";
  import ElCard from "element-ui/packages/card/src/main";
  Vue.prototype.$echarts=echarts

    var mychart;
    export default {
        name: "EchartsData",
      components:{
        ElCard,
        ElRow},
        data(){
            return{
              numberx:['00:00','01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
         /*     number1:[2.0, 4.9, 7.0, 23.2, 25.6, 6.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3,2.0, 4.9, 7.0, 23.2, 25.6, 6.7, 35.6, 62.2, 32.6, 20.0, 6.4, 3.3],
              number2:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3,2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              number3:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2,2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2],
              number4:[2.5, 5.9, 3.6, 7.5, 7.3, 8.9, 17.3, 19.4, 16.0, 18.5, 14.0, 10.2,2.5, 5.9, 3.6, 7.5, 7.3, 8.9, 17.3, 19.4, 16.0, 18.5, 14.0, 10.2],*/
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
                  data:['sensorvalue'],
                 // selectedMode:"multiple"
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
                    name: 'sensorValue',
                    position: 'left',
                    axisLine: {
                      lineStyle: {
                        color: '#5793f3'
                      }
                    },
                  /*  axisLabel: {
                      formatter: '{value} m/s'
                    }*/
                  },
                  /*{
                    type: 'value',
                    name: '温度',
                    position: 'right',
                    offset: 80,
                    axisLine: {
                      lineStyle: {
                        color: '#d14a61'
                      }
                    },
                    axisLabel: {
                      formatter: '{value} °C'
                    }
                  },
                  {
                    type: 'value',
                    name: '湿度',
                    position: 'left',
                    axisLine: {
                      lineStyle: {
                        color: '#675bba'
                      }
                    },
                    axisLabel: {
                      formatter: '{value}  %RH'
                    }
                  },
                  {
                    type: 'value',
                    name: '气体',
                    position: 'left',
                    offset: 60,
                    axisLine: {
                      lineStyle: {
                        color: '#675bff'
                      }
                    },
                    axisLabel: {
                      formatter: '{value}  g/L'
                    }
                  }*/
                ],
                series: [
                  {
                    name:'sensorValue',
                    type:'line',
                    data:this.dateValue
                  },
                 /* {
                    name:'温度',
                    type:'line',
                    yAxisIndex: 1,
                    data:this.number2
                  },
                  {
                    name:'湿度',
                    type:'line',
                    yAxisIndex: 2,
                    data:this.number3
                  },
                  {
                    name:'气体',
                    type:'line',
                    yAxisIndex: 3,
                    data:this.number4
                  }*/
                ]
              },
            }
        },
   /*   props:['dataall'],*/
        mounted(){

          this.showdata()
        },
      computed:{   // 添加computed,从vuex中获取数据
        ...mapGetters([
            'devName',
            'sensorName',
            'sensorValue',
            'dateValue'
        ])
      },
      methods:{
        showdata:function () {
            let allchart =this.$echarts.init(document.getElementById('alldata1'))
            mychart=allchart
            this.optionData.xAxis[0].data=this.dateValue
            allchart.setOption(this.optionData)
     /*       console.log(this.dateValue)
            /!*------------------------------往多数据显示表里添加数据------------------------------*!/
            console.log(this.sensorValue)*/
            allchart.setOption({
              series: [
                { name:'sensorname', data: this.sensorValue},
               /* { name:'温度', data:this.number2},
                { name:'湿度', data:this.number3},
                { name:'气体', data:this.number4}*/]
            });
          },
      /*    getdata:function () {
            let param=new URLSearchParams()
            param.append('date1',"20180715");
            param.append('date2',"20180716");
            param.append('devEUI',"004a770066003304");
            param.append('typeid',"02");
            param.append('choice',"qiti");
          request.post('/user/device/sensor/data/getdatafromdatetodate', param).then(data=>{
            /!*console.log(data.data);*!/
            this.dataall=data.data;
            console.log(data.data)
            this.dataall.sort(this.dataCompare)
            console.log(this.dataall)
            this.number1=this.dataall
            let allchart =this.$echarts.init(document.getElementById('alldata1'))
            this.optionData.xAxis[0].data=this.numberx
            allchart.setOption({
              series: [
                { name:'风速', data: this.sensorValue},
                { name:'温度', data:this.number2},
                { name:'湿度', data:this.number3},
                { name:'气体', data:this.number4}]
            });
          })

        },*/
        printData(){
      /*    console.log(this.devName)
          console.log(this.sensorName)
          console.log(this.sensorValue)
          console.log(this.dateValue)
          console.log(store.state.sensorData.devName)*/
        },
        dataCompare:function (obj1,obj2) {
          return obj1.date-obj2.date
        }

      },
      watch: {

        sensorValue(val, oldVal) {//普通的watch监听
          console.log(this.sensorValue)
          this.optionData.xAxis[0].data=this.dateValue
          mychart.setOption(this.optionData)
       //   this.mychar.setOption(this.optionData)
       /*   console.log(this.dateValue)*/


            //  this.optionData.xAxis[0].data=this.dateValue
          mychart.setOption({
            series: [
              { name:'sensorname', data: this.sensorValue},]
           /*  { name:'温度', data:this.number2},
               { name:'湿度', data:this.number3},
               { name:'气体', data:this.number4}]*/
          });
        }
      },
    }
</script>

<style scoped>
  .cardmargin{
    margin: 20px;
  }
</style>
