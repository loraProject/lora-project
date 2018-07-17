

// 同步于历史数据界面的数据

const sensorData ={
  state:{
    devName:'',// 当前设备的名称
    devEui:'' ,//设备的devEui
    sensorName:'' ,// 传感器名称
    sensorData:[] , // 传感器数据,字段包括时间，数据，是什么数据
    sensorValue:[], // sensor数据，只包含不同传感器的数据的信息
    dateValue:[],  // 横轴（时间数据）
    devNameList :[],  //用户的个人设备列表
  },
  mutations:{
    SET_DEVNAME:(state, devName)=>{
      //console.log("in store set_devName", devName)
      state.devName = devName;
    },
    SET_DEVEUI:(state, devEui)=>{

      state .devEui = devEui;
      //console.log("in store set_devNEui", this.devEui)
    },
    SET_SENSORNAME:(state, sensorName)=> {
      state .sensorName = sensorName;
      },
    SET_SENSORDATA:(state, sensorData)=>{

      //console.log('in store set sensorData',sensorData)
      state.sensorData = sensorData; // 传感器数据 时间，传感器名称，数据
      state.dateValue = [];
      state.sensorValue = [];
      sensorData.forEach((entry)=>{
          state.dateValue.push(entry.date) //  获得横轴时间
          state.sensorValue.push(entry.value) // 获得大小
        }
      )
    },
    SET_DEVNAMELIST:(state, devNameList)=>{

      state.devNameList = devNameList
      //console.log("in sotre list" , this.devNameList)
    }
  },
  actions:{
    setDeviceEui({commit, state}, devEui){

      //console.log("commit in action")
      commit('SET_DEVEUI',devEui);
      const devNameList = state.devNameList;
      const nameList = devNameList.filter((entry)=>entry.devEUI == devEui)
      if (nameList.length > 0)
        commit('SET_DEVNAME',nameList[0].devname) // 设置设备的名称
    }
  }
}
export default sensorData
