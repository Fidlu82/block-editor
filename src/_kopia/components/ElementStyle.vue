<template>
  <div id="ElementStyle">
    {{ selectedBlockIndex }}
    <br><br>
    {{selectedItem}}
    <template v-if="selectedItem && selectedItem.type === 'block'">
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
      </template>

      <template v-if="selectedItem.type === 'header'">
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
      </template>

      <template v-if="selectedItem.type === 'images-group'">
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
      </template>

      <template v-if="selectedItem.type === 'image'">
        <div class="edit-block" v-if="selectedItem.indexparent && selectedImageIndex">
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
      </template>

      <template v-if="selectedItem.type === 'paragraphs-group'">
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
      </template>

      <template v-if="selectedItem.type === 'paragraphs'">
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
      </template>

      <template v-if="selectedItem.type === 'table'">
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
      </template>

      <template v-if="selectedItem.type === 'tableTr'">
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
      </template>

      <template v-if="selectedItem.type === 'tableTd'">
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
                  <li><span class="style-block-input">wyrównanie:</span>
                    <select v-model="syncedValue">
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </li>
                </ul>

                <label style="text-align: left;">typ input:
                  <select v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].type" @click="clearInputs(selectedItem.indexparent, selectedItem.indexchild, selectedItem.index)"
                  style="padding: 5px;  width: 225px;">
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
      </template>

      <template v-if="selectedItem.type === 'tableInput'">
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

                  <li><span class="style-block-input">wyrównanie:</span>
                    <select v-model="syncedValue">
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </li>
                  <li><span class="style-block-input">Display:</span>
                    <select v-model="blocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.display">
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
      </template>

      <template v-if="selectedItem.type === 'lists-ul'">
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
      </template>
      <template v-if="selectedItem.type === 'lists-li'">
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
      </template>
      <template v-if="selectedItem.type === 'lists-input'">
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
      </template>

  </div>
</template>

<script>
import IconsVue from './Icons'
import ImageUploader from './ImageUploader'

import { app } from '../mixins/app'

export default {
  name: 'ElementStylePage',
  props: ['selectedBlockIndex', 'selectedItem', 'blocks'],
  mixins: [app],
  components: {IconsVue, ImageUploader},
  data() {
  return {
    };
  },
  computed: {
    newValueBlocks () {
      return JSON.parse(JSON.stringify(this.blocks))
    },
    syncedValue: {
      get() {
        return this.blocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].style.textAlign; // Możesz też użyć `valueB`, jeśli to ma sens
      },
      set(newValue) {
        this.blocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].style.textAlign = newValue;
        this.blocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].cell.style.textAlign = newValue; // Aktualizujemy obie zmienne
      }
    }
  },
  watch: {
    newValueBlocks(newValue, oldValue) {
    this.aktualiBlocks()
    }
  },
  methods: {
    aktualiBlocks () {
      this.setStateStrJson(this.blocks)
    }
  }
}
</script>
