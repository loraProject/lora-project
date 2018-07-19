<template>
  <div class="pie" >
    <el-card >
  <div id="alldata1" style=" height:250px;"></div>
    </el-card>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import Vue from 'vue';
  import  request from '@/utils/request'

  Vue.prototype.$echarts=echarts
    export default {
        name: "pie",
      data(){
          return{
            option : {
              title : {
                text: '传感器分布',
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
                  name: '传感器数量',
                  type: 'pie',
                  radius : '66%',
                  center: ['50%', '60%'],
                  data:"12313",
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  },
                },

              ]
            },
            dename:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
            desensor:[
              {value:100, name:'直接访问'},
              {value:100, name:'邮件营销'},
              {value:100, name:'联盟广告'},
              {value:100, name:'视频广告'},
              {value:100, name:'搜索引擎'}]
          }
      },
      props:['dev','sensor1'],
      mounted(){
        request.get('/user/getDSList').then((response)=>{
          const res = response.data;
          const data = res.data;
          const This = this;
          if (res.code == 1){ // 获得数据成功
            console.log(data.desensor)
            This.dename = data.dename;
            This.desensor = data.desensor;
            this.showpie()// 请求到数据之后再将数据放入数组中
          }else {
            This.$message(res.info);//数据
          }

        }).catch((err)=>{
          console.log("in pie err", err);
        })

      },
      created(){

      },

      methods:{
          showpie:function () {
            let allchart =this.$echarts.init(document.getElementById('alldata1'));

            allchart.setOption(this.option)
            allchart.setOption({ //加载数据图表
              legend: {
                data:this.dename
              },
              series: {
                data:this.desensor
              }
            });
          },
          getDename(){  // 获得用户的设备列表

          },
          getDesensor(){  //获得用户不同设备下的数量

          }
      }
    }
</script>

<style scoped>
.pie{
  padding-top: 15px
}
</style>
