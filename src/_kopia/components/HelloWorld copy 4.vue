<template>
  <div class="container">
    <div class="blocks-column">
      <button @click="addBlock">Dodaj blok</button>
      <div v-for="(block, blockIndex) in blocks" :key="block.id" :class="block.className" class="block" :style="block.styles" @click="selectBlock(blockIndex)">
        <!-- Kontrolki bloku -->
        <button @click="removeBlock(blockIndex)">Usuń blok</button>
        <button @click="moveBlock(blockIndex, -1)" :disabled="blockIndex === 0">Przesuń w górę</button>
        <button @click="moveBlock(blockIndex, 1)" :disabled="blockIndex === blocks.length - 1">Przesuń w dół</button>

        <!-- Przełączanie zawartości bloku -->
        <div>
          <h3>Wybierz zawartość bloku:</h3>
          <button @click="block.activeContent = 'header'">Nagłówek</button>
          <button @click="block.activeContent = 'paragraphs'">Paragrafy</button>
          <button @click="block.activeContent = 'table'">Tabela</button>
          <button @click="block.activeContent = 'lists'">Listy</button>
          <button @click="block.activeContent = 'images'">Obrazy</button>
        </div>

        <!-- Zawartość bloku -->
        <div v-if="block.activeContent === 'header'">
        <!-- Nagłówek -->
        <div>
          <label>Wybierz poziom nagłówka:</label>
          <select v-model="block.header.type">
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
            <option value="h4">H4</option>
            <option value="h5">H5</option>
            <option value="h6">H6</option>
          </select>
        </div>

          <component
            :is="block.header.type"
            contenteditable
            @input="updateHeaderText($event, blockIndex)"
            :style="block.header.style"
          >
            {{ block.header.text }}
          </component>
        </div>

        <div v-if="block.activeContent === 'paragraphs'">
          <h3>Paragrafy</h3>
          <button @click="addParagraph(blockIndex)">Dodaj paragraf</button>
          <div v-for="(paragraph, paragraphIndex) in block.paragraphs" :key="paragraph.id">
            <p contenteditable @input="updateParagraph($event, blockIndex, paragraphIndex)">{{ paragraph.text }}</p>
            <button @click="removeParagraph(blockIndex, paragraphIndex)">Usuń paragraf</button>
          </div>
        </div>

        <div v-if="block.activeContent === 'table'">
          <h3>Tabela</h3>
          <button @click="addRow(blockIndex)">Dodaj wiersz</button>
          <button @click="addColumn(blockIndex)">Dodaj kolumnę</button>
          <table border="1" style="margin: 0px auto;">
            <tr v-for="(row, rowIndex) in block.table" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                <input v-model="cell.value" />
              </td>
              <td><button @click="removeRow(blockIndex, rowIndex)">Usuń wiersz</button></td>
            </tr>
            <tr>
              <td v-for="(col, colIndex) in block.table[0]" :key="colIndex">
                <button @click="removeColumn(blockIndex, colIndex)">Usuń kolumnę</button>
              </td>
            </tr>
          </table>
        </div>
        <div v-if="block.activeContent === 'lists'">
          <h3>Listy</h3>
          <button @click="addList(blockIndex)">Dodaj listę</button>
          <div v-for="(list, listIndex) in block.lists" :key="list.id">
            <ul>
              <li v-for="(item, itemIndex) in list.items" :key="item.id">
                <input v-model="item.value" />
                <button @click="removeListItem(blockIndex, listIndex, itemIndex)">Usuń element</button>
              </li>
            </ul>
            <button @click="addListItem(blockIndex, listIndex)">Dodaj element</button>
            <button @click="removeList(blockIndex, listIndex)">Usuń listę</button>
          </div>
        </div>
        <div v-if="block.activeContent === 'images'">
          <h3>Obrazy</h3>
          <button @click="addImage(blockIndex)">Dodaj obraz</button>
          <div v-for="(image, imageIndex) in block.images" :key="image.id">
            <img :src="image.src" :style="{ textAlign: image.align }" alt="Dodany obraz"/>
            <select v-model="image.align">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
            <button @click="removeImage(blockIndex, imageIndex)">Usuń obraz</button>
          </div>
        </div>
  </div>
    </div>
    <div v-if="selectedBlockIndex !== null" class="style-editor-column">
      <h3>Styl bloku</h3>
      <label>Display: <input v-model="blocks[selectedBlockIndex].styles.display" /></label>
      <label>Float: <input v-model="blocks[selectedBlockIndex].styles.float" /></label>
      <label>Position: <input v-model="blocks[selectedBlockIndex].styles.position" /></label>
      <label>Border Radius: <input v-model="blocks[selectedBlockIndex].styles.borderRadius" /></label>
      <label>Border: <input v-model="blocks[selectedBlockIndex].styles.border" /></label>
      <label>Height: <input v-model="blocks[selectedBlockIndex].styles.height" /></label>
      <label>Width: <input v-model="blocks[selectedBlockIndex].styles.width" /></label>
      <label>Padding: <input v-model="blocks[selectedBlockIndex].styles.padding" /></label>
      <label>Margin: <input v-model="blocks[selectedBlockIndex].styles.margin" /></label>
      <h3>Typografia</h3>
      <label>Rozmiar czcionki: <input v-model="blocks[selectedBlockIndex].header.style.fontSize" /></label>
      <label>Pogrubienie: <input type="checkbox" v-model="blocks[selectedBlockIndex].header.style.fontWeight" true-value="bold" false-value="normal" /></label>
      <label>Kursywa: <input type="checkbox" v-model="blocks[selectedBlockIndex].header.style.fontStyle" true-value="italic" false-value="normal" /></label>
      <label>Kolor tekstu: <input type="color" v-model="blocks[selectedBlockIndex].header.style.color" /></label>
      <label>Wyrównanie:
        <select v-model="blocks[selectedBlockIndex].header.style.textAlign">
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </label>
    </div>

    <div>
      <pre>
        {{ blocks }}
      </pre>
    </div>

  </div>
