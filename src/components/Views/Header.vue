<template>
  <div class="HeaderBlock">
    <component :is="block.header.type" :style="block.header.style">{{ block.header.text }}</component>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: "HeaderPageBlock",
  props: ['block'],
  data() {
    return {
    }
  }
}
</script>
