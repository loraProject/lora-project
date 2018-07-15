<template>
  <div class="UserCenter">
  <!--  <h1>用户中心，展示用户信息</h1>-->
    <el-row>
      <el-col :span="8">

          <canvas id="canvas" width="400" height="400" >cccc</canvas>
          <h1 style="margin-left:80px ">
            {{this.userRole}}
          </h1>
          <h3 style="margin-left:80px ">
           用户名称： {{this.name}}
          </h3>
      </el-col>
      <el-col :span="16"style="height: 600px">
        <div >
          <img class="emptyGif" :src="emptyGif">
        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>
    import ElCard from "element-ui/packages/card/src/main";
    import ElRow from "element-ui/packages/row/src/row";
    import { mapGetters } from 'vuex'
    export default {
      computed:{
        ...mapGetters([
          'name',
          'roles'
        ])
      },
      components: {
        ElRow,
        ElCard},
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
          emptyGif:'../../../static/img/dog.gif',
          userRole:'没有初始化'

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
          }
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
</style>
