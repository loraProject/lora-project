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
                <el-input  placeholder="请输入设备EUI" v-model="deviceEui">
                </el-input>
              </el-form-item>
              <el-form-item label="设备地址">
               <el-input placeholder="请输入设备地址">
               </el-input>
              </el-form-item>
              <el-row style="width: 30%">
                <el-form-item label="经度">
                  <el-input placeholder="138">
                  </el-input>
                </el-form-item>
                <el-form-item label="维度">
                  <el-input placeholder="146">
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


    export default {
      components: {
        ElCard,
        ElRow},
      name: "AddDevice",
      data(){
        return{
          deviceName:"",
          deviceEui:"",
          username:"name"
        }
      },
      methods:{
        addDevice:function () {
          console.log("hi")
          this.$axios({
            method:'post',
            url:'/list/adddevice',
            headers:{
              'Content-type': 'application/json'
            },
            params:
              {
                devEUI:this.deviceEui,
                devname:this.deviceName,
                currentUserid:this.username

              },

          }).then(response =>
          {

            /*--------------------成功后的操作-------------------------*/
            if(true){
              this.$message({
                type:"success"
              });

            }
            else {
              this.$message.error('错');
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
