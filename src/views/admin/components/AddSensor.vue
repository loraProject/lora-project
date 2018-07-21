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
      <el-form-item label="传感器id">
        <el-input></el-input>
      </el-form-item>

      <el-form-item label="传感器名称">
        <el-input></el-input>
      </el-form-item>

    </el-form>

    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "AddSensor",
        props:{
          devName:{
            type:String,
            default:"设备名称"
          },
          devEui:{
            type:String,
            default:"设备devEui"
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
