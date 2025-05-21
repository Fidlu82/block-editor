<template>
  <div class="editor-container">
    <!-- Sekcja edytowalnych elementów -->
    <div class="editable-elements">
      <h2>Kliknij, aby edytować style elementu</h2>

      <div @click.stop="selectElement('parent', $event)" class="parent">
        Rodzic (DIV)
        <p @click.stop="selectElement('child', $event)">Dziecko (P)</p>
        <input type="text" @click.stop="selectElement('child', $event)" placeholder="Edytuj mnie (INPUT)" />
      </div>
    </div>

    <!-- Panel edycji stylów -->
    <div v-if="selectedElement" class="style-editor">
      <h3>Edytujesz: {{ selectedElement.type }}</h3>
      <label>
        Kolor tła:
        <input type="color" v-model="selectedElement.styles.backgroundColor" @input="applyStyles" />
      </label>
      <label>
        Kolor tekstu:
        <input type="color" v-model="selectedElement.styles.color" @input="applyStyles" />
      </label>
      <label>
        Padding (px):
        <input type="number" v-model="selectedElement.styles.padding" @input="applyStyles" />
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedElement: null,
    };
  },
  methods: {
    selectElement(type, event) {
      this.selectedElement = {
        type,
        element: event.target,
        styles: {
          backgroundColor: event.target.style.backgroundColor || "#ffffff",
          color: event.target.style.color || "#000000",
          padding: event.target.style.padding.replace("px", "") || 0,
        },
      };
    },
    applyStyles() {
      const { element, styles } = this.selectedElement;
      element.style.backgroundColor = styles.backgroundColor;
      element.style.color = styles.color;
      element.style.padding = `${styles.padding}px`;
    },
  },
};
</script>

<style scoped>
  .editor-container {
    display: flex;
    gap: 20px;
  }
  .editable-elements {
    border: 2px dashed #42b983;
    padding: 20px;
  }
  .parent {
    padding: 20px;
    border: 2px solid #333;
  }
  .child {
    padding: 10px;
    border: 1px solid #555;
  }
  .style-editor {
    padding: 20px;
    border: 2px solid #42b983;
    background-color: #f9f9f9;
    min-width: 300px;
  }
  label {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  input[type="color"],
  input[type="number"] {
    margin-left: 10px;
  }
</style>
