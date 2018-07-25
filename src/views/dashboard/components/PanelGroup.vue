<template>
  <el-row class="panel-group" :gutter="40">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class='card-panel' @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="time" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{nowDay}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="nowSencod" :duration="1"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('wind')">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="wind" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{windDirection}}</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data2" :duration="3000"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('temperature')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="temperature" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">温度(°C)</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data3" :duration="3200"></count-to>
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('humidity')">
        <div class="card-panel-icon-wrapper icon-shoppingCard">
          <svg-icon icon-class="humidity" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">湿度(%)</div>
          <count-to class="card-panel-num" :startVal="0" :endVal="data4" :duration="3800"></count-to>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  props:{
      data1:{
        type:Number,
        default(){
          return 1024
        }
      },
      data2:{
        type:Number,
        default(){
          return 1024
        }
      },
      data3:{
        type:Number,
        default(){
          return 1024
        }
      },
      data4:{
        type:Number,
        default(){
          return 1024
        }
      },
    windDirection:{
        type:String,
        default(){
          return "东南风"
        }
      },

  },
  components: {
    CountTo
  },
  data(){
    return{
      nowDay:'2018-1-1',
      nowSencod:0
    }
  },
  created()
  {
    this.getNowDate()
    setInterval(()=>{
      this.getNowDate()
    },1000)
  } ,
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    getNowDate(){
      // 获取的当前时间
      var date = new Date()
      var mon = date.getMonth() + 1;
      var day = date.getDate();
      var hour = date.getHours();
      var min = date.getMinutes();
      if (hour < 10) hour = '0'+hour
      if (min < 10) min = '0'+min
      this.nowDay =  (mon<10?"0"+mon:mon) + "月" +(day<10?"0"+day:day)+'日'+' '+hour+":"+min; // 年月日时分
      this.nowSencod = Number(date.getSeconds()) + 1;
    },
    changeTime(){
      console.log("定时函数，刷新时间wai")
      setTimeout(()=>{
        console.log("定时函数，刷新时间中")
        this.getNowDate()
        console.log(this.nowDay)
        console.log(this.nowSencod)
      },5000)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .card-panel-col{
    margin-bottom: 32px;
  }
  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);
    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }
      .icon-people {
         background: #40c9c6;
      }
      .icon-message {
        background: #36a3f7;
      }
      .icon-money {
        background: #ff3c5c;
      }
      .icon-shoppingCard {
        background: #34bfa3
      }
    }
    .icon-people {
      color: #40c9c6;
    }
    .icon-message {
      color: #36a3f7;
    }
    .icon-money {
      color: #f4516c;
    }
    .icon-shoppingCard {
      color: #34bfa3
    }
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
