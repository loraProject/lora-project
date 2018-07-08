<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span>控制中心</span>
    </div>
    <el-form :model="controlForm" label-width="100px">
      <el-form-item label="选择设备" >
        <el-select v-model="controlForm.region" placeholder="请选择活动区域" value="请选择活动区域" @change="getDevice">
          <el-option v-for="item in selectItem" :label="item.label" :value="item.value" :key="item.value"></el-option>
         <!-- <el-option label="设备2" value="beijing"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="时间段选择">
        <el-row type="flex" justify="start" :gutter="16">
          <el-col>
          <el-date-picker
            v-model="controlForm.data"
            type="datetimerange"
            :picker-options="pickerOptions2"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeDateFunction"
            align="right">
          </el-date-picker>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>

      </el-form-item>
      <el-form-item label="导出表格">
        <el-row :gutter="16" type="flex" justify="center">
          <el-col :sm="24" :md="16">
            <el-input v-model="worksheetName" clearable></el-input>
          </el-col>
          <el-col :sm="24" :md="8">
            <el-button type="success" @click="exportSheet(worksheetName)">导出表格</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

  </el-card>
</template>

<script>

  export default {
    name: "ControlPanel",
    props:{
      changeDateFunction:{
        type:Function,
        default(){
          return null;
        }
      },
      exportSheet:{
        type:Function,
        default(){
          return console.log("click export");
        }
      },
      getDevice:{
        type:Function,
        default(){
          return null;
        }
      },
      selectItem:{
        type:Array,
        default(){
          return this.demoSelectItem;
        }
      }
    },
    data() {
      return {
        controlForm: {
          regions: "",
          data: "",
        },
        worksheetName: "data",
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        demoSelectItem:[{label:"item1",value:"value1"},{label:"item2",value:"value2"},{label:"item3",value:"value3"}]

      }
    },
    methods:{


    }
  }
</script>

<style scoped lang="scss">
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both;

  }
</style>
