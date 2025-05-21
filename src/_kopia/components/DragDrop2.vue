<template>
  <div>
    <table border="1">
      <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" :style="rowStyles[rowIndex]">
        <td
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          @click="openModal(rowIndex, colIndex)"
          :style="getCellStyle(rowIndex, colIndex)"
        >
          {{ cell }}
        </td>
      </tr>
    </table>

    <!-- Modal do edycji tekstu i stylów -->
    <div v-if="modalVisible" class="modal">
      <p>Edycja komórki:</p>
      <input v-model="tableData[selectedRow][selectedCol]" />

      <p>Stylizacja:</p>
      <label>Kolor tekstu: <input type="color" v-model="cellStyles[selectedRow][selectedCol].color" /></label>
      <label>Kolor tła: <input type="color" v-model="cellStyles[selectedRow][selectedCol].backgroundColor" /></label>
      <label>Pogrubienie: <input type="checkbox" v-model="cellStyles[selectedRow][selectedCol].bold" /></label>
      <label>Kursywa: <input type="checkbox" v-model="cellStyles[selectedRow][selectedCol].italic" /></label>

      <p>Stylizacja wiersza:</p>
      <label>Kolor tła: <input type="color" v-model="rowStyles[selectedRow].backgroundColor" /></label>

      <p>Stylizacja kolumny:</p>
      <label>Kolor tła: <input type="color" v-model="columnStyles[selectedCol].backgroundColor" /></label>

      <p>Akcje:</p>
      <button @click="addRow">Dodaj wiersz</button>
      <button @click="addColumn">Dodaj kolumnę</button>
      <button @click="removeRow">Usuń wiersz</button>
      <button @click="removeColumn">Usuń kolumnę</button>
      <button @click="closeModal">Zamknij</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        ["A1", "B1", "C1"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"]
      ],
      modalVisible: false,
      selectedRow: null,
      selectedCol: null,
      rowStyles: [],
      columnStyles: [],
      cellStyles: []
    };
  },
  created() {
    this.initializeStyles();
  },
  methods: {
    initializeStyles() {
      this.rowStyles = this.tableData.map(() => ({ backgroundColor: "" }));
      this.columnStyles = this.tableData[0].map(() => ({ backgroundColor: "" }));
      this.cellStyles = this.tableData.map(row =>
        row.map(() => ({ color: "#000000", backgroundColor: "", bold: false, italic: false }))
      );
    },
    openModal(rowIndex, colIndex) {
      this.selectedRow = rowIndex;
      this.selectedCol = colIndex;
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    addRow() {
      this.tableData.splice(this.selectedRow + 1, 0, Array(this.tableData[0].length).fill("Nowa"));
      this.rowStyles.splice(this.selectedRow + 1, 0, { backgroundColor: "" });
      this.cellStyles.splice(this.selectedRow + 1, 0, Array(this.tableData[0].length).fill({ color: "#000000", backgroundColor: "", bold: false, italic: false }));
      this.closeModal();
    },
    addColumn() {
      this.tableData.forEach(row => row.splice(this.selectedCol + 1, 0, "Nowa"));
      this.columnStyles.splice(this.selectedCol + 1, 0, { backgroundColor: "" });
      this.cellStyles.forEach(row => row.splice(this.selectedCol + 1, 0, { color: "#000000", backgroundColor: "", bold: false, italic: false }));
      this.closeModal();
    },
    removeRow() {
      // if (this.tableData.length > 1) {
      //   this.tableData.splice(this.selectedRow, 1);
      //   this.rowStyles.splice(this.selectedRow, 1);
      //   this.cellStyles.splice(this.selectedRow, 1);
      // }
      this.closeModal();
    },
    removeColumn() {
      if (this.tableData[0].length > 1) {
        this.tableData.forEach(row => row.splice(this.selectedCol, 1));
        this.columnStyles.splice(this.selectedCol, 1);
        this.cellStyles.forEach(row => row.splice(this.selectedCol, 1));
      }
      this.closeModal();
    },
    getCellStyle(rowIndex, colIndex) {
      const style = this.cellStyles[rowIndex][colIndex];
      return {
        color: style.color,
        backgroundColor: style.backgroundColor || this.rowStyles[rowIndex].backgroundColor || this.columnStyles[colIndex].backgroundColor,
        fontWeight: style.bold ? "bold" : "normal",
        fontStyle: style.italic ? "italic" : "normal"
      };
    }
  }
};
</script>

<style>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.modal label {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
