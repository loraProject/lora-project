<template>
  <div>
    <el-row type="flex" justify="center" :gutter=16>
      <el-col :xl="12" :lg="12" :md="20" :sm="20" :xs="20">
        <el-input v-model="username" >
          <template slot="prepend">用户名</template>
        </el-input>
      </el-col>
      <el-col :xl="3" :lg="3" :md="4" :sm="2" :xs="2">
         <el-button type="success" @click="handleSureOne">确定搜索</el-button>
      </el-col >
      <el-col :xl="3" :lg="3" :md="4" :sm="2" :xs="2">
        <el-button type="danger" @click="handleOne">包含搜索</el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <my-tree :data6="userData"></my-tree>
    </el-row>
  </div>
</template>

<script>

  import MyTree from './MyTree'
    export default {
        name: "OnlyUser",
      components: {MyTree},
      props:{
        allUser:{
          type:Array,
          default(){
            return [{label:"tang"}];
          }
        }
      },
      data(){
          return{
            username:'',
            userData:[],
          }
      },
      methods:{
        handleOne(){
          this.userData = this.allUser.filter((element)=>{
          /*  console.log(element.id.indexOf(this.username))*/
           return element.id === this.username || element.id.indexOf(this.username) >= 0
          });


        },
        handleSureOne(){

          this.userData = this.allUser.filter((element)=>{
            /*  console.log(element.id.indexOf(this.username))*/
            return element.id === this.username;
          });
         // console.log(this.userData)

        }
      },


    }
</script>

<style scoped>

</style>
