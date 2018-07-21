<template>
  <div>
    <el-tree
      :data="data5"
      node-key="id"
      @node-click="getNodeInfo"
    >
     <span class="custom-tree-node" slot-scope="{ node, data }">
       <el-row type="flex" :gutter="32" justify="space-around">
        <el-col :xl="16" :lg="16" :md="16" :sm="16" :xs="12">
         <svg-icon :icon-class=data.icon class-name="card-panel-icon"></svg-icon>
         <el-tag type="success" class="user-name-tag">{{node.label}}</el-tag>
          <el-tag type="warning" v-if="data.type=='sensor'">{{data.ctype}}</el-tag>
          <el-tag type="danger" v-if="data.type=='control'">{{data.ctype}}</el-tag>
       </el-col>
         <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="12">
           <span v-if="needControl(data)">
             <el-switch
               v-model=data.status
               active-color="#13ce66"
               inactive-color="#ff4949"
               @change="handelChange(data)"

               >
          </el-switch>
           </span>
          <span  class="operate-button">  <!--只有dir需要button-->
          <el-button  v-if="needButton(data)"
                      type="success"
            size="mini"
            @click="() => append(node,data)">
            添加
          </el-button >
          <el-button
            v-if="data.type == 'device' ||data.type == 'sensor'"
            type="danger"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>

           <span v-if="data.type == 'user'">
             <el-button
               size="mini"
               type="primary"
               :loading="data.loaded"
               v-show="!data.loading"
               @click="() => getInfoByUser(data)"
             >
               展开</el-button>
           </span>
         </el-col>
         </el-row>
      </span>
    </el-tree>
    <el-dialog title="添加设备" :visible.sync="dialogTableVisible" width="80%" center top="10vh">
      <add-device :add-user-name="parentName"></add-device>
    </el-dialog>
  </div>
</template>

<script>

  let id = 1000;
  import AddDevice from './AddDevice'
  import request from  '@/utils/request'
  export default {
    name: "MyTree",
    components: {AddDevice},
    mounted(){
      request.get('/user/getTreeUserInfo').then((response)=>{
        const res = response.data;
        const data = res.data;
        if (res.code == 1){
          this.data5 = data;

        }else {
          this.$message(res.info, 'error')
        }

      })
    },
    data() {
      const data = [];
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data)),
        dialogTableVisible: false, //是否打开模态框,
        switchStatus: '',
        parentName:"user"
      }
    },
    methods: {
      append(node,data) {
        console.log("append node", node);
        console.log("append", node.parent.label);
        this.dialogTableVisible = true;
        const parent = node.parent;
        this.parentName =  parent.data.label
        this.parentName ;
        // 使用ajax请求
/*        const newChild = {id: id++, label: 'testtest', icon: 'bug', children: []};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);*/
      },
      handelChange(data) {

        this.$message(data.label + "做出动作" + data.status)
        console.log("on/close", data)
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      getInfoByUser(data){
        /* const newChild = {
            id: 97,
            label: '设备',
            icon: 'device-entry',
            children: [{
              id: 100,
              label: '设备1',
              icon: 'device',
              needButton: true,
              children: [{
                id: 101,
                label: '传感器',
                icon: 'sensor-entry',
                children: [{
                  id: 1001,
                  label: '传感器1',
                  icon: 'device-sensor',
                  needButton: true,
                  status: true,
                  leaf: true
                }]
              }]
            }]
          };*/
        const This = this;
        if (data.type == 'user') { // 如果是user
            //请求数据
            data.loaded = true;
            request.get("/user/getTreeDeviceInfo",{
              params:{
                aimUserId:data.label  // 请求label
              }
            }).then((request)=>{
              data.loaded = false;
              const res = request.data;
              const datas = res.data;
              if (res.code == '1'){ //请求成功
                const newChild = datas;
                if (!data.children) {
                  This.$set(data, 'children', [])
                }
                data.children.push(newChild)
                data.loading = true;
              }else {
                this.$message(res.info);
              }
            })

        }
      },
      getNodeInfo(data, node, obj) {  // 点击可以获得节点的信息


      },
      needButton(data){
      //  console.log(data.type)
         return data.type.indexOf("Dir") > 0
      },
      needControl(data){
         return data.type == "sensor"  || data.type == "control"
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-tree-node__content {
    .card-panel-icon {
      font-size: 28px;
      color: #4AB7BD;
    }
    &:hover {
      .card-panel-icon {

        color: #ffffff;
        background: #4AB7BD;
        border-radius: 10px;

      }
    }
    span{
      margin-left: 10px;
    }
  }

  .user-name-tag {
    margin-left: 18px;
    margin-bottom: 4px;
  }
</style>
<style lang="scss">
  .el-tree-node__content {
    height: 48px;
    line-height: 48px;
    width: 100%;
    .operate-button {
      /*margin-left: 80%;*/
    }
  }

  .custom-tree-node {
    width: 100%;
  }

</style>
