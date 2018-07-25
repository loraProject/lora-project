<template>
<div>

 <!-- 导航栏-->
  <el-menu :default-active="activeIndex" class="el-menu-demo"  mode="horizontal" @select="handleSelect">
    <el-menu-item index="4" ><img v-lazy="logoSrc"  style="width: 50px" /></el-menu-item>
    <el-menu-item index="0"  >首页</el-menu-item>
    <el-row type="flex" class="row-bg" justify="end">
    <el-menu-item index="1" ><el-button type="primary" round @click="headClick('login')">登陆</el-button></el-menu-item>
    <el-menu-item index="2" ><el-button type="info"  round  @click="headClick('register')">注册</el-button></el-menu-item>
    </el-row>
  </el-menu>
<!--  图片滑动显示, 响应式显示-->
  <el-carousel :interval="5000" arrow="always" :height="carHeight" ref="carousel" >
    <el-carousel-item v-for="item in caImg" :key="item">
      <img class="carImg" v-lazy= "item"/>
       <h1>快速加入</h1>
    </el-carousel-item>
  </el-carousel>
  <el-container class="pan-container">
    <el-header class="pan-header"><p>我们能为您提供什么</p></el-header>
    <el-main class="pan-main">
      <!--function组件-->
      <function></function>
    </el-main>
  </el-container>
  <el-container class="produce-container">
    <el-header class="pan-header"><p>我们使用到的产品如下</p></el-header>
    <el-main class="pan-main">
      <el-row type="flex" justify="center"  class="hidden-sm-and-down">
      <el-col :xl="16" :lg="18">

      <el-carousel class="producer-el-carousel" :interval="4000" type="card" height="320px" ref="prodCarousel">
        <el-carousel-item v-for="item in sensorImg" :key="item">
          <img class="carImg" v-lazy= "item"/>
        </el-carousel-item>
      </el-carousel>
      </el-col>
      </el-row>
   <!--   用于小屏幕显示-->
      <el-row type="flex" justify="center"  class="hidden-md-and-up">
        <el-col :xl="16" :lg="18">
          <el-carousel :interval="4000"  class="producer-el-carousel" arrow="always" height="180px"  >
            <el-carousel-item v-for="item in sensorImg" :key="item">
              <img class="carImg" v-lazy= "item"/>
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
 <!-- 为了避免图片响应式出现的问题,在小界面默认隐藏-->
  <el-container  class="container-flows hidden-sm-and-down" >
    <el-header class="pan-header"><p>我们的产品应用开发流程</p></el-header>
    <el-main class="pan-main"><img v-lazy="developChart"/></el-main>
  </el-container>
  <el-container class="container-coop" >
    <el-header class="pan-header"><p>合作伙伴</p></el-header>
    <el-main class="pan-main">
      <el-row :gutter="40" >
        <!--左右多出来用来占位子，当不需要占位子的时候就将之隐藏-->
        <el-col :lg="2" :xl="4" class="hidden-md-and-down" >
          <div style="background-color: transparent" class="grid-content bg-purple"></div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple"><img v-lazy="sportLogo[0]"/></div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple"><img v-lazy="sportLogo[1]"/></div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple"><img v-lazy="sportLogo[2]"/></div>
        </el-col>
        <el-col :xs="12" :sm="12" :md="6" :lg="5" :xl="4">
          <div class="grid-content bg-purple"><img v-lazy="sportLogo[3]"/></div>
        </el-col>
        <el-col  :lg="2" :xl="4"  class="hidden-md-and-down">
          <div class="grid-content bg-purple" style="background-color: transparent"></div>
        </el-col>
        <!--        <el-col :xs="0"  :sm="0"   :md="2" :lg="4" :xl="6"><div class="grid-content bg-purple"></div></el-col>-->
      </el-row>
    </el-main>
  </el-container>

  <div class="footer">
    <el-row :gutter="40" >
      <!--左右多出来用来占位子，当不需要占位子的时候就将之隐藏-->
      <el-col :lg="2" :xl="4" class="hidden-md-and-down" >
        <div style="background-color: transparent" class="grid-content bg-purple"></div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="18">
        <div class="coop-card" align="center">
          <div class="item-content">
            <p class="coop-title">{{coopTitle}}</p>
            <p class="coop-content">{{coopContent}}</p>
          </div>
        </div>
      </el-col>
    <!--  <el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="8">
        <div class="coop-card" align="center">
         &lt;!&ndash; <div class="item-content">
            <p class="coop-title">{{coopScan}}</p>
            <p class="coop-content"><img v-lazy="appCode"/></p>
          </div>&ndash;&gt;
        </div>
      </el-col>-->
      <el-col  :lg="2" :xl="4"  class="hidden-md-and-down">
        <div class="grid-content bg-purple" style="background-color: transparent"></div>
      </el-col>
      <!--        <el-col :xs="0"  :sm="0"   :md="2" :lg="4" :xl="6"><div class="grid-content bg-purple"></div></el-col>-->
    </el-row>
  </div>
