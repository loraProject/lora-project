<template>
  <div class="instantData history-container" >
      <el-card class="elcard">
        <el-row type="flex" justify="left">
          <el-col  :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
            设备选择
            <el-select  placeholder="请选择设备" v-model="value" value="" @change="jointurl">
              <el-option
                v-for="item in allDevList"
                :key="item.devEUI"
                :label="item.devname"
                :value="item.devEUI">
              </el-option>
              </el-select>
          </el-col>
        </el-row>
      </el-card>

    <el-tabs type="border-card">
          <template v-for="n in 1">
              <el-tab-pane label="风速">
                <div id="" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
              <el-tab-pane label="温度" >
                <div id="lineTemperature" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
              <el-tab-pane label="氨气">
                <div id="lineTemperature2" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
              <el-tab-pane label="湿度">
                <div id="lineTemperature3" style="width: 1000px; height:500px;"></div>
              </el-tab-pane>
          </template>

    </el-tabs>
    <el-tabs type="border-card"  @tab-click="printlog">
      <template v-for="item in sensorList">
        <el-tab-pane :label="item.name" >
          {{item}}
            <el-row type="flex" justify="center">
              <el-tag class="eltag">传感器类型：{{item.label}} ({{item.name}})</el-tag>
              <el-tag class="eltag">传感器名称：{{item.typename}}</el-tag>
              <el-tag class="eltag">传感器状态：{{item.state}}</el-tag>
            </el-row>
        </el-tab-pane>
      </template>
      <div id="Temperature" style="width: 1000px; height:500px;">图表</div>

    </el-tabs>

  </div>
</template>

