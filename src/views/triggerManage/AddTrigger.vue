<template>
<div class="Trigger">

  <el-row type="flex" justify="center">
    <el-col :xl="22" :lg="22">
    <el-card  v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(100, 100, 100, 0.3)">
      <div slot="header" class="clearfix" style="width: 100%">
        <el-row type="flex" justify="left" :gutter="32">
          <el-col :xs="20" :sm="20" :md="20" :lg="5" :xl="4" >
            <el-select  placeholder="请选择设备" v-model="value" value="" @change="getSensorData">

              <el-option
                v-for="item in allDevList"
                :key="item.devEUI"
                :label="item.devname"
                :value="item.devEUI">
              </el-option>
            </el-select>
          </el-col>
          <el-tooltip content="速率设置，如若设置速率，请先选择设备" placement="top" :disabled="!disabled">
            <el-input-number v-model="num1" :min="8" :max="60" label="速率设置"> </el-input-number>
          </el-tooltip>
          <el-button v-bind:disabled="disabled" type="primary" style="margin-left: 5px" v-on:click="setRate">
            速率设置
          </el-button>

        </el-row>
      </div>
      <el-row  :gutter="40" style="padding: 32px">
        <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
          <el-table
            class="trigger-table"
            :data="sensorList"
            stripe
            height="400">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
            prop="typename"
            label="传感器名称">
          </el-table-column>
            <el-table-column
              prop="name"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                    <!--@click="handleClick(scope.row)"-->
                    <el-button  type="text" size="small" @click=printmsg1(scope.row)>修改状态</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col  class="hidden-sm-and-down"  :lg="1" :xl="1" :md="1">
          <div style="height: 400px; width: 1px ; background: rgba(131,149,131,0.42)"></div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="11" :lg="11" :xl="11">
          <el-table
            :data="triggerList"
            class="trigger-table"
            stripe
            height="400">
            <el-table-column
              type="index"
              width="50">
            </el-table-column>
            <el-table-column
              prop="relayName"
              label="继电器名称">

            </el-table-column>
            <el-table-column
              prop="relayType"
              label="继电器类型">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <!--@click="handleClick(scope.row)"-->
              <!--  <el-button  type="text" size="small" @click=printmsg2(scope.row)>修改状态</el-button>-->
                <el-button  type="text" size="small" icon="el-icon-more" @click=printmsg3(scope.row) circle> </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-dialog title="修改传感器状态" :visible.sync="dialogVisible1">
        更改状态为：  <el-select placeholder="请选择" value="" v-model="value1">
        <el-option v-for="(item,index) in switchstatus1"
                   :key="index"
                   :label="item.label"
                   :value="item.value1">

        </el-option>
      </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="modifyStatusSen">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改设备状态" :visible.sync="dialogVisible2">
      <!--  更改状态为：  <el-select placeholder="请选择" value="" v-model="value2">-->
     <!--   <el-option v-for="(item,index) in switchstatus2"
                   :key="index"
                   :label="item.label"
                   :value="item.value2">

        </el-option>-->
        <el-table
          :data="swtichStatus"
          stripe
          height="400"
          v-loading="loadSwtich">
          <el-table-column
            prop="switchId"
            label="开关Id">
          </el-table-column>
          <el-table-column
            prop="switchName"
            label="开关名称">
          </el-table-column>
          <el-table-column
            prop="state"
            label="开关状态">
          </el-table-column>
          <el-table-column label="操作">
        <!--      更改状态为：  <el-select placeholder="请选择" value="" v-model="value2">
               <el-option v-for="(item,index) in switchstatus2"
                          :key="index"
                          :label="item.label"
                          :value="item.value2">

               </el-option>
             </el-select>-->
              <template slot-scope="props" >
              <!--  <el-select placeholder="请选择" value=" " v-model="value2">
                  <el-option v-for="(item,index) in switchstatus2"
                             :key="index"
                             :label="item.label"
                             :value="state">

                  </el-option>
                </el-select>-->
                <el-switch
                  v-model="props.row.state"
                  :active-value=1
                  :inactive-value=0
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  active-text="开"
                  inactive-text="关"
                 @change="addSwitchSatus(props.row)">
                </el-switch>
              </template>
          </el-table-column>
        </el-table>
<!--      </el-select>-->
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="modifyStatusDev">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    </el-col>
  </el-row>
</div>
</template>

