<template>

<div class="history-container">

  <el-row :gutter="32">
    <el-col :lg="14" :xl="14" :md="12" :xs="24">
      <el-tabs type="border-card">
        <el-tab-pane label="风速"><div style="background-color: #C0B639; width: 100%; height: 100px"></div></el-tab-pane>
        <el-tab-pane label="温度"><div  style="background-color: #003639; width: 100%; height: 100px"></div></el-tab-pane>
        <el-tab-pane label="湿度"><div  style="background-color: #C07639; width: 100%; height: 100px"></div></el-tab-pane>
        <el-tab-pane label="气体浓度"><div  style="background-color: #503639; width: 100%; height: 100px"></div></el-tab-pane>
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

    export default {
        name: "HistoryData",
        components:{ControlPanel},
        data(){
          return { // 具体字段要根据后台来确定
            controlForms: {
              devEui:'',
              durDate:'',
            }
          }
        },
        methods:{
          getChangeDate(data){
            this.controlForms.durDate  = data;
            console.log(data);
          },
          exportsheet(sheetName){

          },
          getDevice(data){
            this.controlForms.devEui = data;
            console.log(data);
          },
          getTableData(){
            // 刷新表格数据
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
</style>
