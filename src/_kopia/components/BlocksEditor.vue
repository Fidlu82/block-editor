<template>
  <div class="container">
    <div class="blocks-column">
      <div class="btn-add">
        <button @click="addBlockUpDown(0)" class="btn-icons"><IconsVue :name="'add'"/></button>
      </div>
      {{readJson}}
      <template v-if="blocks.length>0">
      </template>
      <div class="block" v-for="(block, blockIndex) in blocks" :key="block.id"
      :class="[block.className, (selectedItem && selectedItem.type == 'block' && selectedItem.indexparent == blockIndex) ? 'activ-selected' : '']"
      :style="block.styles"
      @click.stop="selectBlock(blockIndex), selectElement('block', blockIndex)">

        <div class="block-content">

          <div class="nav-buttons">
            <button class="btn-nav" @click="moveBlock(blockIndex, -1)" :disabled="blockIndex === 0"><IconsVue :name="'move_up'"/></button>
            <button class="btn-nav" @click="moveBlock(blockIndex, 1)" :disabled="blockIndex === blocks.length - 1"><IconsVue :name="'move_down'"/></button>
            <button class="btn-nav btn-light" @click="removeBlock(blockIndex)"><IconsVue :name="'delete'"/></button>
          </div>

          <div class="menu-buttons">
            <md-menu md-direction="bottom-start" md-size="medium" :md-offset-x="80" :md-offset-y="-36" :mdCloseOnClick="closeOnClick" :mdCloseOnSelect="closeOnSelect" style="width:305px;">
              <md-button md-menu-trigger><IconsVue :name="'menu'"/></md-button>

              <md-menu-content>
                <md-menu-item>
                  <button @click="selectedContent(blockIndex,'header')" :disabled="block.activeContent === 'header'"  class="btn-icons-option"><IconsVue :name="'header'"/></button>
                  <button @click="selectedContent(blockIndex,'paragraphs')" :disabled="block.activeContent === 'paragraphs'"  class="btn-icons-option"><IconsVue :name="'paragraph'"/></button>
                  <button @click="selectedContent(blockIndex,'table')" :disabled="block.activeContent === 'table'"  class="btn-icons-option"><IconsVue :name="'table'"/></button>
                  <button @click="selectedContent(blockIndex,'lists')" :disabled="block.activeContent === 'lists'"  class="btn-icons-option"><IconsVue :name="'list'"/></button>
                  <button @click="selectedContent(blockIndex,'images')" :disabled="block.activeContent === 'images'"  class="btn-icons-option"><IconsVue :name="'image'"/></button>
                  <button @click="selectedContent(blockIndex,'newpage')" :disabled="block.activeContent === 'newpage'"  class="btn-icons-option"><IconsVue :name="'newpage'"/></button>

                </md-menu-item>
              </md-menu-content>
            </md-menu>
          </div>

          <!-- Nagłówek -->
          <div class="field-header" v-if="block.activeContent === 'header'">
            <h3 style="margin: 0px;">Nagłówek</h3>
            <label>Wybierz poziom nagłówka:</label>
            <select v-model.lazy="block.header.type">
              <option value="h1">H1</option>
              <option value="h2">H2</option>
              <option value="h3">H3</option>
              <option value="h4">H4</option>
              <option value="h5">H5</option>
              <option value="h6">H6</option>
            </select>
            <div style="width:100%; margin:10px">
              <component
                :is="block.header.type"
                contenteditable
                @click.stop="selectElement('header', blockIndex)"
                @input="updateHeaderText($event, blockIndex)"
                :style="block.header.style"
                style="background: #f2f2f2;"
              >
                {{ block.header.text }}
              </component>
            </div>
          </div>

          <!-- Paragraf -->
          <div class="field-paragraphs" v-if="block.activeContent === 'paragraphs'">
            <h3>Paragraf</h3>
            <button @click="addParagraph(blockIndex)"><IconsVue :name="'add'"/></button>
            <div @click.stop="selectElement('paragraphs-group', blockIndex)" :style="blocks[blockIndex].paragraphsGroupStyle">
              <div v-for="(paragraph, paragraphIndex) in block.paragraphs" :key="paragraph.id" style="position:relative; margin: 20px;">
                <p contenteditable
                  @input="updateParagraph($event, blockIndex, paragraphIndex)"
                  @click.stop="selectElement('paragraphs', blockIndex, paragraphIndex)"
                  :style="blocks[blockIndex].paragraphs[paragraphIndex].style"
                  >{{ paragraph.text }}</p>
                <button class="btn"
                  v-if="selectedItem && selectedItem.indexparent == blockIndex && selectedItem.indexchild == paragraphIndex"
                  @click="removeParagraph(blockIndex, paragraphIndex)" style="position: absolute;  right: 0px;  top: -14px;">
                  <IconsVue :name="'delete'"/></button>
              </div>
            </div>
          </div>

          <!-- Zdjęcia -->
          <div class="field-images" v-if="block.activeContent === 'images'">
            <h3>Obrazy</h3>
            <ImageUploader @selectedImage="imageSelected" :blockIndex="blockIndex"/>
            <div class="elements-group" @click.stop="selectElement('images-group', blockIndex)" :style="blocks[blockIndex].imagesGroupStyle">
              <img v-for="(image, imageIndex) in block.images" @click.self="editStyleImage(imageIndex)"  :key="image.id" :src="image.src" alt="Dodany obraz" @click.stop="selectElement('image', blockIndex, imageIndex)" :style="image.style"/>
            </div>
          </div>

          <!-- Lista -->
          <div class="field-lists" v-if="block.activeContent === 'lists'">
            <h3>Listy</h3>
              <ul @click.stop="selectElement('lists-ul', blockIndex)" class="elements-group" :class="(selectedItem && selectedItem.type == 'lists-ul' && selectedItem.indexparent == blockIndex) ? 'activ-selected' : ''" style="padding: 10px;" :style="blocks[blockIndex].lists.style">

                <li v-for="(item, itemIndex) in blocks[blockIndex].lists.structure.items" :key="item.id" @click.stop="selectElement('lists-li', blockIndex, itemIndex)"
                class="list-item-li" :class="(selectedItem && selectedItem.type == 'lists-li' && selectedItem.indexparent == blockIndex && selectedItem.indexchild == itemIndex) ? 'activ-selected' : ''" :style="item.style">
                  <input v-model="item.row.value" @click.stop="selectElement('lists-input', blockIndex, itemIndex, $event)" @input="updateListText($event, blockIndex, itemIndex)" :style="item.row.style"/>
                  <button @click="removeListItem(blockIndex, itemIndex)">Usuń element</button>
                </li>

              </ul>
              <button @click="addListItem(blockIndex)">Dodaj element</button>
          </div>

          <!-- Tabela -->
          <div class="field-table" v-if="block.activeContent === 'table'">
            <h3>Tabela</h3>
            <table class="table" @click.stop="selectElement('table', blockIndex)" style="display: block; "
              :class="(selectedItem && selectedItem.type == 'table' && selectedItem.indexparent && selectedItem.indexparent == blockIndex) ? 'activ-selected' : ''" :style="(selectedItem.indexparent) ? blocks[selectedItem.indexparent].table.style : ''">

              <tr class="table-tr" v-for="(row, rowIndex) in block.table.structure.rows" :key="rowIndex" @click.stop="selectElement('tableTr', blockIndex, rowIndex)" style="padding: 2px;display: flex;"
                :class="(selectedItem && selectedItem.type == 'tableTr' && selectedItem.indexparent && selectedItem.indexparent == blockIndex && selectedItem.indexchild == rowIndex) ? 'activ-selected' : ''">

                <td class="table-td" v-for="(cell, cellIndex) in row" :key="cellIndex" @click.stop="selectElement('tableTd', blockIndex, rowIndex, cellIndex)" style="padding: 4px;width: 33%; display: block; position: relative;"
                :style="blocks[blockIndex].table.structure.rows[rowIndex][cellIndex].style"
                :class="(selectedItem && selectedItem.type == 'tableTd' && selectedItem.indexparent && selectedItem.indexparent == blockIndex && selectedItem.indexchild == rowIndex && selectedItem.index == cellIndex) ? 'activ-selected' : ''">
                  <template v-if="cell.type=='text'">
                    <input class="table-input" @input="updateTableCell($event, blockIndex, rowIndex, cellIndex)" v-model="cell.cell.value" @click.stop="selectElement('tableInput', blockIndex, rowIndex, cellIndex)" style="width: 100%; text-align: left;" :style="blocks[blockIndex].table.structure.rows[rowIndex][cellIndex].cell.style"/>
                  </template>
                  <template v-if="cell.type=='img'">
                    <ImageUploader v-if="blocks[blockIndex].table.structure.rows[rowIndex][cellIndex].cell.value == ''" @selectedImage="imageSelected" :blockIndex="blockIndex" :rowIndex="rowIndex" :cellIndex="cellIndex"/>
                    <img :src="blocks[blockIndex].table.structure.rows[rowIndex][cellIndex].cell.value" alt="" :style="blocks[blockIndex].table.structure.rows[rowIndex][cellIndex].cell.style" @click.stop="selectElement('image', blockIndex, rowIndex, cellIndex)">
                  </template>
                  <template v-if="cell.type==''"></template>
                </td>
              </tr>
            </table>
          </div>

          <div class="field-newpage" v-if="block.activeContent === 'newpage'">
            <hr style="border: 2px solid #b3b3b3; border-radius: 5px;">
          </div>

        </div> <!-- block-content -->

        <div v-if="Object.keys(blocks).length>0 && blockIndex<Object.keys(blocks).length-1" class="btn-add">
          <button @click="addBlockUpDown(blockIndex+1)" class="btn-icons"><IconsVue :name="'add'"/></button>
        </div>

      </div> <!-- block -->

      <div v-if="Object.keys(blocks).length>0" class=" btn-add">
        <button @click="addBlockUpDown(blocks.length)" class="btn-icons"><IconsVue :name="'add'"/></button>
      </div>

      <!-- <StyleEdit/> -->

      <!-- <div style="">
        <pre>
          {{ blocks }}
        </pre>
      </div> -->

    </div> <!-- blocks-column -->

    <div class="style-editor-column">
      <!-- <template v-if="selectedItem">
        {{ selectedItem }}
      </template> -->

      <ElementStyle :selectedBlockIndex="selectedBlockIndex" :selectedItem="selectedItem" :blocks="blocks"/>

      <!-- <template v-if="selectedItem && selectedItem.type === 'block'">
        <div class="edit-block">
          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Size</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">Height:</span><input v-model="blocks[selectedBlockIndex].styles.height" /></li>
                  <li><span class="style-block-input">Width:</span><input v-model="blocks[selectedBlockIndex].styles.width" /></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Odstępy</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">padding:</span><input v-model="blocks[selectedBlockIndex].styles.padding" /></li>
                  <li><span class="style-block-input">margin:</span><input v-model="blocks[selectedBlockIndex].styles.margin" /></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Ramka</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">width:</span><input v-model="blocks[selectedBlockIndex].styles.border" /></li>
                  <li><span class="style-block-input">radius:</span><input v-model="blocks[selectedBlockIndex].styles.borderRadius" /></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">pozycja / ułożenie</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">display:</span><input v-model="blocks[selectedBlockIndex].styles.display" /></li>
                  <li><span class="style-block-input">float:</span><input v-model="blocks[selectedBlockIndex].styles.float" /></li>
                  <li><span class="style-block-input">position:</span><input v-model="blocks[selectedBlockIndex].styles.position" /></li>
                </ul>
              </div>
            </md-tab>

            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>

        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'header'">
        <div class="edit-block">
          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Typografia</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">font:</span><input type="text" v-model="blocks[selectedBlockIndex].table.style.font"></li>
                  <li><span class="style-block-input">kolor:</span><input type="color" v-model="blocks[selectedBlockIndex].header.style.color"></li>
                  <li><span class="style-block-input">rozmiar:</span><input type="text" v-model="blocks[selectedBlockIndex].header.style.fontSize"></li>
                  <li><span class="style-block-input">pogrubienie:</span><input type="text" v-model="blocks[selectedBlockIndex].header.style.fontWeight"></li>
                  <li><span class="style-block-input">kursywa:</span><input type="text" v-model="blocks[selectedBlockIndex].header.style.fontStyle"></li>
                  <li><span class="style-block-input">line-height:</span><input type="text" v-model="blocks[selectedBlockIndex].header.style.lineHeight"></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Odstęp</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">padding:</span><input type="text" v-model="blocks[selectedBlockIndex].table.style.padding"></li>
                  <li><span class="style-block-input">margin:</span><input type="text" v-model="blocks[selectedBlockIndex].table.style.margin"></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Wyrównanie</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">width:</span>
                    <select v-model="blocks[selectedBlockIndex].header.style.textAlign">
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </li>
                </ul>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>
        </div>

      </template> -->

      <!-- <template v-if="selectedItem.type === 'images-group'">
        <div class="edit-block">
          <label>Padding: <input type="text" v-model="blocks[selectedItem.indexparent].imagesGroupStyle.padding" /></label>
          <label>Margines: <input type="text" v-model="blocks[selectedItem.indexparent].imagesGroupStyle.margin" /></label>
          <label>Display:
            <select v-model="blocks[selectedItem.indexparent].imagesGroupStyle.display">
              <option value="none">None</option>
              <option value="contents">Contents</option>
              <option value="block">Block</option>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
              <option value="inline">Inline</option>
              <option value="inline-block">Inline-block</option>
              <option value="inline-flex">Inline-flex</option>
              <option value="inline-grid">Inline-grid</option>
            </select>
          </label>
            <label>Wyrównanie
            <select v-model="blocks[selectedItem.indexparent].imagesGroupStyle.textAlign">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
          <label v-if="blocks[selectedItem.indexparent].imagesGroupStyle.display === 'flex' || blocks[selectedItem.indexparent].imagesGroupStyle.display === 'grid'">Wyrównanie (justify-content):
            <select v-model="blocks[selectedItem.indexparent].imagesGroupStyle.justifyContent">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'image'">
        <div class="edit-block" v-if="selectedItem.indexparent!=null && selectedImageIndex!=null">
          <label>Width: <input type="text" v-model="blocks[selectedItem.indexparent].images[selectedImageIndex].style.width"></label>
          <label>Height: <input type="text" v-model="blocks[selectedItem.indexparent].images[selectedImageIndex].style.height"></label>
          <label>Float: <input type="text" v-model="blocks[selectedItem.indexparent].images[selectedImageIndex].style.float"></label>
          <label>Margin: <input type="text" v-model="blocks[selectedItem.indexparent].images[selectedImageIndex].style.margin"></label>
          <label>Padding: <input type="text" v-model="blocks[selectedItem.indexparent].images[selectedImageIndex].style.padding"></label>
          <div style="height:40px;"></div>
          <label for="">usuń element: <button class="btn-nav btn-light" @click="removeImage(selectedItem.indexparent, selectedImageIndex)"><IconsVue :name="'delete'"/></button></label>
        </div>
        <div class="edit-block" v-if="selectedItem.indexparent!=null && selectedItem.indexchild!=null && selectedItem.index!=null">
          <label>Width: <input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.width"></label>
          <label>Height: <input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.height"></label>
          <label>Float: <input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.float"></label>
          <label>Margin: <input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.margin"></label>
          <label>Padding: <input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.padding"></label>
          <div style="height:40px;"></div>
          <label for="">usuń element: <button class="btn-nav btn-light" @click="removeImage(selectedItem.indexparent, selectedItem.indexchild, selectedItem.index)"><IconsVue :name="'delete'"/></button></label>
          <label for="">zmień element: <ImageUploader v-if="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.value != ''" @selectedImage="imageSelected" :blockIndex="selectedItem.indexparent" :rowIndex="selectedItem.indexchild"  :cellIndex="selectedItem.index"/></label>
        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'paragraphs-group'">
        <div class="edit-block">
          <label>Padding: <input type="text" v-model="blocks[selectedItem.indexparent].paragraphsGroupStyle.padding" /></label>
          <label>Margines: <input type="text" v-model="blocks[selectedItem.indexparent].paragraphsGroupStyle.margin" /></label>
          <label>Wyrównanie:
            <select v-model="blocks[selectedItem.indexparent].paragraphsGroupStyle.textAlign">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
          <label>Display:
            <select v-model="blocks[selectedItem.indexparent].paragraphsGroupStyle.display">
              <option value="none">None</option>
              <option value="contents">Contents</option>
              <option value="block">Block</option>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
              <option value="inline">Inline</option>
              <option value="inline-block">Inline-block</option>
              <option value="inline-flex">Inline-flex</option>
              <option value="inline-grid">Inline-grid</option>
              <option value="table">Table</option>
              <option value="table-row">Table-row</option>
            </select>
          </label>
        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'paragraphs'">
        <div class="edit-block">
          <label>Kolor tekstu: <input type="color" v-model="blocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.color" /></label>
          <label>Rozmiar: <input v-model="blocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.fontSize" /></label>
          <label>Pogrubienie: <input type="checkbox" v-model="blocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.fontWeight" true-value="bold" false-value="normal" /></label>
          <label>Kursywa: <input type="checkbox" v-model="blocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.fontStyle" true-value="italic" false-value="normal" /></label>
          <label>Padding: <input type="text" v-model="blocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.padding" /></label>
          <label>Margines: <input type="text" v-model="blocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.margin" /></label>
          <label>Wyrównanie:
            <select v-model="blocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.textAlign">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'table'">
        <div class="edit-block" v-if="blocks[selectedItem.indexparent].table">
          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Typografia</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">font:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.style.font"></li>
                  <li><span class="style-block-input">color:</span><input type="color" v-model="blocks[selectedItem.indexparent].table.style.color"></li>
                  <li><span class="style-block-input">size:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.style.fontSize"></li>
                  <li><span class="style-block-input">weight:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.style.fontWeight"></li>
                  <li><span class="style-block-input">line-height:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.style.lineHeight"></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Background</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">color:</span><input type="color" v-model="blocks[selectedItem.indexparent].table.style.backgroundColor"></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Border</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">width:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.style.borderWidth"></li>
                  <li><span class="style-block-input">style:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.style.borderStyle"></li>
                  <li><span class="style-block-input">color:</span><input type="color" v-model="blocks[selectedItem.indexparent].table.style.borderColor"></li>
                </ul>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>
        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'tableTr'">
        <div class="edit-block">
        <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Size</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">height:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.style.height"></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Typografia</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">align:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.style.align"></li>
                </ul>
                <h4 style="margin: 0px; text-align: left;">Border</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">width:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.style.borderWidth"></li>
                  <li><span class="style-block-input">style:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.style.borderStyle"></li>
                  <li><span class="style-block-input">color:</span><input type="color" v-model="blocks[selectedItem.indexparent].table.structure.style.borderColor"></li>
                </ul>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>
        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'tableTd'">
        <div class="edit-block">

          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Size</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">width:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.width"></li>
                  <li><span class="style-block-input">height:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.height"></li>
                  <li><span class="style-block-input">margin:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.margin"></li>
                  <li><span class="style-block-input">padding:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.padding"></li>
                </ul>

                <label style="text-align: left;">typ input:
                  <select v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].type" @click="clearInputs(selectedItem.indexparent, selectedItem.indexchild, selectedItem.index)" style="padding: 5px;  width: 225px;">
                    <option value="text">tekst</option>
                    <option value="img">zdjęcie</option>
                    <option value="">-</option>
                  </select>
                </label>

                <div style="width: 100%;  display: block;  margin: 16px 0px;">
                  <button class="table-option-btn" @click="addRow(selectedItem.indexparent, selectedItem.indexchild)"><IconsVue :name="'addPlus'"/> <IconsVue :name="'rows'"/></button>
                  <button class="table-option-btn" @click="removeRow(selectedItem.indexparent, selectedItem.indexchild)"><IconsVue :name="'delete'"/> <IconsVue :name="'rows'"/></button>
                  <button class="table-option-btn" @click="addColumn(selectedItem.indexparent, selectedItem.index)"><IconsVue :name="'addPlus'"/> <IconsVue :name="'columns'"/></button>
                  <button class="table-option-btn" @click="removeColumn(selectedItem.indexparent, selectedItem.index)"><IconsVue :name="'delete'"/> <IconsVue :name="'columns'"/></button>
                </div>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>

        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'tableInput'">
        <div class="edit-block" v-if="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index]">

          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Typografia</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">Kolor:</span><input type="color" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.color" /></li>
                  <li><span class="style-block-input">Rozmiar:</span><input v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.fontSize" /></li>
                  <li><span class="style-block-input">Pogrubienie:</span><input type="checkbox" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.fontWeight" true-value="bold" false-value="normal" /></li>
                  <li><span class="style-block-input">Kursywa:</span><input type="checkbox" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.fontStyle" true-value="italic" false-value="normal" /></li>
                  <li><span class="style-block-input">Padding:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.padding" /></li>
                  <li><span class="style-block-input">Margines:</span><input type="text" v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.margin" /></li>
                  <li><span class="style-block-input">Wyrównanie:</span>
                    <select v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.textAlign">
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </li>

                </ul>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>

        </div>
      </template> -->

      <!-- <template v-if="selectedItem.type === 'lists-ul'">
        <div class="edit-block">
          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Odstęp</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">paddings:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.style.padding" /></li>
                  <li><span class="style-block-input">margines:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.style.margin" /></li>
                  <li><span class="style-block-input">list-style:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.style.listStyle" /></li>
                  <li><span class="style-block-input">text-align:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.style.textAlign" /></li>
                </ul>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>
        </div>
      </template> -->
      <!-- <template v-if="selectedItem.type === 'lists-li'">
        <div class="edit-block">
          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Odstęp</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">padding:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].style.padding"/></li>
                  <li><span class="style-block-input">margines:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].style.margin"/></li>
                </ul>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>
        </div>
      </template> -->
      <!-- <template v-if="selectedItem.type === 'lists-input'">
        <div class="edit-block">
          <md-tabs :md-active-tab="0">
            <md-tab id="A" md-label='Style' style="padding:0px">
              <div style="margin-top:20px">
                <h4 style="margin: 0px; text-align: left;">Typografia</h4>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">kolor:</span><input type="color" v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.color" /></li>
                  <li><span class="style-block-input">rozmiar:</span><input v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.fontSize" /></li>
                  <li><span class="style-block-input">pogrubienie:</span><input type="checkbox" v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.fontWeight" true-value="bold" false-value="normal" /></li>
                  <li><span class="style-block-input">kursywa:</span><input type="checkbox" v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.fontStyle" true-value="italic" false-value="normal" /></li>
                  <li><span class="style-block-input">padding:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.padding" /></li>
                  <li><span class="style-block-input">margin:</span><input type="text" v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.margin" /></li>
                  <li><span class="style-block-input">wyrównanie:</span>
                    <select v-model="blocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.textAlign">
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </li>
                </ul>
              </div>
            </md-tab>
            <md-tab id="B" md-label='Właściwości'>
              <div style="margin-top:20px">
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </md-tab>
          </md-tabs>
        </div>
      </template> -->

    </div>

    <md-dialog :md-active.sync="showDialogMenu">
      <md-dialog-title>Preferences</md-dialog-title>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialogMenu = false">Close</md-button>
        <md-button class="md-primary" @click="showDialogMenu = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>
