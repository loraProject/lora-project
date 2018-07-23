<template>
 <div>
   <el-row type="flex" justify="center">
     <el-form>
       <el-form-item label="设备EUI">
         <el-tag><a>  {{devEui}}</a></el-tag>
       </el-form-item>
       <el-form-item label="设备名称">
         <el-tag>  <a> {{devName}}</a></el-tag>
       </el-form-item>
       <el-form-item label="继电器类型">
         <el-select v-model="value" placeholder="请选择" value="value">
           <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </el-form-item>
       <el-form-item label="继电器名称">
            <el-input v-model="delayName"></el-input>
       </el-form-item>
       <el-row  type="flex" justify="center">
       <el-button type="primary" @click="submitTrigger">确认添加</el-button>
     </el-row>

     </el-form>
   </el-row>
 </div>

</template>

<script>

    import request from '@/utils/request'
    export default {
        name: "AddTrigger",
      props:{
        devName:{
          type:String,
          default() {return "设备名称"}
        },
        devEui:{
          type:String,
          default(){ return "设备devEui"}
        }
      },
      mounted(){
          const This = this;
          request.get('/relaytype/getall').then((request)=>{
            const data = request.data;//
            data.forEach((option)=>{

              var Obj = new Object();
              Obj.value = option.relayType;
              Obj.label = option.relayName;
              This.options.push(Obj);
            })
          }
          ).catch((err)=>{
            console.log(err);
          })
      },
      data() {
        return {
          options: [],
          value: '',
          delayName:'',
          tableData:[],
        }
      },
      methods:{
        submitTrigger(){
          // 添加触发器
          var params = new  URLSearchParams();
          const This = this;
          params.append('devEUI',this.devEui);
          params.append('relayType', this.value);
          request.post('/user/devices/addRelay',params).then((request)=>{
            const res = request.data;
            if (res.result == true){
              this.$message.success("添加成功");
              This.$emit('flushDeviceList')
              console.log("flush设备列表")
              //添加触发器
            }else {
              this.$message.error(res.info);
            }
          }
          ).catch((err)=>{
            this.$message.error(err);
          })
        }
      }
    }
</script>

<style scoped lang="scss">
  .el-input{
    margin: 5px;
  }
</style>
