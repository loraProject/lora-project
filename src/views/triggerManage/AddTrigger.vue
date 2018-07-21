<template>
<div class="Trigger">
  <el-header>
    <el-card class="cardm">
      <el-select  placeholder="请选择设备" v-model="value" value="" @change="getSensorData">
     <!--   <el-option
          v-for="item in allDevList"
          :key="item.devEUI"
          :label="item.devname"
          :value="item.devEUI">-->
        <el-option
          v-for="item in allDevList"
          :key="item.devEUI"
          :label="item.devname"
          :value="item.devEUI">
        </el-option>
      </el-select>
    </el-card>
  </el-header>
  <el-main >
    <el-card class="cardm" v-loading="loading"
             element-loading-text="拼命加载中"
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(100, 100, 100, 0.3)">
      <el-row type="flex" justify="center" :gutter="40">
        <el-col :xs="20" :sm="16" :md="14" :lg="12" :xl="10">
          <el-table
            :data="sensorList"
            stripe
            height="400">
            <el-table-column
            prop="typename"
            label="传感器名称">
          </el-table-column>
            <el-table-column
              prop="name"
              label="类型">
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
        <el-col :xs="20" :sm="16" :md="14" :lg="12" :xl="10">
          <el-table
            :data="sensorList"
            stripe
            height="400">
            <el-table-column
              prop="name"
              label="类型">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <!--@click="handleClick(scope.row)"-->
                <el-button  type="text" size="small" @click=printmsg2(scope.row)>修改状态</el-button>
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
        更改状态为：  <el-select placeholder="请选择" value="" v-model="value2">
        <el-option v-for="(item,index) in switchstatus2"
                   :key="index"
                   :label="item.label"
                   :value="item.value2">

        </el-option>
      </el-select>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="modifyStatusDev">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </el-main>
</div>
</template>

<script>
    import ElHeader from "element-ui/packages/header/src/main";
    import ElMain from "element-ui/packages/main/src/main";
    import ElCard from "element-ui/packages/card/src/main";
    import  request from '@/utils/request';

    export default {
      name: "AddTrigger",
      components: {
        ElCard,
        ElMain,
        ElHeader},
     data(){
        return{
          allDevList:[],
          sensorList:[],
          relayList:[],
          value:"",
          value1:"",
          value2:"",
          devtypeid:"",
          loading:false,
          dialogVisible1:false,
          dialogVisible2:false,
          switchstatus1:[{
              label:"开启设备",
              value1:"1"
          },
            {  label:"关闭设备",
            value1:"0"
          }],
          switchstatus2:[{
            label:"开启设备",
            value2:"1"
          },
            {  label:"关闭设备",
              value2:"0"
            }]
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
            console.log(this.allDevList)
          })
         /* let param = new URLSearchParams()
          param.append('devEUI',this.value);
       */
        },
        getSensorData:function () {
          request.get('/user/devices/getDataSensor',{
            params:{
              devEUI:this.value
            }
          }).then(data=>{
              console.log(this.value)
              console.log(data.data.data)
              this.sensorList=data.data.data
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
        printmsg2:function (row) {
          console.log(row.name)
          /*this.devid=row.name*/
          /*------------------------------获取当前传感器的状态--------------------------*/
          this.value2=row.state
          this.dialogVisible2 = true
        },
         modifyStatusSen:function () {
            let param = new URLSearchParams()
             param.append('state',this.value1);
             param.append('typeid',this.devtypeid)
             param.append('devEUI',this.value)
             request.post('/user/devices/changesensor',param).then( this.loading=true).then(data=>{

                 this.loading=false
                 console.log(data.data)
             this.$message({
                    type: 'info',
                    message: data.data.info
                  })
          })
          this.dialogVisible1 = false
           console.log(this.value1)
         },
        modifyStatusDev:function () {
          /*    let param = new URLSearchParams()
              param.append('status',this.value1);
              param.append('id',)
              request.post('/',param).then(data=>{
             console.log(data.data)
             this.$message({
                    type: 'info',
                    message: data.data.info
                  })
           })*/
          this.dialogVisible2 = false
          console.log(this.value2)
        }

      }

    }
</script>

<style scoped>
  .cardm{
    margin: 20px;
    background-color: rgb(240,242,245);
  }
</style>
