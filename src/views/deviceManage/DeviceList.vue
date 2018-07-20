<template>
  <div class="DeviceList">
    <div class="elcard">
    <!--<el-row type="flex" justify="center">-->
      <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" v-for="dev of devList":key="dev.devEUI">
        <el-card class="elcard" >
          设备名：{{dev.devname}}
          <hr>
          设备EUI：{{dev.devEUI}}
          <hr>
          设备维度：{{dev.latitude}}
          <hr>
          设备经度：{{dev.longitude}}
          <hr>
          设备地址：{{dev.address}}
        </el-card>
      </el-col>
   <!--   <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6" >
        <el-card  class="elcard">
          <div>
            second
          </div>

        </el-card>
      </el-col >
      <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6"  >
        <el-card class="elcard">
          <div>
            three
          </div>
        </el-card>
      </el-col>-->
    </div>
  <!--  <ul>
      <li v-for="dev in devList">
        <el-card>
          {{dev.devname}}
        </el-card>
      </li>
    </ul>-->
    </div>
  <!--  </el-row>-->

</template>

<script>
    import ElCard from "element-ui/packages/card/src/main";
    import  request from '@/utils/request'
    export default {
      components: {ElCard},
      name: "DeviceList",
      data(){
        return{
          devname:"",
          devEUI:"",
          latitude:"",
          longitude:"",
          address:"",
          devList:[]
        }
      },
      mounted(){
        this.getdevlist();
      },
      methods:{
        getdevlist:function () {
          request({
            methods:'post',
            url:'/user/getdevices',
            /*params:{

            }*/
          }).then(data=>{
            //console.log(data);
            this.devList=data.data;
            //console.log(this.devList)
          })
        }
      }
    }
</script>

<style scoped>
.DeviceList{

}
  .elcard{
    margin: 40px;
    background-color: rgba(77, 225, 160, 0.31);

  }
</style>
