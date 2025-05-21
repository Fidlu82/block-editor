<template>
  <div id="BlockList">
    <h3>Listy</h3>
    <ul @click.stop="selectElement('lists-ul', blockIndex)" class="elements-group" :class="(selectedItem && selectedItem.type == 'lists-ul' && selectedItem.indexparent == blockIndex) ? 'activ-selected' : ''"
    style="padding: 10px;" :style="tmpBlock.lists.style">
      <li v-for="(item, itemIndex) in tmpBlock.lists.structure.items" :key="item.id" @click.stop="selectElement('lists-li', blockIndex, itemIndex)"
      class="list-item-li" :class="(selectedItem && selectedItem.type == 'lists-li' && selectedItem.indexparent == blockIndex && selectedItem.indexchild == itemIndex) ? 'activ-selected' : ''" :style="item.style">
        <input v-model="item.row.value" @click.stop="selectElement('lists-input', blockIndex, itemIndex, $event)" @input="updateListText($event, blockIndex, itemIndex)" :style="item.row.style"/>
        <button @click="removeListItem(blockIndex, itemIndex)">Usuń element</button>
      </li>

    </ul>
    <button @click="addListItem(blockIndex)">Dodaj element</button>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { app } from '../../mixins/app'

  export default {
    name: 'BlockListPage',
    props: ['blockIndex', 'block'],
    mixins: [app],
    data() {
      return {
        tmpBlock: []
      }
    },
    computed: {
      ...mapGetters('app',['selectedItem'])
    },
    watch: {
      block (newValue) {
        this.updateLocalBlock()
      }
    },
    methods: {
      addListItem(blockIndex, listIndex) {
        this.tmpBlock.lists.structure.items.push({row:{ id: Date.now(), value: "", style: {padding:'6px'}}, style: {padding:'6px'}})
        this.$store.commit('app/SET_BLOCK_VALUE', [blockIndex, 'lists', this.tmpBlock.lists])
      },
      removeListItem(blockIndex, itemIndex) {
        this.tmpBlock.lists.structure.items.splice(itemIndex, 1);
        this.$store.commit('app/SET_BLOCK_VALUE', [blockIndex, 'lists', this.tmpBlock.lists])
      },
      updateListText (event, blockIndex, itemIndex) {
        this.tmpBlock.lists.structure.items[itemIndex].row.value = event.target.value;
        this.$store.commit('app/SET_BLOCK_VALUE', [blockIndex, 'lists', this.tmpBlock.lists])
      },
      updateLocalBlock () {
        this.tmpBlock = JSON.parse(JSON.stringify(this.block))
      }
    },
    created () {
      this.updateLocalBlock()
    }
  }
</script>

<style scoped>
</style>

