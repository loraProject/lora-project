<template>

<div class="history-container">

  <el-row :gutter="32">
    <el-col :lg="14" :xl="14" :md="12" :xs="24">

      <el-tabs type="border-card" @tab-click="changeTabs" value="wind">
        <el-tab-pane label="风速" name="wind">
          <data-table :table-data="windData"></data-table>
        </el-tab-pane>
        <el-tab-pane label="温度" name="temperature"> <data-table :table-data="temperatureData"></data-table></el-tab-pane>
        <el-tab-pane label="湿度" name="humidity"> <data-table :table-data="humidityData"></data-table></el-tab-pane>
        <el-tab-pane label="气体浓度" name="gas"> <data-table :table-data="gasData"></data-table></el-tab-pane>

      </el-tabs>

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


    export default {
        name: "HistoryData",
        components:{ControlPanel, DataTable},
        mounted(){
          //初始化
          for (let i= 0; i < 30; i++){
            this.windData.push({date:"2016-01-01",devName:"devName",value:"19"})
          }
          this.downloadList = this.windData;
          this.dataMap = new  Map([['wind',this.windData],['temperature',this.temperatureData],['humidity',this.humidityData],['gas',this.gasData]]);
        },
        data(){
          return { // 具体字段要根据后台来确定
            controlForms: {
              devEui:'',
              durDate:'',
            },
            temperatureData:[],
            windData:new Array(20).fill({date:"2017-01-01",devName:"devName",value:"18"}),
            humidityData:new Array(10).fill({date:"2017-01-01",devName:"humidityData",value:"18"}),
            gasData:new Array(10).fill({date:"2017-01-01",devName:"gasData",value:"18"}),
            show2: true,
            nowTabs:'wind',
            downloadList:'',
            //这个后期应该根据后台数据动态改变
            dataMap:''
          }
        },
        methods:{
          getChangeDate(data){
            this.controlForms.durDate  = data;
            console.log(data);
          },
          exportsheet(sheetName){

            console.log(this.downloadList)
            import('@/vendor/Export2Excel').then(excel=>{
              const tHeader = ['时间', '设备名称', '数据']
              const filterVal = ['date', 'devName', 'value']
              const list =  this.downloadList
              const data = this.formatJson(filterVal, list)
              excel.export_json_to_excel({
                header: tHeader,
                data,
                filename: this.nowTabs + ' | ' + sheetName,
                autoWidth: true
              })

            })

          },
          getDevice(data){
            this.controlForms.devEui = data;
          },
          changeTabs(tab){
            this.nowTabs = tab.name;
            this.downloadList = this.dataMap.get(tab.name);
            console.log(this.downloadList)
          },
          formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
              if (j === 'timestamp') {
                return parseTime(v[j])
              } else {
                return v[j]
              }
            }))
          }
        }

    }
</script>

<style scoped lang="scss">
  .history-container{
    padding: 32px;
    background-color: rgb(240, 242, 245);
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
