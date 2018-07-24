<template>
  <div>
    <el-tree
      :data="data5"
      node-key="id"
      @node-click="getNodeInfo"
      :expand-on-click-node="false"
    >
     <span class="custom-tree-node" slot-scope="{ node, data }">
       <el-row type="flex" :gutter="32" justify="start">
        <el-col :xl="16" :lg="16" :md="16" :sm="16" :xs="16">
         <svg-icon :icon-class=data.icon class-name="card-panel-icon"></svg-icon>
         <el-tag class="user-name-tag" v-if="data.type=='user'">用户名 :{{node.label}}</el-tag>
           <el-tag class="user-name-tag" v-if="data.type=='sensor'" type="success">{{node.label}}</el-tag>
            <el-tag class="user-name-tag" v-if="data.type=='control'" type="info">{{node.label}}</el-tag>
           <el-tag class="user-name-tag" v-if="data.type=='device'" type="danger">{{node.label}}</el-tag>
          <el-tag class="user-name-tag" v-if="needButton(data)" color="#0000">{{node.label}}</el-tag>
            <el-tag class="user-name-tag" v-if="data.type=='controlDevice'" color="#0000">{{node.label}}</el-tag>

          <el-tag v-if="needButton(data)" style="border-radius: 50% "color="#0000">{{data.children.length}}</el-tag>
          <!-- <span  v-if="needButton(data)">列表</span>-->
          <el-tag type="warning" v-if="data.type=='sensor'">{{data.ctype}}</el-tag>
          <el-tag type="danger" v-if="data.type=='control'">{{data.ctype}}</el-tag>
       </el-col>
         <el-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
           <span v-if="needControl(data)">
             <el-switch
               v-model=data.status
               active-color="#13ce66"
               inactive-color="#ff4949"
               @change="handelChange(node,data)"

             >
          </el-switch>
           </span>
          <span class="operate-button">  <!--只有dir需要button-->
          <el-button v-if="needButton(data)"
                     type="success"
                     size="mini"
                     @click="() => append(node,data)" >
            添加
          </el-button>
          <el-button
            v-if="data.type == 'device' ||data.type == 'sensor'"
            type="danger"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>
        </span>
           <span v-if="data.type == 'controlDevice'">
            <el-button
              type="warning"
              size="mini"
              @click="() => getTriggerState(node, data)"
            >
              同步
            </el-button>
             <el-button
               type="warning"
               size="mini"
               @click="() => setTriggerState(node, data)"
             >
              改变状态
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
               管理</el-button>
           </span>
         </el-col>
         </el-row>
      </span>
    </el-tree>
    <el-dialog title="添加设备" :visible.sync="dialogTableVisible" width="80%" center top="10vh"  >
      <add-device :add-user-name="parentName" ref="addDevice" @flushDeviceList = flushDeviceList></add-device>
    </el-dialog>

    <el-dialog title="添加传感器" :visible.sync="sensorDialog" width=400px center top="10vh" > <!--// 根据屏幕进行选择-->
      <add-sensor :add-user-name="parentName" :dev-eui="addDev.eui" :dev-name="addDev.name"  @flushDeviceList = flushDeviceList></add-sensor>
    </el-dialog>
    <el-dialog title="添加继电器" :visible.sync="triggerDialog" width=400px center top="10vh"> <!--// 根据屏幕进行选择-->
      <add-trigger :add-user-name="parentName" :dev-eui="addDev.eui" :dev-name="addDev.name"  @flushDeviceList = flushDeviceList></add-trigger>
    </el-dialog>


  </div>
</template>

