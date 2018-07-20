<template>
  <el-tree
    :props="props1"
    :load="loadNode1"
    lazy
    show-checkbox>
     <span class="custom-tree-node" slot-scope="{ node, data }">
         <svg-icon icon-class="password"></svg-icon>
        <span>{{ node.label }}</span>
        <span>{{ data.name }}</span>
      <!-- <div style="height: 100px; background: #3A71A8"></div>-->
        <span>
          <el-button
            type="text"
            size="mini"
            @click="() => append(data)">
            Append
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
  </el-tree>
</template>

<script>
    export default {
        name: "MyTree",
      data() {
        return {
          props1: {
            label: 'name',
            children: 'zones',
            isLeaf: 'leaf'
          },
        };
      },
      methods: {
        loadNode1(node, resolve) {


          if (node.level === 0) {
            return resolve([{ name: 'region' }]);
          }
          console.log(node)
          if (node.level > 1) return resolve([]);

          setTimeout(() => {
            const data = [{
              name: 'leaf',
              str:"what ever",
              leaf: true,
            }, {
              name: 'zone'
            }];

            resolve(data);
          }, 500);
        },
        remove(data){
          console.log("in remove", JSON.stringify(data));
        },
        append(data){
          console.log("in append", JSON.stringify(data));

        }
      }
    }
</script>

<style scoped>

</style>
