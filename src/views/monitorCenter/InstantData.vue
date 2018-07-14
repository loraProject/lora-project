<template>
  <div class="instantData history-container" >
    <h1>实时数据展示，让传3个感器数据能够实时展示</h1>
    <el-tabs type="border-card">
          <template v-for="n in 1">
              <el-tab-pane label="数据显示1">
                <div id="" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
              <el-tab-pane label="lineTemperature" >
                <div id="lineTemperature" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
              <el-tab-pane label="数据显示2">
                <div id="lineTemperature2" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
              <el-tab-pane label="数据显示3">
                <div id="lineTemperature3" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
          </template>


    </el-tabs>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import Vue from 'vue';

  Vue.prototype.$echarts=echarts
  export default {
    name: "InstantData",
    data(){
      return{
        dataline:[],
        valueline:Math.random()*1000,
        nowline :+new Date(2018,1,1),
        oneday:24*3600*1000,

        /* 实时显示表*/
        lineOption:{
          title:{
            text:'lineTemperature'
          },
          tooltip:{
            trigger:'axis',
            formatter:function (params) {
              params = params[0];
              var showdate = new Date(params.name);
              return showdate.getDate() + '/' + (showdate.getMonth() + 1) + '/' + showdate.getFullYear() + ' : ' + params.value[1];
            },
            axisPointer: {
              animation: false
            }
          },
          toolbox: {
            show : true,
            orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                       // 'horizontal' ¦ 'vertical'
            x: 'center',                // 水平安放位置，默认为全图右对齐，可选为：
                                       // 'center' ¦ 'left' ¦ 'right'
                                       // ¦ {number}（x坐标，单位px）
            y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                       // 'top' ¦ 'bottom' ¦ 'center'
                                       // ¦ {number}（y坐标，单位px）
            color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
            backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
            borderColor: '#ccc',       // 工具箱边框颜色
            borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
            showTitle: true,
            feature : {
              mark : {
                show : true,
                lineStyle : {
                  width : 1,
                  color : '#1e90ff',
                  type : 'dashed'
                }
              },
              magicType: {
                show : true,
                title : {
                  line : '动态类型切换-折线图',
                  bar : '动态类型切换-柱形图',
                },
                type : ['line', 'bar']
              },
              restore : {
                show : true,
                title : '还原',
                color : 'black'
              },
              saveAsImage : {
                show : true,
                title : '保存为图片',
                type : 'jpeg',
                lang : ['点击本地保存']
              },
            }
          },
          calculable:true,
          xAxis:{
            type:'time',
            splitLine:{
              show:false
            },
          },
          yAxis:{
            type:"value",
            boundaryGap:[0,'100%'],
            splitLine:{
              show:true
            },
          },
          dataZoom:[
            {
              type:'slider',
              start:10,
              end:60
            }
          ],
          series:[{
            name:'数据',
            type:'line',
            showSymbol:false,
            data:this.dataline,
          }]
        },


    }
    },
    mounted(){
      this.showLineTemperature();
    },
    methods:{
      showLineTemperature:function () {
        for (var i=0;i<1000;i++){
          this.dataline.push(this.getdata())
         // console.log(this.dataline[i].value[1])
        }
        /*-------------------------------实时显示1----------------------*/
        let linechart =this.$echarts.init(document.getElementById('lineTemperature'))
        linechart.setOption(this.lineOption)
        /*--------------------------------实时显示2--------------------*/
        let linechart2 =this.$echarts.init(document.getElementById('lineTemperature2'))
        linechart2.setOption(this.lineOption)
        setInterval(() => {
        /*  for (var i = 0; i < 5; i++) {
        }*/
            //data.shift();
            this.dataline.push(this.getdata());

         // console.log("hi")
          /*-------------------------------数据填入1-------------------------------*/
          linechart.setOption({
            series: [{
              data: this.dataline
            }]
          });
          /*-------------------------------数据填入2-------------------------------*/
          linechart2.setOption({
            series: [{
              data: this.dataline
            }]
          });
        },1000)
        //console.log(this.dataline)

      },
      getdata:function () {
        this.nowline = new Date(+this.nowline + this.oneday);
        this.valueline = this.valueline +Math.random()*21 - 10;
        //console.log(this.valueline)
        return {
          name:this.nowline.toString(),
          value:[
            [this.nowline.getFullYear(), this.nowline.getMonth() + 1, this.nowline.getDate()].join('/'),
            Math.round(this.valueline)
          ]
          /*获取数据*/
        }
      }
    }
  }
</script>

<style scoped>
.wid{
  width: 100%;
}
.history-container{
  padding: 32px;
  background-color: rgb(240, 242, 245);
}
</style>
