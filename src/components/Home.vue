<template>
  <div id="Home">
    <div class="content">
      <div class="row-content">
        <OpenModule/>
      </div>
      <div class="row-content">
        <div class="col-editor">
          <BlocksEditor/>
        </div>
        <div class="col-style">
          <BlocksStyle/>
        </div>
        <div class="col-view">
          <BlocksView/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OpenModule from './OpenModule'
import BlocksEditor from './BlocksEditor'
import BlocksView from './BlocksView'
import BlocksStyle from './BlocksStyle'

export default {
  name: 'HomePage',
  data () {
    return {}
  },
  components: {OpenModule, BlocksEditor, BlocksView, BlocksStyle},
}
</script>

<style scoped>
.content {
  width: 100%;
}
.row-content {
  display: flex;
}
.col-editor {
  /* 845x1195*/
  width: 50%;
  display: inline;
  padding: 10px;
  border-right: 2px solid rgb(247, 183, 109);
}
.col-view {
  width: 30%;
  padding: 10px;
  border-left: 2px solid rgb(247, 183, 109);
}
.col-style {
  width: 20%;
}
</style>
