<template>
   <!-- <h1>地图展示，用来展示设备所在地，左侧为设备，右侧为地图。</h1>-->
  <div class="map-container" style="height: 100%">
  <el-row :gutter="32">
    <el-col :lg="14" :xl="14" :md="14" :sm="24">
    <el-card class="box-card" style="width: 100% ">
      <div slot="header" class="clearfix">
        <span>设备地图</span>
      </div>
      <div class="text item">
        <bai-du-map ref="map" height="520px"></bai-du-map>
      </div>
    </el-card>
    </el-col >
    <el-col :lg="10" :xl="10" :md="10" :sm="24">
      <el-card style="width: 100%" class="devTable">
        <el-table :data=deviceInfo
                  align="center" style="width: 100%">
          <el-table-column
            prop="devEUI"
            label="设备EUi"
          >
          </el-table-column>
          <el-table-column
          prop="label"
          label="设备名称"
         >
          </el-table-column>

          <el-table-column
          label="地址"
          prop="address">
          </el-table-column>
          <el-table-column
          label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleEdit(scope.$index, scope.row)">显示
              </el-button>

            </template>
          </el-table-column>

        </el-table>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>

/*  import BaiDu from './components/BaiDuMap'*/

    import BaiDuMap from "./components/BaiDuMap";
    import request from '@/utils/request'
export default {

  name: "DeviceMap",
  components: {BaiDuMap},
  data(){
    return {
     /* testData: [{"latitude": '117.89472222222223', "longitude": '30.905', "label": "水产养殖系统2"}],*/
      deviceInfo:[]
    }
  },
  mounted(){
 /*   this.$refs.map.initMap(this.testData);*/
    this.getDeviceList()
  },
  methods:{
    handleEdit(index, row){
      var DataArray = [];
      DataArray.push(row);
      this.$refs.map.addPointArray(DataArray);
    },
    getDeviceList(){
      var This = this
      request.get('/user/getDevices').then((response)=>{
          const res = response.data;
          if (res.code == 1){ //请求成功
            const devTable  = res.data;
            devTable.forEach((obj)=>{
              var devInfo = new Object()
              devInfo.latitude = obj.latitude
              devInfo.longitude = obj.longitude
              devInfo.label = obj.devname
              devInfo.address = obj.address
              devInfo.devEUI = obj.devEUI
              This.deviceInfo.push(devInfo)

            })
            console.log("设备地图",res);//
          }

      })

    }
  }
}
</script>

<style scoped  lang="scss">
 .map-container{
   padding: 32px;
  /* background-color: rgb(240, 242, 245);*/
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

 .box-card {
   width: 480px;
 }

</style>
<style lang="scss">
  .devTable {
    .table-cell-class {
      /*    background-color: aqua;*/
      padding-top: 3px;
      padding-bottom: 3px;
      text-align: center;
    }
    .el-table--medium td, .el-table--medium th{
      padding:10px 0;
    }
    .table-header-class{
      background-color: #d3dce6;
    }
    .cell{
      /*text-align:center;*/
    }
  }
</style>
