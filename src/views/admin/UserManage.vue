<template >

  <div class="UserManage">
    <el-card class="bgc colorhead">
    <el-row type="flex" justify="center" :gutter="5">

      <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="6">
      <el-tag >用户总人数 ：{{allUserNum}}</el-tag>
      </el-col>
      <el-col  :xs="20" :sm="20" :md="16" :lg="12" :xl="12">
        <el-progress :text-inside="true" :stroke-width="18" :percentage="proportion" color="rgba(66, 185, 131, 0.8)">  </el-progress>
      </el-col>

      </el-row>
    </el-card>
    <el-card class="bgc">
    <el-row type="flex" justify="center">

      <el-col :xs="22" :sm="20" :md="20" :lg="18" :xl="18">

            <el-table
              :data="allInfo"
              stripe
              height="500"
              style="width: 100%">
              <el-table-column
                prop="userid"
                label="用户名"
                width="180">
              </el-table-column>
              <el-table-column
                prop="flag"
                label="用户身份"
                width="180">
              </el-table-column>
              <el-table-column
                prop="password"
                label="密码">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-row >
                    <el-col>
                      <!--@click="handleClick(scope.row)"-->
                       <el-button  type="text" size="small" @click=getUseridLimit(scope.row)>修改权限</el-button>
                    </el-col>
                    <el-col>
                        <el-button type="text" size="small" @click=getUseridPasswd(scope.row)>修改密码</el-button>
                      </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>

      </el-col>
    </el-row>
    </el-card>
    <!-- Form 修改密码-->

    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="passwdForm">
        <el-form-item label="新密码" :label-width="formLabelWidth">
          <el-input v-model="passwdForm.password" auto-complete="off" placeholder="请输入密码" clearable/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyPasswd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改权限-->

    <el-dialog title="修改权限" :visible.sync="dialogLimitVisible">
      更改权限为：  <el-select placeholder="请选择" value="" v-model="value">
       <el-option v-for="(item,index) in classUser"
        :key="index"
        :label="item.label"
        :value="item.value">

        </el-option>
      </el-select>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLimitVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyLimit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import  request from '@/utils/request'
  import ElCard from "element-ui/packages/card/src/main";
  import ElRow from "element-ui/packages/row/src/row";
    export default {
      components: {
        ElRow,
        ElCard},
      name: "UserManage",
        data(){
          return{
            allInfo:[],
            dialogFormVisible: false,
            dialogLimitVisible: false,
            passwdForm: {
              password: '',
            },
            formLabelWidth: '120px',
            allUserNum:"",
            proportion:10,
            commonuser:"",
            username:"",
            value:"",
            classUser:[
              {
                label:"普通用户",
                value:"common"
              },
              {
                label:"管理员",
                value:"admin"
              },
              {
                label:"超级管理员",
                value:"editor"
              },
              {
                label:"youk",
                value:"editor"
              }
            ]
          }
      },
        mounted(){
          this.getUserInfo()
        },
      methods:{
          getUserInfo:function () {
            request.get('user/allUserInfo').then(data=>{
              //console.log(data.data.data.userInfo)
              this.allInfo=data.data.data.userInfo
              this.allUserNum=data.data.data.userNum
             // console.log(this.allUserNum)
              this.proportion=this.allUserNum/100*100
             // console.log(this.allInfo)

            })
          },
        handleClick(row) {
          console.log(row.userid);
        },
        getUseridPasswd:function (row) {
          this.dialogFormVisible = true
          this.username=row.userid
        },
        getUseridLimit:function (row) {
          this.dialogLimitVisible = true
          this.username=row.userid
          console.log(row);
          console.log(this.username)
        },
        modifyPasswd:function () {
          let param = new URLSearchParams()
          param.append('modUserId',this.username);
          param.append('password',this.passwdForm.password);
           request.post("/user/modifyPassword",param).then(data=>{
             if(data.data.code===1) {
               this.$alert('修改密码成功', '修改密码', {
                 confirmButtonText: '确定',
                 callback: action => {
                   this.$message({
                     type: 'success',
                     message: data.data.info
                   })
                 }
               })
             }
               else{
                 this.$alert('修改密码失败','修改密码', {
                   confirmButtonText: '确定',
                   callback:action=>{
                     this.$message({
                       type:'error',
                       message:data.data.info
                     })
                   }
                 })
               }
            })
         console.log(this.passwdForm.password)

          this.dialogFormVisible = false
        },
        modifyLimit:function () {
          let param = new URLSearchParams()
          param.append('modUserId',this.username);
          param.append('role',this.value);
            request.post("/user/modifyRole",param).then(data=>{
              console.log(data.data)
            //this.dialogFormVisible = false
            if(data.data.code===1) {
              this.$alert('修改权限成功', '修改权限', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$message({
                    type: 'success',
                    message: data.data.info
                  })
                }
              })
              this.getUserInfo()
            }
            else{
                this.$alert('修改权限失败','修改权限', {
                  confirmButtonText: '确定',
                  callback:action=>{
                    this.$message({
                      type:'error',
                      message:data.data.info
                    })
                  }
                })
              }
          })
          console.log(this.value)

          this.dialogLimitVisible = false
        }
      }
    }
</script>

<style scoped>
.bgc{
 /* background-color: rgb(240,242,245);*/
  margin: 20px;
}
  .colorhead{
  /*  background-color: rgb(235,245,255);*/
  }
</style>
