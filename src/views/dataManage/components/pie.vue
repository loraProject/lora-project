<template>
  <div class="pie" >
    <el-card >
  <div id="alldata2" style=" height:150px;"></div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Vue from 'vue';
  Vue.prototype.$echarts=echarts
    export default {
        name: "pie",
      data(){
          return{
            option : {
              title : {
                text: '设备对应的传感器',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: this.dename
              },
              series : [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  data:this.sensor1,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                }
              ]
            },
            dename:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            desensor:[      {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}]
          }
      },
      props:['dev','sensor1'],
      mounted(){
          this.showpie()
      },
      methods:{
          showpie:function () {
            let allchart =this.$echarts.init(document.getElementById('alldata2'))
            allchart.setOption(this.option)
            allchart.setOption({ //加载数据图表
              legend: {
                data:this.dename
              },
              series: {
                data:this.desensor
              }/*{
                // 根据名字对应到相应的系列
                name: ['数量'],
                data: nums
              }*/
            });
          }
      }
    }
</script>

<style scoped>
.pie{
  padding-top: 15px
}
</style>
