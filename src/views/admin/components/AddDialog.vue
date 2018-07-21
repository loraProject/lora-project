<template>
    <el-dialog title="添加设备" :visible.sync="dialogVisible">
      <add-device></add-device>
    </el-dialog>
</template>

<script>

    import AddDevice from './AddDevice'
    export default {
        name: "AddDialog",
        components:{AddDevice},
      props:{
          dialogVisible:{
            type:Boolean ,
            default :false
          }
      }
    }
</script>

<style scoped>

</style>
