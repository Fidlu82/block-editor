<template>
  <div class="table-container">
    <!-- Ustawienia tabeli -->
    <div class="controls">
      <button @click="addColumn">➕ Dodaj Kolumnę</button>
      <button @click="addRow">➕ Dodaj Wiersz</button>
      <button @click="removeColumn">❌ Usuń Kolumnę</button>
      <button @click="removeRow">❌ Usuń Wiersz</button>

      <label>
        Padding:
        <input type="number" v-model="tableStyles.padding" />
      </label>

      <label>
        Margin:
        <input type="number" v-model="tableStyles.margin" />
      </label>
    </div>

    <!-- Dynamiczna tabela z drag & drop -->
    <div :style="{ padding: tableStyles.padding + 'px', margin: tableStyles.margin + 'px' }">
      <draggable v-model="rows" tag="table" class="editable-table" handle=".drag-handle">
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <draggable v-model="row.columns" tag="tr" class="row-draggable" handle=".drag-handle">
            <td v-for="(cell, colIndex) in row.columns" :key="colIndex" contenteditable="true" @input="updateCell($event, rowIndex, colIndex)">
              <span class="drag-handle">⠿</span>
              {{ cell }}
            </td>
          </draggable>
        </tr>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  data() {
    return {
      rows: [
        { columns: ["Komórka 1", "Komórka 2"] },
        { columns: ["Komórka 3", "Komórka 4"] }
      ],
      tableStyles: {
        padding: 10,
        margin: 10
      }
    };
  },
  methods: {
    addColumn() {
      this.rows.forEach(row => row.columns.push("Nowa kolumna"));
    },
    removeColumn() {
      this.rows.forEach(row => row.columns.pop());
    },
    addRow() {
      let newRow = { columns: this.rows[0].columns.map(() => "Nowa komórka") };
      this.rows.push(newRow);
    },
    removeRow() {
      if (this.rows.length > 1) this.rows.pop();
    },
    updateCell(event, rowIndex, colIndex) {
      this.rows[rowIndex].columns[colIndex] = event.target.innerText;
    }
  }
};
</script>

<style scoped>
.table-container {
  max-width: 800px;
  margin: auto;
  text-align: center;
}

.controls {
  margin-bottom: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  border: 1px solid #ccc;
  padding: 10px;
  min-width: 100px;
  cursor: text;
}

.drag-handle {
  cursor: grab;
  margin-right: 5px;
  user-select: none;
}
</style>
