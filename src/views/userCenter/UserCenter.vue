<template>
  <div class="UserCenter">
  <!--  <h1>用户中心，展示用户信息</h1>-->
       <el-row type="flex" justify="left">
         <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
          <canvas id="canvas" width="400" height="300" >cccc</canvas>
         </el-col>
         <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
          <h1 style="margin-top:40px">
            用户角色：{{this.userRole}}
          </h1>
          <h3 style="margin-top:40px ">
           用户名称： {{this.name}}
          </h3>
          <h3 style="margin-top:40px "> 城市：
           <el-cascader
             :options="options"
             :show-all-levels="false"
             value=""
             v-model="value"
           > </el-cascader>
          </h3>
        </el-col>
         <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
         <img class="emptyGif" :src="emptyGif">
       </el-col>
    </el-row>

      <el-row>
        <el-col style="height: 600px">
          <div >
            <!-- <img class="emptyGif" :src="emptyGif">-->
            <tempreature v-bind:message="value[1]"> </tempreature>
          </div>
        </el-col>
      </el-row>

  </div>
</template>

<script>
    import ElCard from "element-ui/packages/card/src/main";
    import ElRow from "element-ui/packages/row/src/row";
    import request from '@/utils/request'
    import tempreature from './temp/temperatureDa'
    import { mapGetters } from 'vuex'
    import ElHeader from "element-ui/packages/header/src/main";
    import ElMain from "element-ui/packages/main/src/main";
    export default {
      computed:{
        ...mapGetters([
          'name',
          'roles'
        ])
      },
      components: {
        ElMain,
        ElHeader,
        ElRow,
        ElCard,
      tempreature},
      name: "UserCenter",
        mounted(){
/*        console.log(this.roles)
          if (this.roles.indexOf("admin") > 0){
            this.userRole = "管理员"
          }else{
            this.userRole = "普通用户"
          }*/
         const isAdmin =  this.roles.filter((role)=>role == "admin")
          if (isAdmin != null && isAdmin.length > 0) {
            this.userRole = "管理员"
          }else{
            this.userRole = "普通用户"
          }
          this.renderTime()
        },
      data() {
        return {
          /* emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3'*/
          emptyGif: '../../../static/img/dog.gif',
          userRole: '没有初始化',
          value:["jiangsu","南京"],
          options: [{
            value: 'jiangsu',
            label: '江苏',
            children: [{
              value: '南京',
              label: '南京',
            }, {
              value: '苏州',
              label: '苏州',
            }]
          }, {
            value: 'zhejiang',
            label: '浙江',
            children: [{
              value: '杭州',
              label: '杭州',

            }, {
              value: '湖州',
              label: '湖州',
            }]
          },
            {
              value: 'beijing',
              label: '北京',
              children: [{
                value: '北京',
                label: '北京',

              }, ]
            },
            {
              value: 'tianjin',
              label: '天津',
              children: [{
                value: '天津',
                label: '天津',

              },]
            },{
              value: 'shanghai',
              label: '上海',
              children: [{
                value: '上海',
                label: '上海',

              }]
            },
            {
              value: 'chongqing',
              label: '重庆',
              children: [{
                value: '重庆',
                label: '重庆',

              }]
            },
            {
              value: 'sichuan',
              label: '四川',
              children: [{
                value: '成都',
                label: '成都',

              }, {
                value: '达州',
                label: '达州',
              },
                {
                  value: '自贡',
                  label: '自贡',
                },
                {
                  value: '攀枝花',
                  label: '攀枝花',
                },
                {
                  value: '泸州',
                  label: '泸州',
                },
                {
                  value: '德阳',
                  label: '德阳',
                },
                {
                  value: '绵阳',
                  label: '绵阳',
                },
                {
                  value: '广元',
                  label: '广元',
                },
                {
                  value: '遂宁',
                  label: '遂宁',
                },
                {
                  value: '内江',
                  label: '内江',
                },
                {
                  value: '乐山',
                  label: '乐山',
                },
                {
                  value: '南充',
                  label: '眉山',
                },
                {
                  value: '广安',
                  label: '广安',
                },
                {
                  value: '雅安',
                  label: '雅安',
                }]
            }
          ],
        }
      },
        methods:{
          degToRad:function (degree) {
            var factor = Math.PI/180;
            return degree*factor;
          },
          renderTime:function(){
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            ctx.strokeStyle = '#42BA83';
            ctx.lineWidth = 13;
            ctx.shadowBlur= 15;
           // ctx.shadowColor = '#ADDF80'
            setInterval(()=>{
              var now = new Date();
              var today = now.toDateString();
              var time = now.toLocaleTimeString();
              var hrs = now.getHours();
              var min = now.getMinutes();
              var sec = now.getSeconds();
              var mil = now.getMilliseconds();
              var smoothsec = sec+(mil/1000);
              var smoothmin = min+(smoothsec/60);

              //Background
             var gradient = ctx.createRadialGradient(250, 250, 5, 250, 250, 250);
              gradient.addColorStop(0, "#ffffff");
              gradient.addColorStop(1, "#ffffff");
              ctx.fillStyle = gradient;
              //ctx.fillStyle = 'rgba(00 ,00 , 00, 1)';
              ctx.fillRect(0, 0, 300, 300);
              //Hours
              ctx.beginPath();
              ctx.arc(150,150,120, this.degToRad(270), this.degToRad((hrs*30)-90));
              ctx.stroke();
              //Minutes
              ctx.beginPath();
              ctx.arc(150,150,102, this.degToRad(270), this.degToRad((smoothmin*6)-90));
              ctx.stroke();
              //Seconds
              ctx.beginPath();
              ctx.arc(150,150,84, this.degToRad(270), this.degToRad((smoothsec*6)-90));
              ctx.stroke();
              //Date
              ctx.font = "15px Helvetica";
              ctx.fillStyle = 'rgba(66, 186, 131, 1)'
              ctx.fillText(today, 105, 150);
              //Time
              ctx.font = "15px Helvetica Bold";
              ctx.fillStyle = 'rgba(66, 186, 131, 1)';
              ctx.fillText(time+":"+mil, 105, 168);
            },40)
          },

        }
    }

</script>

<style scoped>
.UserCenter{
  background-color:  #ffffff;
  height: 700px
}
  .lefttime{
    width: 500px;
    background-color: #ffffff;
  }
.emptyGif {
  display: block;
  width: 80%;
  margin: 0 auto;
}
  .header{
    height: 450px;
  }
</style>
