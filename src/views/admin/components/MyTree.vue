<template>
  <el-tree
    :data="data5"
    node-key="id"
    @node-click="getNodeInfo"
  >
     <span class="custom-tree-node" slot-scope="{ node, data }">
        <el-row  type="flex"  justify="start">
         <el-col  :xs="8"  :sm="8">
         <svg-icon icon-class="admin-user" class-name="card-panel-icon"></svg-icon>
         <el-tag type="success" class="user-name-tag">{{node.label}}</el-tag>
         </el-col>
         <el-col  :xs="16" :sm="16">
          <span v-if="data.meta != 'user'" class="operate-button">
            <el-row type="flex" justify="end" :gutter="16" >
             <el-col   :xl="6" :lg="8" :md="10" :xs="12" :sm="12">
          <el-button
            type="success"
            size="mini"
            @click="() => append(data)">
            添加
          </el-button>
        <!--      </el-col>
         <el-col style="background: #09a9bf">-->
          <el-button
            type="danger"
            size="mini"
            @click="() => remove(node, data)">
            删除
          </el-button>

            </el-col>
              </el-row>
        </span>
           </el-col>

         </el-row>
      </span>
  </el-tree>
</template>

<script>

  let id = 1000;
  export default {
    name: "MyTree",
    data() {
      const data = [{
        id: 1,
        label: '一级 1',
        meta: 'user',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        meta: 'user',
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        meta: 'user',
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
      return {
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data))
      }
    },
    methods: {
      append(data) {
        const newChild = {id: id++, label: 'testtest', children: []};
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      getNodeInfo(data, node, obj) {  // 点击可以获得节点的信息
        /*        console.log(data);
                console.log(node);
                console.log(obj);
                console.log("getNodeInfo");*/
      }
    }
  }
</script>

<style scoped lang="scss">
  .el-tree-node__content {
    .card-panel-icon {
      font-size: 30px;
      color: #4AB7BD;
    }
    &:hover {
      .card-panel-icon {
        color: #ffffff;
        background: #4AB7BD;
        border-radius: 10px;
      }
    }
  }

  .user-name-tag {
    margin-left: 18px;
    margin-bottom: 4px;
  }
</style>
<style lang="scss">
  .el-tree-node__content {
    height: 48px;
    line-height: 48px;
    width: 100%;
    .operate-button {
          margin-left: 80%;
    }
  }
  .custom-tree-node{
    width: 100%;
  }

</style>