</div>
</template>

<script>

   import 'element-ui/lib/theme-chalk/display.css';
   import Function from './Function.vue';
   import HelloWorld from "../../components/HelloWorld";

    export default {
      components:{HelloWorld, Function},
        name: "Index",
        data(){
          return {
            activeIndex: '1',
            item :"item",
            carHeight:'400px',
            developChart: require("../../assets/index_image/develep-flow.png"),
            logoSrc:require("../../assets/jit.png"),
            sportLogo :[require("../../assets/index_image/zhuoyun.png"),
              require("../../assets/index_image/mybatis.png"),
              require("../../assets/index_image/spring.png"),
              require("../../assets/index_image/vue.png")],
            caImg :[require("../../assets/index_image/ca_1.jpg"),
              require("../../assets/index_image/ca_5_2.png"),
              require("../../assets/index_image/ca_3.jpg"),
              require("../../assets/index_image/ca_4.jpg"),
            ],
            sensorImg:[
              require("../../assets/index_image/dev1.jpg"),
              require("../../assets/index_image/dev2.jpg"),
              require("../../assets/index_image/dev3.jpg"),
              require("../../assets/index_image/gas.jpg"),
            ],
            coopTitle:"联系我们",
            coopContent:"    公司地址：江苏省南京市江宁区弘景大道格致路100号金陵科技学院\r\n" +
            "    工作时间: 工作日上午9:00-12:00，下午13:00-18:00\r\n" +
            "    业务合作: https://github.com/\r\n" +
            "    电话:8625-86188966 传真:8625-86188987 邮编:211169",
           // coopScan:"扫描二维码下载APP",
           // appCode: require("../../assets/index_image/appCode.png")

          }
        },
      computed(){
          // 响应式调整宽度
        var result = window.matchMedia('(max-width: 700px)');
        if (result.matches){
       /*   this.$refs.carousel.height ="180px";
          this.$refs.prodCarousel.type = "";*/
           this.carHeight  = "180px"

          console.log("< 700")
        }else{
          this.carHeight  = "480px"
          console.log("> 700")
        }
      },
       methods:{
         handleSelect(key, keyPath) {
           console.log(key, keyPath);
         },
         headClick(url){
           if (url == 'login') {
             this.$router.push({path: '/login'})
             console.log("in login");
           }else {
             this.$router.push({path: '/register'})
             console.log("in register");
           }
         }
       }
    }

</script>

<style scoped lang="scss">

  @import '../../styles/base.scss';
  .carImg {
    height: 100%;
    width: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: rgba(71,67,162,0.5);
      background-size: cover;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: rgba(159,205,225,0.5);
  }
  .el-container {
    padding-top: 65px;
    /*调整手机端样式*/
    @media screen and (max-width: $smallSize) {
      padding-top: 25px;
    }
  }
  .el-menu .el-row {
    background-color: #ffffff;
  }
  .el-header {
    padding-top: 0px;
    padding-bottom: 0px;
 /*   background-color: #4AB7BD;*/

  }
  .el-main {
    background-color: transparent;
    text-align: center;
    overflow: hidden;
    margin-left: 0px;
    margin-right: 0px;
    padding-left: 0px;
    padding-right: 0px;
  }

  .pan-header{
    text-align: center;
    color: #333;
    font-size: 34px;
    /*调整手机端样式*/
    @media screen and (max-width: $smallSize) {
      font-size: 20px;
    }
    -webkit-text-size-adjust: auto;
    font-family: Avenir,Helvetica,Arial,sans-serif;

  }
  p{
    margin: 0px;
  }
  .container-coop {
    background-color: #ffffff;
    .el-main{
      background-color: #ffffff;;
    }


  }
  .footer{
    background-color: #213340;
    text-align: center;
    width: 100%;
    padding: 10px;
  }

  /*test*/
  .bg-purple {
    background: #edf4ff;
  }
  .grid-content {
    border-radius: 1px;
    min-height: 36px;
    margin-top: 10px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f7f7f7;
  }
  .el-carousel__indicators {
    display: none;
  }

  .produce-container {
    .el-main {
      height: inherit;
      background-color: #eef1f6;
    }
  }

  .container-flows{
    img{
      width: 100%;
    }
  }
  .container-coop {
    img {
      border-radius: 10px;
      width: 100%;
      height: 80px;
    }
    .bg-purple {
      background: transparent;
      padding: 10px;
    }
  }

  .coop-card {
    margin-top: 20px;
    p {
      line-height: 26px;
    }
    img {
      width: 120px;
      margin-top: 10px;
    }
    .coop-icon {
      width: 100px;
      height: 100px;
      padding: 25px;
      background-color: #edf7ff;
      border-radius: 50%;

    }

    .coop-title {
      line-height: 36px;
      height: 36px;
      font-size: 18px;
      color: #c8d1d9;
      font-weight: 700;
      text-align: center
    }
    .coop-content {
      color: #7e8890;
    }
  }
</style>
