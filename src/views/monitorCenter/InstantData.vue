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

<<<<<<< .merge_file_a16380
  <!--  <el-tabs type="border-card">
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

    </el-tabs>-->
=======
>>>>>>> .merge_file_a15900
    <el-tabs type="border-card"  @tab-click="printlog">
      <template v-for="item in sensorList">
        <el-tab-pane :label="item.name" >
            <el-row type="flex" justify="center">
              <el-tag class="eltag">传感器类型：{{item.label}} ({{item.name}})</el-tag>
              <el-tag class="eltag">传感器名称：{{item.typename}}</el-tag>
              <el-tag class="eltag">传感器状态：{{item.state}}</el-tag>
            </el-row>
        </el-tab-pane>
      </template>
      <el-row type="flex" justify="center">
        <el-col :xs="22" :sm="20" :md="20" :lg="18" :xl="18">
          <div id="Temperature" style="width: 1000px; height:500px;">图表</div>
        </el-col>
      </el-row>
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
<<<<<<< .merge_file_a16380
=======
  import $ from 'jquery'
>>>>>>> .merge_file_a15900
  require('echarts/theme/macarons') // echarts theme
  var websocket;
  var allsensor=new Map()
  var drawflag=""
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
        weburl:"ws://localhost:8090/websocket/",
        webtmpurl:"",
        //token
        token:getToken(),
        /* 实时显示表*/
        lineOptiontest:{
        /*  title: {
            text: '传感器实时数据'
          },*/
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
              show: true
            }
          },
          dataZoom:[
            {
              type:'slider',
              start:40,
              end:90
            }
          ],
          series: [{
            name: 'sensorData',
            type: 'line',
            showSymbol: true,
            hoverAnimation: false,
            data: this.datatest
          }]
        },


    }
    },
    mounted(){
      this.getdevlist()
    },
    destroyed(){
      this.closeWebSocket()
    },
    destroyed(){

    },
    methods:{
<<<<<<< .merge_file_a16380
     /* showLineTemperature:function () {
     /!*   for (var i=0;i<1000;i++){
         // this.dataline.push(this.getdata())
         // this.datatest.push(this.getvalue())
         // console.log(this.dataline[i].value[1])
        }*!/
        /!*-------------------------------实时显示1----------------------*!/
        let linechart =this.$echarts.init(document.getElementById('lineTemperature'))
        linechart.setOption(this.lineOptiontest)
        /!*--------------------------------实时显示2--------------------*!/
        let linechart2 =this.$echarts.init(document.getElementById('lineTemperature2'))
        linechart2.setOption(this.lineOptiontest)

        /!*-----------------------------------------------------------------------*!/

        setInterval(() => {
        /!*  for (var i = 0; i < 5; i++) {
        }*!/
            //data.shift();
          //  this.dataline.push(this.getdata());
            this.datatest.push(this.getvalue())

          /!*-------------------------------数据填入1-------------------------------*!/
          linechart.setOption({
            series: [{
              data: this.datatest
            }]
          });
          /!*-------------------------------数据填入2-------------------------------*!/
          linechart2.setOption({
            series: [{
              data: this.datatest
            }]
          });
        },1000)
        //console.log(this.dataline)

      },*/
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
 /*     getvalue:function () {
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
          /!*获取数据*!/
        }

      },*/
=======
>>>>>>> .merge_file_a15900
      getData:function () {

       const  That=this
        let charts =That.$echarts.init(document.getElementById('Temperature'),'macarons')
        charts.setOption(That.lineOptiontest)
        if('WebSocket' in window){
<<<<<<< .merge_file_a16380
          console.log("ws://localhost:8090/websocket/"+this.webtmpurl)
=======
>>>>>>> .merge_file_a15900
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
          if ( !That.isJSON(event.data) ){ // 如果此时返回的数据不是json串
            console.log("后台发来消息： " + event.data)
            return;
          }
          var data1=JSON.parse(event.data)
          That.splitData(data1)
<<<<<<< .merge_file_a16380
         // allsensor.get("wind").push(data1.wind.value)
          //console.log(allsensor.get("wind"))
          console.log(allsensor)
         // That.alldata.push(That.fillData(data1.wind.value,data1.wind.time))
          //this.lineOptiontest.xAxis[0].data=allsensor.get("time")
=======
>>>>>>> .merge_file_a15900
          charts.setOption({
            xAxis:[{
              data:allsensor.get("date")
            }],
            series: [{
              data: allsensor.get(drawflag)
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
      isJSON(str) {
        if (typeof str == 'string') { // 判断是否是json字符串
          try {
            JSON.parse(str);
            return true;
          } catch (e) {
            return false;
          }
        }
        console.log('It is not a string!')
      },
      closeWebSocket:function () {

        console.log("关闭websocket")
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
        //  console.log(this.allDevList)
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
<<<<<<< .merge_file_a16380
            console.log(this.sensorList)
            console.log(this.sensornum);
=======
         //   console.log(this.sensorList)
           // console.log(this.sensornum);
>>>>>>> .merge_file_a15900
            drawflag=this.sensorList[0].name
            for(var i=0;i<this.sensornum;i++){
              allsensor.set(this.sensorList[i].name,[]) // modify by liuyunxing
            }
            allsensor.set('date',[])

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
          this.webtmpurl = this.weburl + this.value + "/"
          this.getData();
        }
      },
      printlog:function (tab,e) {
<<<<<<< .merge_file_a16380
        console.log(tab.index)
        console.log(tab.label)
=======
       // console.log(tab.index)
      //  console.log(tab.label)
>>>>>>> .merge_file_a15900
        drawflag=tab.label
        let charts =this.$echarts.init(document.getElementById('Temperature'),'macarons')
        charts.setOption(this.lineOptiontest)
      },
      splitData:function (data) {
        for(var i=0;i<this.sensornum;i++)
        {
          allsensor.get(this.sensorList[i].name).push(data[this.sensorList[i].name].value);
<<<<<<< .merge_file_a16380


        }
        console.log(allsensor)
=======
        }
       // console.log(allsensor)
>>>>>>> .merge_file_a15900
        allsensor.get("date").push(data[this.sensorList[i-1].name].date)
      },
      fillData:function (datay,datax) {
        return {
          //name:this.nowtime.toString(),
          value: [
            datax
            /*[this.nowtime.getMonth()+1,this.nowtime.getDate()].join('/') + " " +[this.nowtime.getHours(), this.nowtime.getMinutes(), this.nowtime.getSeconds()].join(':')*/,
            datay
          ]
          /*获取数据*/
        }

      },
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
