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

    <el-tabs type="border-card"  @tab-click="printlog" >
      <template v-for="item in sensorList">
        <el-tab-pane :label="item.name" >
            <el-row type="flex" justify="center">
              <el-tag class="eltag">传感器类型：{{item.label}} ({{item.name}})</el-tag>
              <el-tag class="eltag">传感器名称：{{item.typename}}</el-tag>
              <el-tag class="eltag">传感器状态：{{item.state}}</el-tag>
            </el-row>
        </el-tab-pane>
      </template>
      <el-row type="flex" justify="left" style="width: 100%">
        <el-col >
          <div id="Temperature" style="width: 1000px; height:500px;">图表</div>
        </el-col>
        <el-card>
        <el-col style="float: right">
          <bai-du-map height="500px" width="300px"> </bai-du-map>
        </el-col>
        </el-card>
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
  import BaiDuMap from "./components/BaiDuMap";
  import $ from 'jquery'
  require('echarts/theme/macarons') // echarts theme
  var websocket;
  var allsensor=new Map()
  var drawflag=""
  Vue.prototype.$echarts=echarts
  export default {
    components: {
      ElTabPane,
      ElRow,
      ElCard,
      BaiDuMap},
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
        weburl:"ws://192.168.1.120:8090/websocket/",
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
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
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
    beforeDestroy(){
      this.closeWebSocket()
    },
    methods:{
      getData:function () {

       const  That=this
        let charts =That.$echarts.init(document.getElementById('Temperature'),'macarons')
        charts.setOption(That.lineOptiontest)
        if('WebSocket' in window){
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
        if (typeof str === 'string') { // 判断是否是json字符串
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
         //   console.log(this.sensorList)
           // console.log(this.sensornum);
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
       // console.log(tab.index)
      //  console.log(tab.label)
        drawflag=tab.label
        let charts =this.$echarts.init(document.getElementById('Temperature'),'macarons')
        charts.setOption(this.lineOptiontest)
      },
      splitData:function (data) {
        for(var i=0;i<this.sensornum;i++)
        {
          allsensor.get(this.sensorList[i].name).push(data[this.sensorList[i].name].value);
        }
       // console.log(allsensor)
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