<script>
  import echarts from 'echarts'
  import Vue from 'vue';
  import { getToken, setToken, removeToken } from '@/utils/auth'
  import ElCard from "element-ui/packages/card/src/main";
  import ElRow from "element-ui/packages/row/src/row";
  import  request from '@/utils/request'
  import ElTabPane from "element-ui/packages/tabs/src/tab-pane";
  var websocket;
  var allsensor=new Map()

  Vue.prototype.$echarts=echarts
  export default {
    components: {
      ElTabPane,
      ElRow,
      ElCard},
    name: "InstantData",
    data(){
      return{
        sensorline:[],
        sensornum:"0",
        alldata:[],
        flag:true,
        datatest:[],
        valueline:Math.random()*1000,

        allDevList:[],
        sensorList:[],
        value:"",
        weburl:"ws://192.168.1.118:8090/websocket/",
        webtmpurl:"",
      /*  nowline :+new Date(2018,1,1),
        nowtime:new Date(),
        oneday:24*3600*1000,*/

        //token
        token:getToken(),
        /* 实时显示表*/
     /*   lineOption:{
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
        },*/
        /*测试*/
        lineOptiontest:{
          title: {
            text: '测试'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          xAxis: {
            type: 'category',
            splitLine: {
              show: false
            }
          },
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
              show: false
            }
          },
          dataZoom:[
            {
              type:'slider',
              start:10,
              end:60
            }
          ],
          series: [{
            name: '模拟数据',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            data: this.datatest
          }]
        },


    }
    },
    mounted(){
      this.showLineTemperature();
      this.getdevlist()
    },
    beforeDestroy(){

    },
    methods:{
      showLineTemperature:function () {
     /*   for (var i=0;i<1000;i++){
         // this.dataline.push(this.getdata())
         // this.datatest.push(this.getvalue())
         // console.log(this.dataline[i].value[1])
        }*/
        /*-------------------------------实时显示1----------------------*/
        let linechart =this.$echarts.init(document.getElementById('lineTemperature'))
        linechart.setOption(this.lineOptiontest)
        /*--------------------------------实时显示2--------------------*/
        let linechart2 =this.$echarts.init(document.getElementById('lineTemperature2'))
        linechart2.setOption(this.lineOptiontest)

        /*-----------------------------------------------------------------------*/

        setInterval(() => {
        /*  for (var i = 0; i < 5; i++) {
        }*/
            //data.shift();
          //  this.dataline.push(this.getdata());
            this.datatest.push(this.getvalue())

          /*-------------------------------数据填入1-------------------------------*/
          linechart.setOption({
            series: [{
              data: this.datatest
            }]
          });
          /*-------------------------------数据填入2-------------------------------*/
          linechart2.setOption({
            series: [{
              data: this.datatest
            }]
          });
        },1000)
        //console.log(this.dataline)

      },
 /*     getdata:function () {
        this.nowline = new Date(+this.nowline + this.oneday);
       // console.log(this.nowline)
        this.valueline = this.valueline +Math.random()*21 - 10;
     //   console.log(this.valueline)
        return {
          //name:this.nowline.toString(),
          name:this.nowline.toString(),
          value:[
            [this.nowline.getFullYear(), this.nowline.getMonth() + 1, this.nowline.getDate()].join('/'),
            Math.round(this.valueline)
          ]
          /!*获取数据*!/
        }
      },*/
      getvalue:function () {
        this.nowtime=new Date()
       // console.log(this.nowtime)
        this.valueline = this.valueline +Math.random()*21 - 10;
      //  console.log(this.valueline)
        return {
          //name:this.nowline.toString(),
          name:this.nowtime.toString(),
          value: [
            [this.nowtime.getMonth()+1,this.nowtime.getDate()].join('/') + " " +[this.nowtime.getHours(), this.nowtime.getMinutes(), this.nowtime.getSeconds()].join(':'),
            Math.round(this.valueline)
          ]
          /*获取数据*/
        }

      },
      getData:function () {

       const  That=this
        let charts =That.$echarts.init(document.getElementById('Temperature'))
        charts.setOption(That.lineOptiontest)
        if('WebSocket' in window){
          console.log("ws://192.168.1.125:8090/websocket/"+this.webtmpurl)
          websocket = new WebSocket(this.webtmpurl+this.token);

          //charts.setOption(this.lineOptiontest)
        }
        else{
          alert('Not support websocket')
        }
        websocket.onerror = function(){
          console.log("error");
        };
        websocket.onopen = function(event){
          console.log("连接成功")
         // setMessageInnerHTML("open");
        }

        //接收到消息的回调方法
        websocket.onmessage = function(event){

         // console.log(That.alldata)
          //That.alldata.push(event.data)
          //var splitdata=That.splitData(event.data)
          //console.log(JSON.parse(event.data))
          var data1=JSON.parse(event.data)
          That.splitData(data1)
         // allsensor.get("wind").push(data1.wind.value)
          //console.log(allsensor.get("wind"))
          console.log(allsensor)
          That.alldata.push(That.fillData(data1.wind.value,data1.wind.time))
          //this.lineOptiontest.xAxis[0].data=allsensor.get("time")
          charts.setOption({
            series: [{
              data: That.alldata
            }]
          });



        }

        //连接关闭的回调方法
        websocket.onclose = function(){

          console.log("关闭连接")
        }
        //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function(){
          websocket.close();
        }
      },
      closeWebSocket:function () {
        websocket.close()
      },
      getdevlist:function () {
        request({
          methods:'post',
          url:'/user/getdevices',
          /*params:{

          }*/
        }).then(data=>{
          // console.log(data.data);
           this.allDevList=data.data;
          console.log(this.allDevList)
        })
      },
      jointurl:function () {
        request.get('/user/devices/getDataSensor',{
          params:{
            devEUI:this.value
          }
        }).then(data=>{
          //console.log(data.data.data)
          this.sensorList=data.data.data
          if (this.sensorList==null) {
            this.sensornum=0
          }
          /*-------------------为空------------------判断-----------------*/
          else {
            this.sensornum=this.sensorList.length
            console.log(this.sensorList)
            console.log(this.sensornum);
            for(var i=0;i<this.sensornum;i++){
              allsensor.set(this.sensorList[i].name,[]) // modify by liuyunxing
            }
            allsensor.set('time',this.sensorline)

          }

        })
        //this.closeWebSocket()
        if (this.flag) {
          //console.log(this.value)
          this.webtmpurl = this.weburl + this.value + "/"
         // console.log(this.weburl)
         // console.log(this.token)
          this.getData();
          this.flag=false
        }
        else{
          this.closeWebSocket()
          //console.log(this.value)
          this.webtmpurl = this.weburl + this.value + "/"
         // console.log(this.weburl)
          this.getData();
        }
      },
      printlog:function (tab,e) {
        console.log(tab.index)
        console.log(tab.label)
      },
      splitData:function (data) {
        for(var i=0;i<this.sensornum;i++)
        {
          //console.log(data[this.sensorList[i]])
          //console.log(this.sensornum)
       /*   console.log(this.sensorList[i].name)
          console.log(data[this.sensorList[i].name].value)
          console.log(allsensor)*/
          allsensor.get(this.sensorList[i].name).push(data[this.sensorList[i].name].value);
          console.log(allsensor)

        }
        allsensor.get("time").push(data[this.sensorList[i-1].name].time)
      },
      fillData:function (datay,datax) {
      /*  this.nowtime=new Date()
        var datatest=Math.random()*10*/
        return {
          //name:this.nowtime.toString(),
          value: [
            datax
            /*[this.nowtime.getMonth()+1,this.nowtime.getDate()].join('/') + " " +[this.nowtime.getHours(), this.nowtime.getMinutes(), this.nowtime.getSeconds()].join(':')*/,
            datay
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
  .elcard{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .eltag{
    margin-left: 20px;
  }
</style>
