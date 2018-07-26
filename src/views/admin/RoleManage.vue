<template>
    <!--<h1>只有管理员才能看到的权限管理</h1>-->
  <el-row type="flex" justify="center" class="device-manager">
  <el-col :xl="16" :lg="16" :md="16" :sm="24" :xs="24">
    <el-card  >
      <div slot="header" class="clearfix">
        <span>设备管理</span>
        <el-button size="mini" type="danger" style="float: right" @click="showDia" >对指定用户管理</el-button>
      </div>
  <my-tree :data6="treeData"></my-tree>
    </el-card>
  </el-col>
    <el-dialog title="指定用户管理" :visible.sync="showDialog" width="60%" center top="10vh">
     <only-user :all-user="treeData"></only-user>
    </el-dialog>
  </el-row>
</template>

<script>

    import MyTree from './components/MyTree'
    import request from '@/utils/request'
    import OnlyUser from './components/OnlyUser'
    export default {
        name: "RoleManage",
        components:{OnlyUser, MyTree},
        data(){
          return{
            treeData:[],
            showDialog:false
          }
        },
        mounted(){
          request.get('/user/getTreeUserInfo').then((response) => {
            const res = response.data;
            const data = res.data;
            if (res.code == 1) {
              this.treeData = data;
              console.log(this.treeData)
            } else {
              this.$message(res.info, 'error')
            }

          })
        },
        methods:{
          showDia(){
            console.log(this.showDialog)
            this.showDialog  = true;
          }
        }
    }
</script>

<style scoped lang="scss">
    .device-manager {
      padding-top: 10px;
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