<script>
    import ElHeader from "element-ui/packages/header/src/main";
    import ElMain from "element-ui/packages/main/src/main";
    import ElCard from "element-ui/packages/card/src/main";
    import  request from '@/utils/request';
    import ElRow from "element-ui/packages/row/src/row";

    export default {
      name: "AddTrigger",
      components: {
        ElRow,
        ElCard,
        ElMain,
        ElHeader},
     data(){
        return{
          allDevList:[],
          sensorList:[],
          relayList:[],
          triggerList:[],
          swtichStatus:[],
          value:"",
          value1:"",
          devtypeid:"",
          loading:false,
          loadSwtich:true,
          dialogVisible1:false,
          dialogVisible2:false,
          num1:"",
          disabled:true,
          switchstatus1:[{
              label:"开启设备",
              value1:"1"
          },
            {  label:"关闭设备",
            value1:"0"
          }],
          switchstatus2:[],
        }
     },
      mounted(){
          this.getDevData()
      },
      methods:{
        getDevData:function () {
          request({
            methods:'post',
            url:'/user/getdevices',
          }).then(data=>{
            // console.log(data.data);
            this.allDevList=data.data;
       /*     console.log(this.allDevList)*/
          })
         /* let param = new URLSearchParams()
          param.append('devEUI',this.value);
       */
        },
        getSensorData:function () {
          this.disabled=false
          /*--------------------------获取传感器列表-----------------------*/
          request.get('/user/devices/getDataSensor',{
            params:{
              devEUI:this.value
            }
          }).then(data=>{
           /*   console.log(this.value)
              console.log(data.data.data)*/
              this.sensorList=data.data.data
              //console.log(this.sensorList)
           })
          /* -------------------------------获取触发器列表---------------------------*/
          request.get('/user/devices/getDataRelay',{
            params:{
              devEUI:this.value
            }
          }).then(data=>{
           // console.log(this.value)
           // console.log(data.data)
            this.triggerList=data.data.data
            //console.log(this.triggerList)
          })
         },
         printmsg1:function (row) {
          console.log(row.name)
           /*------------------------------获取当前更改传感器的id,以便传给后台-------------------------*/
         /* this.devStatus=row.state*/
         this.devtypeid=row.typeid
           /*------------------------------获取当前传感器的状态--------------------------*/
           this.value1=row.state
          this.dialogVisible1 = true
        },
    /*    printmsg2:function (row) {
          console.log(row.name)
          /!*this.devid=row.name*!/
          this.value2=row.state
          this.dialogVisible2 = true
        },*/
        printmsg3:function (row) {
          this.loadSwtich=true
          console.log(row.relayType)
          var typeid=row.relayType
          /*this.devid=row.name*/
          /*------------------------------获取当前触发器状态--------------------------*/
          request.get('/user/devices/getRelaySwitch',{
            params:{
              devEUI:this.value,
              relayType:typeid
            }
          }).then(data=>{
            this.loadSwtich=false
            this.$message({
              type: 'info',
              message: data.data.info
            })
            console.log(this.value)
          /*  var tmp=JSON.stringify(data.data)
            console.log(tmp)*/
            this.swtichStatus=data.data.data
            console.log(this.swtichStatus)
          })
          this.dialogVisible2 = true
        },
         modifyStatusSen:function () {
            let param = new URLSearchParams()
             param.append('state',this.value1);
             param.append('typeid',this.devtypeid)
             param.append('devEUI',this.value)
             request.post('/user/devices/changesensor',param).then( this.loading=true).then(data=>{

                 this.loading=false
               //  console.log(data.data)
             this.$message({
                    type: 'info',
                    message: data.data.info
                  })
               this.getSensorData()
          })
          this.dialogVisible1 = false
           console.log(this.value1)
         },
        addSwitchSatus:function (row) {
          console.log(row.state)
          console.log(row.switchId)
        },
        modifyStatusDev:function () {
          this.loadSwtich = true;
          var paramjson = {}
          for(var i=0;i<this.swtichStatus.length;i++)
          {
            paramjson[this.swtichStatus[i].switchId]=String(this.swtichStatus[i].state)
          }
             let param = new URLSearchParams()
              param.append('devEUI',this.value);
              param.append('jsonstr',JSON.stringify(paramjson))
              request.post('/user/devices/changeRelayMulSwitch',param).then(data=>{
                this.loadSwtich = false
             console.log(data.data)
             this.$message({
                    type: 'info',
                    message: data.data.info
                  })
           })
            console.log(paramjson)
         // this.dialogVisible2 = false

        },
       setRate:function () {
         console.log(this.num1)
         let param = new URLSearchParams()
         param.append('devEUI',this.value);
         param.append('frequency',String(this.num1))
         const loading = this.$loading({
           lock: true,
           text: '正在设置状态，请稍后......',
           spinner: 'el-icon-loading',
           background: 'rgba(0, 0, 0, 0.7)'
         });
         request.post('/user/changeFrequency',param).then(data=>{
           console.log(data)
           loading.close();
         this.$message({
                    type: 'info',
                    message: data.data.info
                  })}).catch((err)=>{
           loading.close();
         })
       }

      }

    }
</script>

<style scoped lang="scss">
  .cardm{
    margin: 20px;
    background-color: rgb(240,242,245);
  }

  .Trigger{
    padding: 68px;
  }
</style>

<style lang="scss">
   .trigger-table {
    .table-cell-class {
      /*    background-color: aqua;*/
      padding-top: 3px;
      padding-bottom: 3px;
      text-align: center;
    }
    .el-table--medium td, .el-table--medium th{
      padding:10px 0;
    }
    .table-header-class{
      background-color: #d3dce6;
    }
    .cell{
      text-align:center;
    }
  }
</style>
