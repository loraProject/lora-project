<template>
  <div >
    <el-row type="flex" justify="center">
    <el-col :xl="24" :lg="24" :md="24" :xs="24" :sm="24">
    <el-card>
    <el-form class="add-sensor-form">
      <el-form-item label="设备EUI">
       <el-tag><a>  {{devEui}}</a></el-tag>
      </el-form-item>
      <el-form-item label="设备名称">
        <el-tag>  <a> {{devName}}</a></el-tag>
      </el-form-item>
      <el-form-item label="传感器类型">
        <el-select v-model="value" placeholder="请选择" value="value">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="传感器名称">
        <el-input></el-input>
      </el-form-item>
      <el-row  type="flex" justify="center">
      <el-button type="primary" @click="submitSensor">确认添加</el-button>
      </el-row>
    </el-form>

    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>

  import request from '@/utils/request'
    export default {
        name: "AddSensor",
        props:{
          devName:{
            type:String,
            default() {return"设备名称"}
          },
          devEui:{
            type:String,
            default() {return"设备名称"}
          }
        },
      data(){
          return{
            options: [
              {value:"01",label:"风速传感器"},
              {value:"02",label:"温湿度三合一传感器"},
              {value:"03",label:"GPS"}
            ],
            value:''

          }
      },
      methods:{
        submitSensor(){
          //提交传感器
          console.log("提交数据");
          let param = new URLSearchParams()
          param.append('devEUI',this.devEui);
          console.log(this.value);
          param.append('typeid',this.value);
          const This = this;
          request.post('/user/devices/addsensor ',param).then((request)=>{
              console.log(request)
            const res = request.data;
              if (res.result == true){
                this.$message.success(res.info)
                This.$emit('flushDeviceList')
                console.log("flush设备列表")
              }else {
                this.$message.error(res.info);
              }
          }).catch((err)=>{
            this.$message.error(err);
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .add-sensor-form{
    a{
    }
  }

</style>
