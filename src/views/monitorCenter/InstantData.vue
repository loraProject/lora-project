<template>
  <el-row  type="flex" justify="center">
  <el-col class="instantData history-container"  :xl="20" :lg="22" :md="24" :sm="24" :xs="24">
      <el-card class="elcard">
        <div slot="header" class="clearfix" style="width: 100%">
          <el-row type="flex" justify="left"  :gutter="40" style="width: 100%">
            <el-col  :xs="12" :sm="16" :md="4" :lg="3" :xl="3" style="line-height: 36px">
              设备选择
            </el-col >
            <el-col >
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
        </div>
        <el-tabs   @tab-click="printlog">
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
            <el-col :xs="20" :sm="20" :md="18" :lg="18" :xl="18" v-show="notFound">
              <not-found ></not-found>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16" v-show="divShow">
              <div id="Temperature" style="width: 800px; height:500px;" > </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8"  v-show="divShow">
              <el-row type="flex" justify="center" :gutter="32">
                <el-tag>{{lng}}</el-tag><el-tag>,</el-tag><el-tag>{{lat}}</el-tag>
              </el-row>
              <el-row><div id="gpsmap" style="width: 100%; height:450px;margin: 20px"></div></el-row>
            </el-col>
          </el-row>
        </el-tabs>

      </el-card>




  </el-col>
  </el-row>
</template>

<script>
  import echarts from 'echarts'
  import NotFound from './components/401'
  import Vue from 'vue';
  import { getToken, setToken, removeToken } from '@/utils/auth'
  import ElCard from "element-ui/packages/card/src/main";
  import ElRow from "element-ui/packages/row/src/row";
  import  request from '@/utils/request'
  import ElTabPane from "element-ui/packages/tabs/src/tab-pane";
  import $ from 'jquery'
  require('echarts/theme/macarons') // echarts theme
  var websocket;
  var allsensor=new Map()
  var drawflag=""
  var map;
  var marker;
  Vue.prototype.$echarts=echarts
  export default {
    components: {
      ElTabPane,
      NotFound,
      ElRow,
      ElCard},
    name: "InstantData",
    data(){
      return{
        notFound:true,
        divShow:false,
        sensorline:[],
        sensornum:"0",
        alldata:[],
        flag:true,
        datatest:[],
        valueline:Math.random()*1000,

        allDevList:[],
        sensorList:[],
        value:"",
        weburl:"ws://www.liuyunxing.cn:8090/websocket/",  // 实时数据url
        webtmpurl:"",
        lat:"",
        lng:'',
        lang:"",
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
      this.getInitmap(118.903787,31.91416)
    },
    destroyed(){
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
            That.$notify.success("开始获取实时数据");
            return;
          }
          var data1=JSON.parse(event.data)
          /*---------------------截取gps数据绘图---------------------*/
          That.lat=data1.latitude.value
          That.lng=data1.longitude.value

          //console.log(That.lat)
         // console.log(That.lng)
          That.getNewGps(That.lng,That.lat)
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
          if (this.sensorList==null || this.sensorList.length == 0) {
            this.sensornum=0
            this.notFound = true;
            this.divShow = false;
            this.$notify.warning("此设备还没有传感器，请联系管理员添加传感器")
          }
          /*-------------------为空------------------判断-----------------*/
          else {
            this.notFound = false;
            this.divShow = true;
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
        charts.setOption({
          xAxis:[{
            data:allsensor.get("date")
          }],
          series: [{
            data: allsensor.get(drawflag)
          }]
        });
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
            datax,
            datay
          ]
          /*获取数据*/
        }

      },
      getInitmap:function (x,y) {
        map = new BMap.Map('gpsmap')
        var point = new BMap.Point(x,y)
        map.centerAndZoom(point, 12);
        marker = new BMap.Marker(point);        // 创建标注
        map.addOverlay(marker);
        map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
        map.enableContinuousZoom();
      },
      getNewGps:function (x,y) {
        map.removeOverlay(marker);
        var ggPoint=new BMap.Point(x,y);
        var convertor=new BMap.Convertor;
        var pointArr = [];
        pointArr.push(ggPoint);
        convertor.translate(pointArr, 1, 5, function (data){
          if(data.status === 0) {
            marker = new BMap.Marker(data.points[0]);
            map.addOverlay(marker);
            console.log(data)
            var label = new BMap.Label("("+data.points[0].lng+","+data.points[0].lat+")",{offset:new BMap.Size(-40,-20)});
          //  marker.setLabel(label); //添加百度label
            map.setCenter(data.points[0]);
          }
        })

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
 /* background-color: rgb(240, 242, 245);*/
}
  .elcard{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .eltag{
    margin-left: 20px;
  }
</style>
