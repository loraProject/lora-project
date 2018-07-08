<template>
  <div>
 <el-row>
    <el-table class="history-table"
              align="center" stripe border max-height="70vh"
      :data="tableData.slice((currentPage-1)*pageSize, pageSize*currentPage)"
      header-row-class-name="table-header-class"
      cell-class-name="table-cell-class"
      style="width: 100%; overflow:auto">
      <el-table-column
      label="日期"
      prop="date"
      sortable
      >
      </el-table-column>
      <el-table-column
      label="设备"
      prop="devName">
      </el-table-column>
      <el-table-column
      label="数值"
      sortable
      prop="value">

      </el-table-column>
    </el-table>
 </el-row>
    <el-row  type="flex" justify="center" style="margin-top: 20px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size=pageSize
        layout="total, sizes, prev, pager, next, jumper"
        :total=tableData.length>
      </el-pagination>
    </el-row>
  </div>

</template>

<script>
    export default {
        name: "dataTable",
        props:{
          tableData:{
            type:Array,
            default(){
              return [{date:"2017-01-01",devName:"devName",value:"18"},
                      {date:"2017-01-01",devName:"devName",value:"18"},
                      {date:"2017-01-01",devName:"devName",value:"18"},
                      {date:"2017-01-01",devName:"devName",value:"18"}]
            }
          }
        },
        data(){
          return{
            currentPage:1,
            pageSize:10,
            totalEntry:10
          }
        },
        methods:{
          handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val;
          },
        }
    }
</script>

<style scoped >

</style>

<style lang="scss">
  .history-table {
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
