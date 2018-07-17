<template>

<div class="history-container">

  <el-row :gutter="32">
    <el-col :lg="14" :xl="14" :md="12" :xs="24">

      <template v-if="sensorPanel.length > 0">
      <el-tabs type="border-card" @tab-click="changeTabs" :value=sensorPanel[0].name>
        <template v-for="item in sensorPanel">
          <el-tab-pane :label=item.label :name=item.name>
            <data-table :table-data=dataMap[item.name]></data-table>
          </el-tab-pane>
        </template>
      </el-tabs>
      </template>
      <template v-if="sensorPanel.length <= 0">
        <el-card style="width: 100%; height: 600px">
          <not-found></not-found>
        </el-card>
      </template>

    </el-col>
    <el-col :lg="10" :xl="10" :md="12" :xs="24">
      <control-panel :change-date-function="getChangeDate" :export-sheet="exportsheet" :get-device="getDevice" ></control-panel>
    </el-col>
  </el-row>

</div>
</template>

<script>

  import ControlPanel from "./components/ControlPanel"
  import DataTable from "./components/dataTable"
  import 'element-ui/lib/theme-chalk/base.css';
  import request from '@/utils/request'
  import NotFound from  './components/404'
  import store from '../../store'  // 引入全局vuex

   /*为了改善阅读效果，当不改变控制面板时不重新请求数据，只有当改变控制面板使重新请求数据*/
    export default {

        name: "HistoryData",
        components:{ControlPanel, DataTable, NotFound},
        mounted(){
          //初始化


        },
        data(){
          return { // 具体字段要根据后台来确定
            controlForms: {  //当前控制台信息
              devEui:'',
              durDate:{
                fromData:'',
                toData:''
              },
            },
            temperatureData:new Array(10).fill({date:"2017-01-01",devName:"temperatureSensor",value:"18"}),
            windData:new Array(20).fill({date:"2017-01-01",devName:"windDataSensor",value:"18"}),
            humidityData:new Array(10).fill({date:"2017-01-01",devName:"HumiditySensor",value:"18"}),
            gasData:new Array(10).fill({date:"2017-01-01",devName:"gasData",value:"18"}),
            show2: true,
            nowTabs:'wind',  // 当前tab
            nowTabObj:'',   //当前tabObj
            downloadList:'', // 下载的list
            //这个后期应该根据后台数据动态改变
            dataMap:{'wind':[],'temperature':[],'humidity':[],'gas':[]}, //数据map
            sensorPanel:[], //tab的列表
            nowTableData:new Array(10).fill({date:"2017-01-01",devName:"nowTable",value:"18"}),
            needRequest:'',

          }
        },
        methods:{
          isReady(){
            if (this.controlForms.devEui == ''
              || this.controlForms.durDate.fromData == ''
              || this.controlForms.durDate.toData == ''
              || this.sensorPanel.length == 0
              || this.nowTabObj == '' || this.needRequest.get(this.nowTabObj.name))
              return false;
            return true;
          }, // 判断是否准备好了切换表格数据
          getChangeDate(datas){
            if (datas != null) {
          //  this.controlForms.durDate  = datas;
          //  console.log(datas)
            const fromDate = datas[0];
            const toData = datas[1];
            this.controlForms.durDate.fromData = this.getRequestFormatDate(fromDate);
            this.controlForms.durDate.toData = this.getRequestFormatDate(toData);
            }else {
              this.controlForms.durDate.fromData = '';
              this.controlForms.durDate.toData = '';
            }
            // 改变准备状态
            this.clearReadyRequest()
           // console.log("准备好了吗",this.isReady());
            if (this.isReady()) {
              this.getTabelData()
            }
          }, //获得日期，然后进行重新请求数据
          exportsheet(sheetName){
            import('@/vendor/Export2Excel').then(excel=>{
              const tHeader = ['时间', '设备名称', '数据']
              const filterVal = ['date', 'devName', 'value']
              const list =  this.dataMap[this.nowTabObj.name]
              const data = this.formatJson(filterVal, list)
              excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: this.nowTabs + ' | ' + sheetName,
                autoWidth: true
              })

            })

          }, // 导出表格
          clearReadyRequest(){
            this.needRequest = new Map();
            this.sensorPanel.forEach((tab)=>{
              this.needRequest.set(tab.name, false); // 需要请求
            })
          }, // 用于清楚已经请求数据的所有表格
          getPanelItem(devEui){
           // console.log("在getPanelItem之中")
            const That = this
            request.get('/user/devices/getDataSensor',{
              params:{
                devEUI:devEui
              }
            }).then((response)=>{
              const res = response.data;
              //console.log(res)
              if (res.code == 1){
                That.sensorPanel = res.data // 获取动态panel
                // 更新
                if (this.sensorPanel!= null && this.sensorPanel.length >0) {
                  this.nowTabObj = this.sensorPanel[0]
                  this.nowTabs = this.nowTabObj.name
                }
                this.clearReadyRequest()// 清空准备信息
                // 判断isReady，使数据能够即使显示到界面中
              //  console.log("in request准备好了吗",this.isReady())
                if (this.isReady()) {
                  this.getTabelData()
                }
              }else {
                That.$message(res.info);
                That.sensorPanel = [] // 清空panel
              }
            })
          //  console.log("在getPanelItem之中2", this.sensorPanel)
          },// 获得panelItem
          getTabelData(){ // 请求历史数据
            let param = new URLSearchParams()
            param.append('date1',this.controlForms.durDate.fromData);
            param.append('date2',this.controlForms.durDate.toData);
            param.append('devEUI',this.controlForms.devEui);
            param.append('typeid',this.nowTabObj.typeid);
            param.append('choice',this.nowTabObj.choice);
            const This  = this
            request.post('/user/device/sensor/data/getdatafromdatetodate',param).then((response)=>{

                const data = response.data;
               // console.log("返回信息",data)
                if (response.status == 200) { //请求成功
                    if (data != null) {
                      This.nowTableData = [] // 清空数组
                      data.sort(this.dataCompare)
                      data.forEach((entry)=> {
                        var obj = new Object();
                        obj.devName = This.nowTabObj.label
                        obj.date = This.getFormatDate(entry.date);
                        obj.value = entry.value;
                        This.nowTableData.push(obj);
                        // 执行commit
                      })
                    }
                  This.needRequest.set(This.nowTabObj.name,true) // 设置不需要再次执行
                    // 缓存
                  this.dataMap[This.nowTabObj.name] =This.nowTableData; // 设置
                  // 一旦请求到数据就要将数据放入全局的vuex中
                  this.commitVuex(); // 执行commitVuex
                //   console.log("dataMap",This.dataMap)
                }
            }).catch((err)=>{
               console.log(err)
            })
          }, // 获得表格data的request请求
          getFormatDate(strDate){
            var year = strDate.substr(0,4);
            var month = strDate.substr(4,2);
            var day = strDate.substr(6,2);
            var hour = strDate.substr(8,2);
            var formateDate = year+'-'+month+'-'+day+' '+hour +':00'
            return formateDate;
          }, // 获得格式化的日期
          getRequestFormatDate(date){
            var strFormat
            var strMonth = date.getMonth()+1
            if (strMonth < 10) strMonth = '0' + strMonth;
            var strDay = date.getDate()
            if (strDay < 10) strDay = '0' + strDay;
            strFormat = date.getFullYear() + strMonth + strDay
            return strFormat
          }, // 获得请求数据
          getDevice(data){
           // console.log("getDevice",data);
            this.getPanelItem(data)
            this.controlForms.devEui = data;
            // 初始化当前tab
          //  console.log("在获得panel之后",this.sensorPanel)
          //  console.log("获得设备",this.nowTabObj);

           // console.log("准备好了吗",this.isReady());
            if (this.isReady()) {
              this.getTabelData()
            }
          }, //获得传感器数据
          changeTabs(tab){
          //  console.log("in change tabs")
            this.nowTabs = tab.name;
            const nowValue = this.sensorPanel.filter((panel)=>panel.name==tab.name )
            if (nowValue.length != 0) this.nowTabObj = nowValue[0] // 获取当前的tab
            this.commitVuex(); // 提交commit数据
            if (this.isReady()) {
              this.getTabelData()
            }
          }, // 切换tab
          formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
              if (j === 'timestamp') {
                return parseTime(v[j])
              } else {
                return v[j]
              }
            }))
          }, // 转换成json
          dataCompare(obj1,obj2){
              return obj1.date > obj2.date
          },
          commitVuex(){  // 向vuex中提交数据, 一旦数据变更，则提交数据

         //   console.log("提交数据")
            store.commit('SET_SENSORNAME', this.nowTabObj.label )  // 当前的传感器名称
        //    console.log("in history data", this.dataMap[this.nowTabObj.name])
            store.commit('SET_SENSORDATA',  this.dataMap[this.nowTabObj.name])  // 当前的数据
            store.dispatch('setDeviceEui', this.controlForms.devEui) // 设置当前的devEui
          }

        }

    }
</script>

<style scoped lang="scss">
  .history-container{
    padding: 32px;
/*    background-color: rgb(240, 242, 245);*/
    min-height: 100%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;

  }

  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>
