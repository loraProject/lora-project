webpackJsonp([13],{WATD:function(e,t){},l39s:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=i("DoGJ"),a=i("6wmS"),n=i("vLgD"),r="138",d="198",l="南京",o={components:{ElCard:a.a,ElRow:s.a},name:"AddDevice",data:function(){return{deviceName:"",deviceEui:"",devDimensionality:r,devLongitude:d,devAddress:"",responseinfo:"null",responseresult:!1,devEuiRule:{deviceName:[{required:!0,message:"请输入名称",trigger:"blur"}],deviceEui:[{required:!0,message:"请输入devEui",trigger:"blur"},{min:16,max:16,message:"长度只能是16",trigger:"blur"}]},devForm:{deviceName:"",deviceEui:""}}},mounted:function(){this.getInitmap()},methods:{addDevice:function(){var e=this;Object(n.a)({method:"post",url:"/user/adddevice",params:{devEUI:this.devForm.deviceEui,devname:this.devForm.deviceName,latitude:this.devDimensionality,longitude:this.devLongitude,address:this.devAddress}}).then(function(t){e.responseinfo=t.data.info,e.responseresult=t.data.result,1==e.responseresult?e.$message({message:e.responseinfo,type:"success"}):e.$message.error(e.responseinfo)})},getInitmap:function(){var e=new BMap.Map("allmap1"),t=new BMap.Point(118.903787,31.91416),i=new BMap.Geocoder;e.centerAndZoom(t,12);var s=new BMap.Marker(t);e.addOverlay(s),e.enableScrollWheelZoom(),e.enableContinuousZoom(),e.addEventListener("click",function(t){d=t.point.lng,r=t.point.lat,e.removeOverlay(s),s=new BMap.Marker(t.point),e.addOverlay(s),i.getLocation(t.point,function(e){var t=e.addressComponents;l=t.province+t.city+t.district+t.street+t.streetNumber})})},confirmvalue:function(){this.devLongitude=d,this.devDimensionality=r,this.devAddress=l}}},c={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"AddDevice"},[i("el-row",{staticClass:"registerContent",attrs:{type:"flex",justify:"center"}},[i("el-col",{attrs:{xs:24,sm:24,md:16,lg:12,xl:8}},[i("el-card",{staticClass:"bgc"},[i("el-form",{ref:"addDev",attrs:{"label-position":"left",model:e.devForm,rules:e.devEuiRule}},[i("el-form-item",{attrs:{label:"设备名",prop:"deviceName"}},[i("el-input",{attrs:{placeholder:"请输入设备名称"},model:{value:e.devForm.deviceName,callback:function(t){e.$set(e.devForm,"deviceName",t)},expression:"devForm.deviceName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"设备EUI",prop:"deviceEui"}},[i("el-input",{attrs:{placeholder:"请输入设备16位的EUI"},model:{value:e.devForm.deviceEui,callback:function(t){e.$set(e.devForm,"deviceEui",t)},expression:"devForm.deviceEui"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"设备地址"}},[i("el-input",{attrs:{placeholder:"请输入设备地址"},model:{value:e.devAddress,callback:function(t){e.devAddress=t},expression:"devAddress"}})],1),e._v(" "),i("el-row",{staticStyle:{width:"35%"}},[i("el-form-item",{attrs:{label:"经度"}},[i("el-input",{model:{value:e.devLongitude,callback:function(t){e.devLongitude=t},expression:"devLongitude"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"维度"}},[i("el-input",{model:{value:e.devDimensionality,callback:function(t){e.devDimensionality=t},expression:"devDimensionality"}})],1)],1),e._v(" "),i("el-form-item",[i("el-button",{staticClass:"el-icon-location ",on:{click:e.confirmvalue}},[e._v("\n                获取位置\n              ")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.addDevice}},[e._v("确认添加")])],1)],1)],1)],1),e._v(" "),i("el-col",{attrs:{xs:24,sm:24,md:16,lg:12,xl:8}},[i("el-card",{staticClass:"bgc"},[i("div",{staticStyle:{height:"520px"},attrs:{id:"allmap1"}})])],1)],1)],1)},staticRenderFns:[]};var v=i("VU/8")(o,c,!1,function(e){i("WATD")},"data-v-60189e72",null);t.default=v.exports}});
//# sourceMappingURL=13.1e37d9a95c40586e69e1.js.map