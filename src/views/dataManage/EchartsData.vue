<template>

  <div class="EchartData">

   <!-- <el-button type="primary" v-on:click="getdata">
      获取数据
    </el-button>-->
    <el-row type="flex" justify="center">
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :xs="24" :sm="24" :md="22" :lg="22" :xl="22">
        <el-card>
          <div slot="header" class="clearfix" style="width: 100%">
            <el-row type="flex" justify="center">
              <el-col  :xs="12" :sm="8" :md="8" :lg="5" :xl="3" class="cardmargin">
                <el-tag >
                  设备名称：{{this.devName}}
                </el-tag>
              </el-col>
              <el-col  :xs="12" :sm="8" :md="8" :lg="5" :xl="3" class="cardmargin">
                <el-tag>
                  传感器数据类型：{{this.sensorName}}
                </el-tag>
              </el-col>
              <el-col  :xs="12" :sm="8" :md="8" :lg="5" :xl="3" class="cardmargin">
                <el-tag type="success">
                  历史数据的折线显示
                </el-tag>
              </el-col>
            </el-row>
          </div>
          <el-row>
           <div id="alldata1" style=" height:580px; width: 100%"></div>
          </el-row>

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
  import { debounce } from '@/utils'
  require('echarts/theme/macarons') // echarts theme
  Vue.prototype.$echarts=echarts

    var mychart;
    export default {
        name: "EchartsData",
      components:{
        ElCard,
        ElRow},
      activated(){ // actived
        console.log("in actived")
        if (mychart) {
          mychart.resize()
        }

      },
        data(){
            return{
              charts:'',
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
                  show : true,
                  x:'center',
                  feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                  }
                },
                dataZoom: [
                  {
                    show: true,
                    start: 40,
                    end: 100
                  },
                  {
                    type: 'inside',
                    start: 40,
                    end: 100
                  },
                  {
                    show: true,
                    yAxisIndex: 0,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '85%'
                  }
                ],
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
                    name: '传感器值/应该是单位',
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
                    name:'sensorValue',
                    type:'line',
                    data:this.dateValue
                  },

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
            let allchart =this.$echarts.init(document.getElementById('alldata1'),'macarons');
            console.log("在画图",allchart)
            mychart=allchart
            this.optionData.xAxis[0].data=this.dateValue
            allchart.setOption(this.optionData)
     /*       console.log(this.dateValue)
            /!*------------------------------往多数据显示表里添加数据------------------------------*!/
            console.log(this.sensorValue)*/
            allchart.setOption({
              series: [
                { name:this.sensorName, data: this.sensorValue},
               /* { name:'温度', data:this.number2},
                { name:'湿度', data:this.number3},
                { name:'气体', data:this.number4}*/]
            });

          //mychart.setOption(That.lineOptiontest)
          this.__resizeHanlder = debounce(() => {
            if (mychart) {
              mychart.resize()
              //    console.log("1111改变charts大小")
            }
          }, 100)
          window.addEventListener('resize', this.__resizeHanlder)  // 自适应echarts大小
          //  监听侧边栏，自适应大小
          // this.chart.resize()
          const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
          if (sidebarElm != null)
            sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
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
          mychart.setOption({
            series: [
              { name:this.sensorName, data: this.sensorValue},]
          });
        }
      },
    }
</script>

<style scoped>
  .EchartData{
    padding: 30px;
  }
  .cardmargin{
    margin: 20px;
  }
</style>
