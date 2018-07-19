<template>
    <!--<h1>添加设备。。简简单单一个不那么丑陋的表格就好了</h1>-->
  <div class="AddDevice">
        <el-row type="flex" justify="center" class="registerContent">
          <el-col :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
            <el-card class="bgc">
            <el-form label-position="left">
              <el-form-item label="设备名" >
                <el-input placeholder="请输入设备名称" v-model="deviceName">
                </el-input>
              </el-form-item>
              <el-form-item label="设备EUI">
                <el-input  placeholder="请输入设备16位的EUI" v-model="deviceEui">
                </el-input>
              </el-form-item>
              <el-form-item label="设备地址">
               <el-input placeholder="请输入设备地址" v-model="devAddress">
               </el-input>
              </el-form-item>
              <el-row style="width: 35%">
                <el-form-item label="经度" >
                  <el-input  v-model="devLongitude" >
                  </el-input>
                </el-form-item>
                <el-form-item label="维度" >
                  <el-input v-model="devDimensionality">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-form-item>
                <el-button v-on:click="confirmvalue" class="el-icon-location ">
                  获取位置
                </el-button>
                <el-button type="primary" v-on:click="addDevice">确认添加</el-button>
              </el-form-item>
            </el-form>
            </el-card>
          </el-col>
          <el-col :xs="24" :sm="24" :md="16" :lg="12" :xl="8">
            <el-card class="bgc">
            <div id="allmap1" style="height: 520px" >
            </div>
            </el-card>
          </el-col>
        </el-row>
  </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCard from "element-ui/packages/card/src/main";
    import request from  '@/utils/request'
    var lat="138",lng="198",address="南京";
    export default {
      components: {
        ElCard,
        ElRow},
      name: "AddDevice",
      data(){
        return{
          deviceName:"",
          deviceEui:"",
          devDimensionality:lat,
          devLongitude:lng,
          devAddress:"",
          responseinfo:"null",
          responseresult:false,
        }
      },
      mounted(){

      this.getInitmap();
      },
      methods:{
        addDevice:function () {
          request({
            method:'post',
            url:'/user/adddevice',
            params:
              {
                devEUI:this.deviceEui,
                devname:this.deviceName,
                latitude:this.devDimensionality,
                longitude:this.devLongitude,
                address:this.devAddress,


              },

          }).then(response => /*console.log(result.data.info)*/
          {
            this.responseinfo = response.data.info;
            this.responseresult = response.data.result ;
            //console.log(this.responseinfo,this.responseresult)
            /*--------------------成功后的操作-------------------------*/
            if(this.responseresult == true){
              this.$message({
                message:this.responseinfo,
                type:"success"
              });

            }
            else {
              this.$message.error(this.responseinfo);
            }
          })

        },
        getInitmap:function () {
          var map = new BMap.Map('allmap1')
          var point = new BMap.Point(118.903787,31.91416)
          var geoc = new BMap.Geocoder();
          map.centerAndZoom(point, 12);
          var marker = new BMap.Marker(point);        // 创建标注
          map.addOverlay(marker);
          map.enableScrollWheelZoom();   //启用滚轮放大缩小，默认禁用
          map.enableContinuousZoom();
          map.addEventListener("click",function(e){
            //console.log(e.point.lng + "," + e.point.address);

            lng=e.point.lng;
            lat=e.point.lat;
            map.removeOverlay(marker);
            marker = new BMap.Marker(e.point);        // 创建标注
            map.addOverlay(marker);
          // console.log(lat)
            geoc.getLocation(e.point, function(rs){
              var addComp = rs.addressComponents;
              address=addComp.province  + addComp.city + addComp.district + addComp.street +  addComp.streetNumber
             // console.log(address)
             //alert(addComp.province  + addComp.city + addComp.district + addComp.street +  addComp.streetNumber);
            });
          });
        },
        confirmvalue:function () {
          this.devLongitude=lng
          this.devDimensionality=lat
          this.devAddress=address

        }
      }
    }
</script>

<style scoped>
.bgc{
  margin: 40px;
}
  .AddDevice{
/*    background-color:rgb(234, 239, 242);*/
  }
</style>