</template>

  <script>
  export default {
    data() {
    return {
      selectedBlockIndex: null,
      activeContent: null,
        blocks: [],
      };
    },
    methods: {
      selectBlock(index) {
        this.selectedBlockIndex = index;
      },
      addImage(blockIndex) {
        const imageUrl = prompt('Podaj URL obrazu:');
        if (imageUrl) {
          this.blocks[blockIndex].images.push({ id: Date.now(), src: imageUrl, align: 'left' });
        }
      },
      removeImage(blockIndex, imageIndex) {
        this.blocks[blockIndex].images.splice(imageIndex, 1);
      },
      addList(blockIndex) {
        this.blocks[blockIndex].lists.push({ id: Date.now(), items: [] });
      },
      addListItem(blockIndex, listIndex) {
        this.blocks[blockIndex].lists[listIndex].items.push({ id: Date.now(), value: "Nowy element" });
      },
      removeListItem(blockIndex, listIndex, itemIndex) {
        this.blocks[blockIndex].lists[listIndex].items.splice(itemIndex, 1);
      },
      removeList(blockIndex, listIndex) {
        this.blocks[blockIndex].lists.splice(listIndex, 1);
      },

    addBlock() {
      const className = prompt('Podaj klasę CSS dla bloku:') || '';
      this.blocks.push({
        id: Date.now(),
        paragraphs: [],
        table: [[{ value: "" }]],
        lists: [],
        images: [],
        activeContent: this.activeContent,
        header: { type: 'h1', text: 'Nagłówek' },
        className: className,
        styles: {
          display: 'block',
          float: 'none',
          position: 'static',
          borderRadius: '0px',
          border: '1px solid black',
          height: 'auto',
          width: '100%',
          padding: '20px',
          margin: '0px',
        },
      });
    },
      removeBlock(index) {
        this.blocks.splice(index, 1);
      },
      moveBlock(index, direction) {
        const newIndex = index + direction;
        const block = this.blocks.splice(index, 1)[0];
        this.blocks.splice(newIndex, 0, block);
      },
      addParagraph(blockIndex) {
        this.blocks[blockIndex].paragraphs.push({ id: Date.now(), text: "Edytuj tekst" });
      },
      updateParagraph(event, blockIndex, paragraphIndex) {
        this.blocks[blockIndex].paragraphs[paragraphIndex].text = event.target.innerText;
      },
      removeParagraph(blockIndex, paragraphIndex) {
        this.blocks[blockIndex].paragraphs.splice(paragraphIndex, 1);
      },
      addRow(blockIndex) {
        const columns = this.blocks[blockIndex].table[0].length;
        this.blocks[blockIndex].table.push(new Array(columns).fill().map(() => ({ value: "" })));
      },
      removeRow(blockIndex, rowIndex) {
        this.blocks[blockIndex].table.splice(rowIndex, 1);
      },
      addColumn(blockIndex) {
        this.blocks[blockIndex].table.forEach(row => row.push({ value: "" }));
      },
      removeColumn(blockIndex, colIndex) {
        this.blocks[blockIndex].table.forEach(row => row.splice(colIndex, 1));
      },
      updateHeaderText(event, blockIndex) {
        this.blocks[blockIndex].header.text = event.target.innerText;
      }
    },
  };
  </script>

  <style>
  .block {
    border: 1px solid black;
    padding: 20px;
    margin-bottom: 20px;
  }
  .style-editor {
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.style-editor label {
  display: block;
  margin-bottom: 10px;
}

.container {
  display: flex;
  gap: 20px;
}

.blocks-column {
  flex: 2;
}

.style-editor-column {
  flex: 1;
  background: white;
  border: 1px solid #ccc;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.style-editor-column label {
  display: block;
  margin-bottom: 10px;
}

</style>
