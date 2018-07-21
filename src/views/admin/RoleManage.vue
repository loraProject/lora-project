<template>
    <!--<h1>只有管理员才能看到的权限管理</h1>-->
  <el-row type="flex" justify="center" class="device-manager">
  <el-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
    <el-card >
      <div slot="header" class="clearfix">
        <span>设备管理</span>
      </div>
  <my-tree></my-tree>
    </el-card>
  </el-col>
  </el-row>
</template>

<script>

    import MyTree from './components/MyTree'
    export default {
        name: "RoleManage",
        components:{MyTree}
    }
</script>

<style scoped lang="scss">
    .device-manager {
      padding-top: 30px;
      .el-card{
        height: 100%;
      }
      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }
      .clearfix:after {
        clear: both
      }
    }
</style>