<script>

  let id = 1000;
  import AddDevice from './AddDevice'
  import AddSensor from  './AddSensor'
  import request from '@/utils/request'
  import AddTrigger from './AddTrigger'

  export default {
    name: "MyTree",
    components: {AddDevice, AddSensor, AddTrigger},
    created() {
      request.get('/user/getTreeUserInfo').then((response) => {
        const res = response.data;
        const data = res.data;
        if (res.code == 1) {
          this.data5 = data;
        } else {
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
        sensorDialog:false,
        triggerDialog:false,
        parentName: 'user',
        addDeviceNode:'',
        addDev:{
          name:'',
          eui:''
        },
        nowData:{
          devEui:'user',
          userId:'user',
        },
        sensorNode:'', //传感器节点
        delayNode:'' //继电器节点
      }
    },
    methods: {
      flushDeviceList(){
        const userId = this.addDeviceNode.data.label;
        const data = this.addDeviceNode.data;
        const This = this;
        request.get("/user/getTreeDeviceInfo", {
          params: {
            aimUserId: userId  // 请求label
          }
        }).then((request) => {
          data.loaded = false;
          const res = request.data;
          const datas = res.data;
          if (res.code == '1') { //请求成功
            const newChild = datas;
              This.$set(data, 'children', [])

            data.children.push(newChild)
            data.loading = true;
          } else {
            this.$message(res.info);
          }
        })
      },
      append(node, data) {

        if (data.type == 'deviceDir') {

          this.dialogTableVisible = true;
          const parent = node.parent;
          this.parentName = parent.data.label
          this.addDeviceNode = node.parent // 要在当前列表下添加
          // 刷新列表

        }
        else if (data.type == 'sensorDir') {
          this.sensorDialog = true;
          const parent = node.parent;
          this.addDev.name = parent.data.label;
          this.addDev.eui = parent.data.id;
          this.addDeviceNode =   parent.parent.parent //获得最开始的node

        }else if (data.type == 'triggerDir'){
          this.triggerDialog = true;
          const parent = node.parent;
          console.log(parent);
          this.addDev.name = parent.data.label;
          this.addDev.eui = parent.data.id;
          this.addDeviceNode =   parent.parent.parent //获得最开始的node
        }


      },
      handelChange(node, data) {


        if (data.type === "sensor"){ //改变传感器状态

          const loading = this.$loading({
            lock: true,
            text: '正在改变传感器的值，请稍后......',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          var devNode =  node.parent.parent;
          var devEui = devNode.data.id; // 获取devEui;
          var typeId = node.data.typeId;
          var state = '0';
          if (data.status)  state = '1';
          var params = new URLSearchParams();
          params.append('devEUI',devEui);
          params.append('typeid', typeId);
          params.append('state',state)
          request.post('/user/devices/changesensor',params).then((response)=>{
            loading.close()
            const res = response.data;
            if (res.result == false){
              this.$message.error("修改失败，错误信息"+res.info);
              data.status = !data.status; //关闭失败
            }else {
              this.$message.success("修改传感器状态成功");
            }
          }).catch((err)=>{
            loading.close()
            this.$message.error(err);
          })
        }
      },
      remove(node, data) {
        // 删除设备接口，还没有完善
        const loading = this.$loading({
          lock: true,
          text: '正在删除设备，请稍后......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        console.log("in remove", data.type)
        if (data.type == 'device') {
          this.$confirm('此项操作将删除该项目的所有数据，是否继续?', '提示', {
            confirmButtonText: '忍痛删除！！',
            cancelButtonText: "算了吧~",
            type: 'warning'
          }).then(() => {

            var params = new URLSearchParams(); // urlSearchParam
            params.append('devEUI',data.id);
            request.post('/user/deleteDevice',params).then((request)=>{
                console.log(request);
                 const res = request.data;
                 if (res.code == 1){
                   const parent = node.parent;
                   const children = parent.data.children || parent.data;
                   const index = children.findIndex(d => d.id === data.id);
                   children.splice(index, 1);
                   this.$message.success("删除设备成功");
                   this.$notify.warning("您删除了设备"+data.label)
                 }else {
                   this.$message.error(res.info+"，删除设备失败");
                 }
                 loading.close();
            })

          }).catch(() => {
            loading.close();
            this.$message.error("取消操作")
          })
        }
        else if (data.type == 'sensor'){
          this.$confirm('此项操作将删除此用户下的传感器以及传感器的所有数据，是否继续？', '提示', {
            confirmButtonText: '忍痛删除！！',
            cancelButtonText: "算了吧~",
            type: 'warning'
          }).then(()=>{
            // 选择了确定
            const dev = node.parent.parent;
            var devEui = dev.data.id;
            var typeId = data.typeId;
            console.log(dev);

            var params = new URLSearchParams();
            params.append('devEUI',devEui);
            params.append('typeid',typeId);
            console.log(devEui, typeId);

            request.post('/user/devices/deleteSensor',params).then((response)=>{
              const res = response.data;
              if (res.code  == 1){
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
                this.$message.success("删除传感器成功")
                this.$notify.warning("删除传感器"+data.label);
              }else {
                this.$message.error("删除设备失败，错误信息："+res.info);
              }
              loading.close();
            }).catch((err)=>{
              console.log(err);
              loading.close();
            })
          })
        }

      },
      getInfoByUser(data) {
        const This = this;
        if (data.type == 'user') { // 如果是user
          //请求数据
          data.loaded = true;
          request.get("/user/getTreeDeviceInfo", {
            params: {
              aimUserId: data.label  // 请求label
            }
          }).then((request) => {
            data.loaded = false;
            const res = request.data;
            const datas = res.data;
            if (res.code == '1') { //请求成功
              const newChild = datas;
              if (!data.children) {
                This.$set(data, 'children', [])
              }
              data.children.push(newChild)
              data.loading = true;
            } else {
              this.$message(res.info);
            }
          })

        }
      },
      getNodeInfo(data, node, obj) {  // 点击可以获得节点的信息


      },
      needButton(data) {
        return data.type.indexOf("Dir") > 0
      },
      needControl(data) {
        return data.type == "sensor" || data.type == "control"
      },
      getTriggerState(node, data){
        //获得继电器状态
        const devNode = node.parent.parent;
        const devEui = devNode.data.id;
        const delayType = node.data.delayType;
        var delays = node.data.children;
        const loading = this.$loading({
          lock: true,
          text: '正在同步继电器的状态，请稍后......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        request.get('/user/devices/getRelaySwitch',{
          params:{
            devEUI:devEui,
            relayType:delayType
          }
        }).then((request)=>{
          const res = request.data;

          if (res.code == 1){ // 获取状态成功
            const data = res.data; // 获取数据
            this.$message.success("获取消息成功");
            // 处理传感器数据
            // 按照switchid存储数据
            var switchStatus = [];
            data.forEach((delay)=>{
              var index = delay.switchId; // 获得switchId
              switchStatus[index] = delay.state; // 存储状态
            })
            delays.forEach((delay)=>{
                var index = delay.switchId; // 转换状态
                var status = switchStatus[index] ; // 转换状态
                if (status == 1){
                    delay.status = true;
                }else {
                  delay.status = false; // 状态
                }
            });


          }else {
            this.$message.error("获取消息失败"); // 获取消息失败
            this.$notify.err(res.info); // 获取失败
          }
          loading.close();
        }).catch((err)=>{
          loading.close(); // 关闭loading
        })

      },
      setTriggerState(node, data){

        const loading = this.$loading({
          lock: true,
          text: '正在批量改变继电器的状态，请稍后......',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        //改变传感器状态
        const devNode = node.parent.parent;
        const devEui = devNode.data.id;
        const delayType = node.data.delayType;
        var delays = node.data.children;
        var devStatus =  new Object(); // 设备状态
        delays.forEach((delay)=>{  //设备
              var index = delay.switchId; // switchId// 修改Id
              var status = '0';
              if (delay.status)  status = '1';
              devStatus[index] = status;
        })
       var jsonStr = JSON.stringify(devStatus) //json字符串状态
        var params = new URLSearchParams();
        params.append('devEUI', devEui);
        params.append('jsonstr',jsonStr);
        request.post('/user/devices/changeRelayMulSwitch',params).then((request)=>{
          const res = request.data;
          if (res.result == true){
            this.$message.success("改变成功")
          }else {
            this.$message.error(res.info); // 改变失败
          }
          console.log(res);
          loading.close(); //关闭加载
        }).catch((err)=>{
          console.log(err);
          loading.close(); //关闭加载
        })
      },
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
    span {
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
    border-bottom: solid 0.5px rgba(225,225,225,1);
    line-height: 48px;
    width: 100%;
    .operate-button {
      /*margin-left: 80%;*/
    }
    .el-button{
      padding: 5px;
    }
  }

  .custom-tree-node {
    width: 100%;
  }

</style>
