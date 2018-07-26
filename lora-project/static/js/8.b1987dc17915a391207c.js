webpackJsonp([8],{"1gNY":function(e,t){},"8IVN":function(e,t){},"9Hir":function(e,t,l){"use strict";var a={render:function(){var e=this.$createElement;return(this._self._c||e)("main",{staticClass:"el-main"},[this._t("default")],2)},staticRenderFns:[]},s=l("VU/8")({name:"ElMain",componentName:"ElMain"},a,!1,null,null,null);t.a=s.exports},fEQB:function(e,t,l){"use strict";var a={name:"ElHeader",componentName:"ElHeader",props:{height:{type:String,default:"60px"}}},s={render:function(){var e=this.$createElement;return(this._self._c||e)("header",{staticClass:"el-header",style:{height:this.height}},[this._t("default")],2)},staticRenderFns:[]},r=l("VU/8")(a,s,!1,null,null,null);t.a=r.exports},hNU9:function(e,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=l("Dd8w"),s=l.n(a),r=l("6wmS"),n=l("DoGJ"),i=(l("vLgD"),l("XLwt")),o=l.n(i),c=l("7+uW");l("tcAE"),c.default.prototype.$echarts=o.a;var u={components:{ElRow:n.a,ElCard:r.a},name:"temperature-da",props:["message"],data:function(){return{weekfuture:[],weektemperature:[],weektemperature1:[],weekWeather:[],weekWind:[],weekWeek:[],weatherLower:[],weatherHigh:[],todayDescription:[],skDescription:[],optionWeather:{title:{text:"未来一周的温度"},tooltip:{trigger:"axis",axisPointer:{type:"cross"}},grid:{right:"20%"},toolbox:{feature:{dataView:{show:!0,readOnly:!1},magicType:{type:["line","bar"]},restore:{show:!0},saveAsImage:{show:!0}}},legend:{data:["最高温度","最低温度"]},xAxis:[{type:"category",axisTick:{alignWithLabel:!0}}],yAxis:[{type:"value",name:"温度 ℃",position:"left",axisLine:{lineStyle:{color:"#5793f3"}}}],series:[{name:"最低温度",type:"line",smooth:!0},{name:"最高温度",type:"line",smooth:!0}]},sunshine:"../../../../static/img/sunshine.png",temperatureimg:"../../../../static/img/temperature.png",humidity:"../../../../static/img/humidity.png",weatherimg:"../../../../static/img/weather.png"}},mounted:function(){this.getweather()},methods:{getweather:function(){var e=this;e.weatherHigh=[],e.weatherLower=[],e.weekWeather=[],e.weekWind=[],e.weekWeek=[],e.weektemperature1=[],$.ajax("http://v.juhe.cn/weather/index",{data:{cityname:this.message,key:"2a6e48d6eac576afa444d9d66bb8e671"},dataType:"jsonp",crossDomain:!0,success:function(t){if(t&&"200"===t.resultcode)for(var l in console.log(t),e.weekfuture=t.result.future,e.todayDescription=t.result.today,e.skDescription=t.result.sk,e.weekfuture){e.weektemperature.push(e.weekfuture[l].temperature.split("~"));var a=e.weekfuture[l].temperature.split("~");e.weatherLower.push(a[0].toString().replace(/[^0-9]/gi,"")),e.weatherHigh.push(a[1].toString().replace(/[^0-9]/gi,"")),e.weekWeather.push(e.weekfuture[l].weather),e.weekWind.push(e.weekfuture[l].wind),e.weekWeek.push(e.weekfuture[l].week),e.weektemperature1.push(e.weekfuture[l].temperature)}}})}},watch:{message:function(e,t){console.log(this.message),this.getweather()}}},v={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"temperatureDa"},[l("el-row",{attrs:{type:"flex",justify:"center"}},[l("el-col",{attrs:{xs:24,sm:20,md:20,lg:12,xl:12}},[l("el-card",{staticClass:"cardm"},[l("el-card",{staticClass:"mbg1"},[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              天气:"),l("img",{staticClass:"imgstyle",attrs:{src:e.weatherimg}})]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.todayDescription.weather)+"\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              当前温度:"),l("img",{staticClass:"imgstyle",attrs:{src:e.temperatureimg}})]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.skDescription.temp)+"℃\n            ")])],1)],1),e._v(" "),l("el-card",{staticClass:"mbg2"},[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              风速:\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.skDescription.wind_strength)+"\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              风向:\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.skDescription.wind_direction)+"\n            ")])],1)],1),e._v(" "),l("el-card",{staticClass:"mbg1"},[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              湿度:    "),l("img",{staticClass:"imgstyle",attrs:{src:e.humidity}})]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.skDescription.humidity)+"\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              紫外线指标:\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.todayDescription.uv_index)+"\n            ")])],1)],1),e._v(" "),l("el-card",{staticClass:"mbg2"},[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              洗涤指标:\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.todayDescription.wash_index)+"\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              旅行指标:\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.todayDescription.travel_index)+"\n            ")])],1)],1),e._v(" "),l("el-card",{staticClass:"mbg1"},[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              着装指标:\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.todayDescription.dressing_index)+"\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              着装建议:\n            ")]),e._v(" "),l("el-col",{attrs:{xs:12,sm:10,md:8,lg:6,xl:4}},[e._v("\n              "+e._s(e.todayDescription.dressing_advice)+"\n            ")])],1)],1)],1)],1),e._v(" "),l("el-col",{attrs:{xs:24,sm:20,md:20,lg:12,xl:12}},[l("el-card",{staticClass:"cardm"},[l("el-card",{staticStyle:{"background-color":"#F0F2F5"}},[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",[e._v("\n          "+e._s(e.weekWeek[0])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeek[1])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeek[2])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeek[3])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeek[4])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeek[5])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeek[6])+"\n        ")])],1)],1),e._v(" "),l("el-card",[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",[e._v("\n          "+e._s(e.weekWeather[0])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeather[1])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeather[2])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeather[3])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeather[4])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeather[5])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWeather[6])+"\n        ")])],1)],1),e._v(" "),l("el-card",[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",[e._v("\n          "+e._s(e.weektemperature1[0])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weektemperature1[1])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weektemperature1[2])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weektemperature1[3])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weektemperature1[4])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weektemperature1[5])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weektemperature1[6])+"\n        ")])],1)],1),e._v(" "),l("el-card",[l("el-row",{attrs:{type:"flex",justify:"right"}},[l("el-col",[e._v("\n          "+e._s(e.weekWind[0])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWind[1])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWind[2])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWind[3])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWind[4])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWind[5])+"\n        ")]),e._v(" "),l("el-col",[e._v("\n          "+e._s(e.weekWind[6])+"\n        ")])],1)],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=l("VU/8")(u,v,!1,function(e){l("8IVN")},"data-v-4a4fe5f4",null).exports,_=l("NYxO"),m=l("fEQB"),g=l("9Hir"),h={computed:s()({},Object(_.b)(["name","roles"])),components:{ElMain:g.a,ElHeader:m.a,ElRow:n.a,ElCard:r.a,tempreature:d},name:"UserCenter",mounted:function(){var e=this.roles.filter(function(e){return"admin"==e});null!=e&&e.length>0?this.userRole="管理员":this.userRole="普通用户",this.renderTime()},data:function(){return{emptyGif:"../../../static/img/dog.gif",userRole:"没有初始化",value:["jiangsu","南京"],options:[{value:"jiangsu",label:"江苏",children:[{value:"南京",label:"南京"},{value:"苏州",label:"苏州"}]},{value:"zhejiang",label:"浙江",children:[{value:"杭州",label:"杭州"},{value:"湖州",label:"湖州"}]},{value:"beijing",label:"北京",children:[{value:"北京",label:"北京"}]},{value:"tianjin",label:"天津",children:[{value:"天津",label:"天津"}]},{value:"shanghai",label:"上海",children:[{value:"上海",label:"上海"}]},{value:"chongqing",label:"重庆",children:[{value:"重庆",label:"重庆"}]},{value:"sichuan",label:"四川",children:[{value:"成都",label:"成都"},{value:"达州",label:"达州"},{value:"自贡",label:"自贡"},{value:"攀枝花",label:"攀枝花"},{value:"泸州",label:"泸州"},{value:"德阳",label:"德阳"},{value:"绵阳",label:"绵阳"},{value:"广元",label:"广元"},{value:"遂宁",label:"遂宁"},{value:"内江",label:"内江"},{value:"乐山",label:"乐山"},{value:"南充",label:"眉山"},{value:"广安",label:"广安"},{value:"雅安",label:"雅安"}]}]}},methods:{degToRad:function(e){return e*(Math.PI/180)},renderTime:function(){var e=this,t=document.getElementById("canvas").getContext("2d");t.strokeStyle="#42BA83",t.lineWidth=13,t.shadowBlur=15,setInterval(function(){var l=new Date,a=l.toDateString(),s=l.toLocaleTimeString(),r=l.getHours(),n=l.getMinutes(),i=l.getSeconds(),o=l.getMilliseconds(),c=i+o/1e3,u=n+c/60,v=t.createRadialGradient(250,250,5,250,250,250);v.addColorStop(0,"#ffffff"),v.addColorStop(1,"#ffffff"),t.fillStyle=v,t.fillRect(0,0,300,300),t.beginPath(),t.arc(150,150,120,e.degToRad(270),e.degToRad(30*r-90)),t.stroke(),t.beginPath(),t.arc(150,150,102,e.degToRad(270),e.degToRad(6*u-90)),t.stroke(),t.beginPath(),t.arc(150,150,84,e.degToRad(270),e.degToRad(6*c-90)),t.stroke(),t.font="15px Helvetica",t.fillStyle="rgba(66, 186, 131, 1)",t.fillText(a,105,150),t.font="15px Helvetica Bold",t.fillStyle="rgba(66, 186, 131, 1)",t.fillText(s+":"+o,105,168)},40)}}},p={render:function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"UserCenter"},[l("el-row",{attrs:{type:"flex",justify:"left"}},[l("el-col",{attrs:{xs:14,sm:12,md:10,lg:8,xl:6}},[l("canvas",{attrs:{id:"canvas",width:"400",height:"300"}},[e._v("cccc")])]),e._v(" "),l("el-col",{attrs:{xs:14,sm:12,md:10,lg:8,xl:6}},[l("h1",{staticStyle:{"margin-top":"40px"}},[e._v("\n          用户角色："+e._s(this.userRole)+"\n        ")]),e._v(" "),l("h3",{staticStyle:{"margin-top":"40px"}},[e._v("\n         用户名称： "+e._s(this.name)+"\n        ")]),e._v(" "),l("h3",{staticStyle:{"margin-top":"40px"}},[e._v(" 城市：\n         "),l("el-cascader",{attrs:{options:e.options,"show-all-levels":!1,value:""},model:{value:e.value,callback:function(t){e.value=t},expression:"value"}})],1)]),e._v(" "),l("el-col",{attrs:{xs:14,sm:12,md:10,lg:8,xl:6}},[l("img",{staticClass:"emptyGif",attrs:{src:e.emptyGif}})])],1),e._v(" "),l("el-row",[l("el-col",{staticStyle:{height:"600px"}},[l("div",[l("tempreature",{attrs:{message:e.value[1]}})],1)])],1)],1)},staticRenderFns:[]};var f=l("VU/8")(h,p,!1,function(e){l("1gNY")},"data-v-f333f76c",null);t.default=f.exports}});
//# sourceMappingURL=8.b1987dc17915a391207c.js.map