</template>

  <script>
  import { mapGetters } from 'vuex'
  import IconsVue from './Icons.vue';
  import ImageUploader from './ImageUploader'
  import StyleEdit from './StyleEdit'
  import ElementStyle from './ElementStyle'
  import { app } from '../mixins/app'

  export default {
    name: 'BlocksEditorPage',
    mixins: [app],
    data() {
    return {
        showDialogMenu: false,
        activeContent: '',
        blocks: [],
        selectedBlockIndex: null,
        selectedGroupIndex: null,
        selectedImageIndex: null,
        selectedHeaderIndex: null,
        selectedItem: {},
        closeOnClick: true,
        closeOnSelect: true,
        showTooltip: false
      };
    },
    components: {IconsVue, ImageUploader, StyleEdit, ElementStyle},
    watch: {
      // blocks (newValue) {
      //   console.log(newValue)
      // },
      // strJson (newValue) {
      //   this.updateDataBlocks(newValue)
      // }
      readJson (newValue) {
        this.updateDataBlocks()
      },
      // blocksJson (newvalue) {
      //   console.log(newvalue)
      //   this.updateDataBlocks()
      // }
    },
    computed: {
      ...mapGetters('app', ['strJson', 'readJson']),
      blocksJson () {
        return JSON.parse(JSON.stringify(this.blocks))
      }
    },
    methods: {
      setStateStrJson (data) {
        console.log(this.blocks)
        this.$store.commit('app/SET_INPUT_SYMBOL', [])
        this.$store.commit('app/SET_READ_JSON', 'manual')
        this.$store.commit('app/SET_BLOCKS_MANUAL',data)
      },
      clearInputs (parentID, childID, kidsID) {
        console.log('clearInputs')
        this.blocks[parentID].table.structure.rows[childID][kidsID].cell.value = ''
        this.blocks[parentID].table.structure.rows[childID][kidsID].cell.style = {}

        this.setStateStrJson(this.blocks)
      },
      toggleTooltip() {
        this.showTooltip = !this.showTooltip;
      },
      // optionSelected(option) {
      //   alert(`Wybrano: ${option}`);
      //   this.showTooltip = false;
      // },
      selectElement(type=null, indexparent=null, indexchild=null, index=null, event=null) {
        // console.log(type, indexparent, indexchild, index, event)
        this.selectedItem = {type: type, indexparent: indexparent, indexchild: indexchild, index: index, event: event}
      },
      selectBlock(index) {
        this.selectedBlockIndex = index
        this.selectedGroupIndex = null
      },
      addBlockUpDown(index) {
        const className = prompt('Podaj klasę CSS dla bloku:') || '';
        console.log(index)
        console.log(this.blocks)
        if (index === 0) {
          this.blocks.unshift({
            id: Date.now(),
            className: className,
            activeContent: this.activeContent,
            styles: { display: 'block', float: 'none', position: 'static', borderRadius: '0px', border: '', height: 'auto', width: '100%', padding: '10px 10px 10px 10px', margin: '0px' },
            header: { type: 'h1', text: '', style: {fontWeight: 'normal', fontStyle: 'normal', color: '#000000', fontSize: '20px', textAlign: 'center', padding: '5px', margin: '10px'}},
            table: {
              structure: {
                rows: [
                  [{cell: { value: "11", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "21", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "31", style: {padding:'6px'} }, type: 'text', style: {}}],
                  [{cell: { value: "12", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "22", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "32", style: {padding:'6px'} }, type: 'text', style: {}}],
                  [{cell: { value: "13", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "23", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "33", style: {padding:'6px'} }, type: 'text', style: {}}]
                ],
                style: {}
              },
              style: {margin: "0px auto", padding: "10px", width: "100%"}
            },
            // [
            //   [{cell: { value: "11", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "21", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "31", style: {padding:'6px'} }, type: 'text', style: {}}],
            //   [{cell: { value: "12", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "22", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "32", style: {padding:'6px'} }, type: 'text', style: {}}],
            //   [{cell: { value: "13", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "23", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "33", style: {padding:'6px'} }, type: 'text', style: {}}]
            // ],
            paragraphs: [],
            paragraphsGroupStyle: {padding: '0px', margin: '0px', textAlign: 'center', display:'block'},
            lists: {structure: { id: Date.now(), items: [{row: { id: Date.now(), value: "", style: {padding:'6px'}}, style: {}}] }, style: {padding:'6px', listStyle: "circle"}},
            images: [],
            imagesGroupStyle: {padding: '0px', margin: '0px', textAlign: 'left', display:'block', justifyContent: 'left'},
            newpage: null
          });
        } else if (index === Object.keys(this.blocks).length) {
          this.blocks.push({
            id: Date.now(),
            className: className,
            activeContent: this.activeContent,
            styles: { display: 'block', float: 'none', position: 'static', borderRadius: '0px', border: '', height: 'auto', width: '100%', padding: '10px 10px 10px 10px', margin: '0px' },
            header: { type: 'h1', text: '', style: {fontWeight: 'normal', fontStyle: 'normal', color: '#000000', fontSize: '20px', textAlign: 'center', padding: '5px', margin: '10px'}},
            table: {
              structure: {
                rows: [
                  [ {cell: { value: "11", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}},
                    {cell: { value: "21", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}},
                    {cell: { value: "31", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}} ],
                  [ {cell: { value: "12", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}},
                    {cell: { value: "22", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}},
                    {cell: { value: "32", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}} ],
                  [ {cell: { value: "13", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}},
                    {cell: { value: "23", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}},
                    {cell: { value: "33", style: {padding:'6px', display: 'block'} }, type: 'text', style: {}} ]
                ],
                style: {}
              },
              style: {margin: "0px auto", padding: "10px", width: "100%"}
            },
            paragraphs: [],
            paragraphsGroupStyle: {padding: '0px', margin: '0px', textAlign: 'center', display:'block'},
            lists: {structure: { id: Date.now(), items: [{row: { id: Date.now(), value: "", style: {padding:'6px'}}, style: {}}] }, style: {padding:'6px'}},
            images: [],
            imagesGroupStyle: {padding: '0px', margin: '0px', textAlign: 'left', display:'block', justifyContent: 'left'},
            newpage: null
          });
        } else {
          this.blocks.splice((index), 0, {
            id: Date.now(),
            className: className,
            activeContent: this.activeContent,
            styles: { display: 'block', float: 'none', position: 'static', borderRadius: '0px', border: '', height: 'auto', width: '100%', padding: '10px 10px 10px 10px', margin: '0px' },
            header: { type: 'h1', text: '', style: {fontWeight: 'normal', fontStyle: 'normal', color: '#000000', fontSize: '20px', textAlign: 'center', padding: '5px', margin: '10px'}},
            table: {
              structure: {
                rows: [
                  [{cell: { value: "11", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "21", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "31", style: {padding:'6px'} }, type: 'text', style: {}}],
                  [{cell: { value: "12", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "22", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "32", style: {padding:'6px'} }, type: 'text', style: {}}],
                  [{cell: { value: "13", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "23", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "33", style: {padding:'6px'} }, type: 'text', style: {}}]
                ],
                style: {}
              },
              style: {margin: "0px auto", padding: "10px", width: "100%"}
            },
            lists: {structure: { id: Date.now(), items: [{row: { id: Date.now(), value: "", style: {padding:'6px'}}, style: {}}] }, style: {padding:'6px'}},
            paragraphs: [],
            paragraphsGroupStyle: {padding: '0px', margin: '0px', textAlign: 'center', display:'block'},
            images: [],
            imagesGroupStyle: {padding: '0px', margin: '0px', textAlign: 'left', display:'block', justifyContent: 'left'},
            newpage: null
          });
          // let tablica = [1, 2, 4, 5];
          // tablica.splice(2, 0, 3);  // Dodaje 3 na indexie 2
          // console.log(tablica);  // Wynik: [1, 2, 3, 4, 5]
        }
        this.setStateStrJson(this.blocks)
        //   this.moveBlock(index, direction)
      },
      removeBlock(index) {
        this.blocks.splice(index, 1);
        this.selectedItem = {}
        if (Object.keys(this.blocks).length>0) {
          this.selectedBlockIndex = 0;
        } else{
          this.selectedBlockIndex = null;
        }
        this.setStateStrJson(this.blocks)
      },
      moveBlock(index, direction) {
        const newIndex = index + direction;
        const block = this.blocks.splice(index, 1)[0];
        this.blocks.splice(newIndex, 0, block);
        this.setStateStrJson(this.blocks)
      },
      // obrazy
      addImage(blockIndex) {
        const imageUrl = prompt('Podaj URL obrazu:');
        if (imageUrl) {
          this.blocks[blockIndex].images.push({ id: Date.now(), src: imageUrl, style: {align: 'left', float: 'none', padding: '0px', margin: '0px', width: '200px', height: 'auto' }});
        }
        this.setStateStrJson(this.blocks)
      },
      // removeImage(blockIndex, imageIndex, cellIndex=null) {
      //   this.selectedItem = {}
      //   if (cellIndex == null) {
      //     this.blocks[blockIndex].images.splice(imageIndex, 1);
      //   } else {
      //     this.blocks[blockIndex].table.structure.rows[imageIndex][cellIndex].cell.value = '';
      //   }
      //   this.setStateStrJson(this.blocks)
      // },
      // imageSelected (event, index, rowIndex, cellIndex) {
      //   if (event && event !=='') {
      //     const imageUrl = event
      //     if (rowIndex != null && cellIndex != null) {
      //       const imageUrl = event
      //       this.blocks[index].table.structure.rows[rowIndex][cellIndex].cell.value = imageUrl
      //       this.blocks[index].table.structure.rows[rowIndex][cellIndex].cell.style = {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '100%', height: 'auto'}
      //     } else {
      //       this.blocks[index].images.push({ id: Date.now(), src: imageUrl, style: {align: 'left', float: 'none', padding: '6px', margin: '0px', width: '200px', height: 'auto' }});
      //     }
      //   }
      //   this.setStateStrJson(this.blocks)
      // },
      // lista
      addList(blockIndex) {
        // this.blocks[blockIndex].lists.structure.push({ id: Date.now(), items: [], style: {}});
      },
      addListItem(blockIndex, listIndex) {
        this.blocks[blockIndex].lists.structure.items.push({row:{ id: Date.now(), value: "", style: {padding:'6px'}}, style: {padding:'6px'}});
        this.setStateStrJson(this.blocks)
      },
      removeListItem(blockIndex, itemIndex) {
        this.selectedItem = {}
        this.blocks[blockIndex].lists.structure.items.splice(itemIndex, 1);
        this.setStateStrJson(this.blocks)
      },
      removeList(blockIndex, listIndex) {
        this.selectedItem = {}
        this.blocks[blockIndex].lists.splice(listIndex, 1);
        this.setStateStrJson(this.blocks)
      },
      // input
      addInput(blockIndex) {
        this.blocks[blockIndex].inputs.push({ id: Date.now(), value: "" });
        this.setStateStrJson(this.blocks)
      },
      removeInput(blockIndex, inputIndex) {
        this.selectedItem = {}
        this.blocks[blockIndex].inputs.splice(inputIndex, 1);
        this.setStateStrJson(this.blocks)
      },
      // paragraf
      addParagraph(blockIndex) {
        this.blocks[blockIndex].paragraphs.push({ id: Date.now(), text: "....", style: {padding: "5px"}});
        this.setStateStrJson(this.blocks)
      },
      updateParagraph(event, blockIndex, paragraphIndex) {
        this.blocks[blockIndex].paragraphs[paragraphIndex].text = event.target.innerText;
        this.setStateStrJson(this.blocks)
      },
      updateTableCell (event, blockIndex, rowIndex, cellIndex) {
        this.blocks[blockIndex].table.structure.rows[rowIndex][cellIndex].value = event.target.innerText;
        this.setStateStrJson(this.blocks)
      },
      removeParagraph(blockIndex, paragraphIndex) {
        this.selectedItem = {}
        this.blocks[blockIndex].paragraphs.splice(paragraphIndex, 1);
        this.setStateStrJson(this.blocks)
      },
      // tabela
      // addRow(blockIndex,rowId) {
      //   this.blocks[blockIndex].table.structure.rows.splice(rowId + 1, 0, new Array(this.blocks[blockIndex].table.structure.rows[0].length).fill().map(() => ({cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}})));
      //   this.setStateStrJson(this.blocks)
      // },
      // removeRow(blockIndex, rowIndex) {
      //   this.selectedItem = {}
      //   this.blocks[blockIndex].table.structure.rows.splice(rowIndex, 1);
      //   this.setStateStrJson(this.blocks)
      // },
      // addColumn(blockIndex, colId) {
      //   // this.blocks[blockIndex].table.forEach(row => row.push({cell: { value: "", style: {}}, type: 'text', style: {}}));
      //   this.blocks[blockIndex].table.structure.rows.forEach(row => row.splice(colId + 1, 0, {cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}}));
      //   this.setStateStrJson(this.blocks)

      //   // this.tableData.forEach(row => row.splice(this.selectedCol + 1, 0, "Nowa"));
      //   // this.columnStyles.splice(this.selectedCol + 1, 0, { backgroundColor: "" });
      //   // this.cellStyles.forEach(row => row.splice(this.selectedCol + 1, 0, { color: "#000000", backgroundColor: "", bold: false, italic: false }));
      // },
      // removeColumn(blockIndex, colIndex) {
      //   this.selectedItem = {}
      //   this.blocks[blockIndex].table.structure.rows.forEach(row => row.splice(colIndex, 1));
      //   this.setStateStrJson(this.blocks)
      // },
      // nagłówek
      updateHeaderText(event, blockIndex) {
        this.blocks[blockIndex].header.text = event.target.innerText;
        this.setStateStrJson(this.blocks)
      },
      updateListText (event, blockIndex, itemIndex) {
        // this.blocks.list[blockIndex].header.text = event.target.innerText;
        this.setStateStrJson(this.blocks)
      },
      showToolsMenu (index) {
        this.showDialogMenu = true
      },
      editStyleImage (index) {
        this.selectedImageIndex = index
      },
      editStyleGroup (index) {
        this.selectedBlockIndex = index
        this.selectedGroupIndex = index
        this.selectedImageIndex = null
      },
      editStyleElement (index) {

      },
      editStyleHeader (index) {
        this.selectedBlockIndex = index
        this.selectedHeaderIndex = index
      },
      selectedContent (index,content) {
        this.blocks[index].newpage = null
        if (content == 'newpage') {
          this.blocks[index].newpage = true
        }
        this.blocks[index].activeContent = content
        this.setStateStrJson(this.blocks)
      },
      updateDataBlocks () {
        console.log('---- updateDataBlocks ----')
        if (!this.strJson || this.strJson === null) {
          this.blocks = []
        } else {
          this.blocks = JSON.parse(JSON.stringify(this.strJson))
        }
      }
    }
  }
  </script>

  <style>
    .lists-ul {
      padding: 4px;
    }
    .lists-li {
      padding: 4px;
    }
    .list-item-li{
      padding: 4px;
    }
    .list-item-li:hover {
      border: 1px solid #02a1fd;
    }
    .edit-block {
      position: relative;
      min-width: 260px;
    }
    .edit-block-list-style {
      list-style: none;  text-align: left;  padding: 0px;
    }
    .edit-block-list-style li{
      margin: 10px 0px;
    }
    .edit-block-list-style li input{
      padding: 4px;
    }
    .style-block-input {
      float: left;
      width: 85px;
    }
    .table-option-btn {
      display:block; margin: 8px 0px; width: 100%; padding: 4px; display: block ruby; cursor: pointer;
    }
    .btn {
      cursor: pointer;
    }
    .activ-selected {
      border: 1px solid #02a1fd;
    }
    .table:hover {
      border: 1px solid #02a1fd;
    }
    .table-tr:hover {
      border: 1px solid #02a1fd;
    }
    .table-td:hover {
      border: 1px solid #02a1fd;
    }
    .table-input:hover {
      border: 1px solid #02a1fd;
    }
    .nav-buttons {
      height: 24px;
      text-align: right;
    }
    .menu-buttons {
      text-align: left;
    }
    .block {
      margin-bottom: 20px;
      padding: 10px 10px 10px 10px;
    }
    .block:hover {
      border: 1px solid #02a1fd;
    }
    .block-content {
      border: 1px solid #ccc;
      padding: 10px 10px 10px 10px;
      margin-bottom: 0px;
    }
    /* .block-content:hover {
      border: 1px solid #02a1fd;
    } */
     .elements-group:hover {
      border: 1px solid #02a1fd;
      padding: 10px 10px 10px 10px;
     }

    .block-image:hover {
      padding: 10px;
    }
    .block-image:hover {
      border: 1px solid #02a1fd;
    }
    .block-img:hover {
      border: 1px solid #02a1fd;
    }
    .image-box {
      padding: 10px 10px 10px 10px;
    }
    .image-box:hover {
      border: 1px solid #02a1fd;
    }
    /* .block-content:hover {
      border: 1px solid black;
      padding: 20px;
      margin-bottom: 20px;
    } */

    .btn-nav {
      padding: 0px 8px;
      margin-bottom: 20px;
      background-color: #3c83ce;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      line-height: 11px;
      height: 22px;
    }
    .btn-light {
      background-color: #ecebeb;
    }
    .btn-icons {
      border: none;
      background: none;
      cursor: pointer;
      padding: 10px;
      width: 100%;
    }
    .btn-add {
      border: 1px dashed #bdbdbd;
      margin-top: 5px;
      margin-bottom: 5px;
    }
    .btn-add:hover {
      border: 1px dashed #686868;
    }
    .btn-icons-option {
      padding: 2px 12px;
      margin-right: 8px;
      background-color: #42b983;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .style-editor {
      min-width: 350px;
    position: relative;
    top: 20px;
    right: 20px;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .md-menu-content.md-menu-content-medium {
    max-width:305px;
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
    position: relative;
    flex: 1;
    background: white;
    border: 1px solid #ccc;
    padding: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    min-height: 400px;
    max-width: 345px;
  }
  .style-editor-column label {
    display: block;
    margin-bottom: 10px;
  }
</style>
