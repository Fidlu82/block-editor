<template>
  <div class="ListsBlock">
    <!-- lists: {structure: { id: Date.now(), items: [{row: { id: Date.now(), value: "", style: {padding:'6px'}}, style: {}}] }, style: {padding:'6px', listStyle: "circle"}}, -->
    <ul :style="block.lists.style">
      <li v-for="(list, index) in block.lists.structure.items" :key="index" :style="list.style"> <span :style="list.row.style">{{ list.row.value }}</span></li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "ListsPageBlock",
  props: ['block'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters('app',['blocks'])
  },
  methods: {
  }
}
</script>
