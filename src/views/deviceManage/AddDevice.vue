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
              <el-row style="width: 30%">
                <el-form-item label="经度" >
                  <el-input placeholder="138" v-model="devLongitude">
                  </el-input>
                </el-form-item>
                <el-form-item label="维度" >
                  <el-input placeholder="146" v-model="devDimensionality">
                  </el-input>
                </el-form-item>
              </el-row>
              <el-form-item>
                <el-button type="primary" v-on:click="addDevice">确认添加</el-button>
              </el-form-item>
            </el-form>
            </el-card>
          </el-col>
        </el-row>
  </div>
</template>

<script>
    import ElRow from "element-ui/packages/row/src/row";
    import ElCard from "element-ui/packages/card/src/main";
    import request from  '@/utils/request'

    export default {
      components: {
        ElCard,
        ElRow},
      name: "AddDevice",
      data(){
        return{
          deviceName:"",
          deviceEui:"",
          devDimensionality:"",
          devLongitude:"",
          devAddress:"",
          responseinfo:"null",
          responseresult:false,
        }
      },
      methods:{
        addDevice:function () {
          //console.log("hi")
          request({
            method:'post',
            url:'/user/adddevice',
            params:
              {
                devEUI:this.deviceEui,
                devname:this.deviceName,
             /*   this.devDimensionality,
                this.devLongitude,
                this.devAddress,*/


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

        }
      }
    }
</script>

<style scoped>
.bgc{
  margin: 40px;
}
  .AddDevice{
    background-color:rgb(234, 239, 242);
  }
</style>
