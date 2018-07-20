<template>
    <!--<h1>只有管理员才能看到的权限管理</h1>-->
  <div>
  <my-tree></my-tree>
  <my-tree></my-tree>
  </div>
</template>

<script>

    import MyTree from './components/MyTree'
    export default {
        name: "RoleManage",
        components:{MyTree}
    }
</script>

<style scoped>

</style>
