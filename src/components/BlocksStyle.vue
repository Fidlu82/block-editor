<template>
  <div id="BlocksStyle">

    <div class="btn-nav-tabs">
      <button @click="tabActive = 'style'" :class="(tabActive == 'style') ? 'activ-tab' : ''">Style</button>
      <button @click="tabActive = 'wlasciwosci'" :class="(tabActive == 'wlasciwosci') ? 'activ-tab' : ''">Właściwości</button>
    </div>

    <hr style="color: #f7b76d; height: 2px; margin-bottom: 20px;">

    <template v-if="selectedItem && selectedItem.type === 'block'">
        <div class="edit-block">
          <div class='mdTabs'>
            <div v-if="tabActive == 'style'" class='mdTab'>
              <h4>Size</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">height:</span><input v-model="tmpBlocks[selectedItem.indexparent].styles.height" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">width:</span><input v-model="tmpBlocks[selectedItem.indexparent].styles.width" @blur="updateBlocks()"/></li>
              </ul>
              <h4>Odstępy</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">padding:</span><input v-model="tmpBlocks[selectedItem.indexparent].styles.padding" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">margin:</span><input v-model="tmpBlocks[selectedItem.indexparent].styles.margin" @blur="updateBlocks()"/></li>
              </ul>
              <h4>Ramka</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">style:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].styles.borderStyle"  @change="updateBlocks()">
                    <option value="none">none</option>
                    <option value="solid">solid</option>
                    <option value="dotted">dotted</option>
                    <option value="dashed">dashed</option>
                    <option value="double">double</option>
                  </select>
                </li>
                <li><span class="style-block-input">width:</span><input v-model="tmpBlocks[selectedItem.indexparent].styles.borderWidth" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">width:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].styles.borderColor" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">radius:</span><input v-model="tmpBlocks[selectedItem.indexparent].styles.borderRadius" @blur="updateBlocks()"/></li>
              </ul>
              <h4>pozycja / ułożenie</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">display:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].styles.display" @change="updateBlocks()">
                    <option value="none">none</option>
                    <option value="contents">contents</option>
                    <option value="block">block</option>
                    <option value="flex">flex</option>
                    <option value="grid">grid</option>
                    <option value="inline">inline</option>
                    <option value="inline-block">inline-block</option>
                    <option value="inline-flex">inline-flex</option>
                    <option value="inline-grid">inline-grid</option>
                  </select>
                </li>
                <li><span class="style-block-input">float:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].styles.float" @change="updateBlocks()">
                    <option value="none">none</option>
                    <option value="left">left</option>
                    <option value="right">right</option>
                  </select>
                </li>
                <li><span class="style-block-input">position:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].styles.position" style="float: none;" @change="updateBlocks()">
                    <option value="static">static</option>
                    <option value="relative">relative</option>
                    <option value="absolute">absolute</option>
                    <option value="fixed">fixed</option>
                    <option value="sticky">sticky</option>
                  </select>
                  <div v-if="tmpBlocks[selectedItem.indexparent].styles.position === 'relative' || tmpBlocks[selectedItem.indexparent].styles.position === 'absolute'" style="display: block;  margin:10px 0px;">
                    <label class="style-block-input">top:</label><input type="text" v-model="tmpBlocks[selectedItem.indexparent].styles.top" @blur="updateBlocks()" style="width: 30px; margin:0px 4px;"/>
                    <label class="style-block-input">right:</label><input type="text" v-model="tmpBlocks[selectedItem.indexparent].styles.right" @blur="updateBlocks()" style="width: 30px; margin:0px 4px;"/>
                    <label class="style-block-input">bottom:</label><input type="text" v-model="tmpBlocks[selectedItem.indexparent].styles.bottom" @blur="updateBlocks()" style="width: 30px; margin:0px 4px;"/>
                    <label class="style-block-input">left:</label><input type="text" v-model="tmpBlocks[selectedItem.indexparent].styles.left" @blur="updateBlocks()" style="width: 30px; margin:0px 4px;"/>
                  </div>
                </li>
              </ul>
            </div>

            <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
              <div>
                <ul class="edit-block-list-style">
                  <li><span class="style-block-input">id:</span><input type="text"></li>
                  <li><span class="style-block-input">class:</span><input type="text"></li>
                  <li><span class="style-block-input">title:</span><input type="text"></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </template>

    <template v-if="selectedItem.indexparent !==false && selectedItem.type === 'header'">
      <div class="edit-block">
        <div class='mdTabs'>

          <div v-if="tabActive == 'style'" class='mdTab'>
            <h4>Typografia</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">rozmiar:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].header.style.fontSize" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">pogrubienie:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].header.style.fontWeight" @blur="updateBlocks()">
                  <option value="normal">normal</option>
                  <option value="bold">bold</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                </select>
              </li>
              <li><span class="style-block-input">kursywa:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].header.style.fontStyle" @blur="updateBlocks()">
                  <option value="normal">normal</option>
                  <option value="italic">italic</option>
                  <option value="oblique">oblique</option>
                </select>
              </li>
              <li><span class="style-block-input">line-height:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].header.style.lineHeight" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">kolor:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].header.style.color" @blur="updateBlocks()"></li>
            </ul>
            <h4>Odstęp</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">padding:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].header.style.padding" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">margin:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].header.style.margin" @blur="updateBlocks()"></li>
            </ul>
            <h4>Wyrównanie</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">text-align:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].header.style.textAlign" @blur="updateBlocks()">
                  <option value="left">left</option>
                  <option value="center">center</option>
                  <option value="right">right</option>
                </select>
              </li>
            </ul>
          </div>

          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <!-- {{ tmpBlocks }} -->
              <!-- {{ dictionary }} -->
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">tłumaczenie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].header.translation" @change="selectedHeaderDictionary()">
                    <option value="null">...</option>
                    <option v-for="(dict, dictIndex) in dictionary" :key="dictIndex" :value="dict">{{dict.phrasePL}}</option>
                  </select>
                </li>
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </template>

    <template v-if="selectedItem.type === 'paragraphs-group'">
      <div class="edit-block">

        <div class='mdTabs'>
          <div v-if="tabActive == 'style'" class='mdTab'>
            <h4>Odstępy</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">padding:</span><input v-model="tmpBlocks[selectedItem.indexparent].paragraphsGroupStyle.padding" @blur="updateBlocks()"/></li>
              <li><span class="style-block-input">margin:</span><input v-model="tmpBlocks[selectedItem.indexparent].paragraphsGroupStyle.margin" @blur="updateBlocks()"/></li>
            </ul>
            <h4>Wyrównanie</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">text-align:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].paragraphsGroupStyle.textAlign" @blur="updateBlocks()">
                  <option value="left">left</option>
                  <option value="center">center</option>
                  <option value="right">right</option>
                </select>
              </li>
            </ul>
            <h4>pozycja / ułożenie</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">display:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].paragraphsGroupStyle.display" @blur="updateBlocks()">
                  <option value="none">none</option>
                  <option value="contents">contents</option>
                  <option value="block">block</option>
                  <option value="flex">flex</option>
                  <option value="grid">grid</option>
                  <option value="inline">inline</option>
                  <option value="inline-block">inline-block</option>
                  <option value="inline-flex">inline-flex</option>
                  <option value="inline-grid">inline-grid</option>
                </select>
              </li>
            </ul>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-if="selectedItem.type === 'paragraphs'">
      <div class="edit-block">

        <div class='mdTabs'>
          <div v-if="tabActive == 'style'" class='mdTab'>
            <h4>Typografia</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">rozmiar:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.fontSize" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">pogrubienie:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.fontWeight" @change="updateBlocks()">
                  <option value="normal">normal</option>
                  <option value="bold">bold</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                </select>
              </li>
              <li><span class="style-block-input">kursywa:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.fontStyle" @change="updateBlocks()">
                  <option value="normal">normal</option>
                  <option value="italic">italic</option>
                  <option value="oblique">oblique</option>
                </select>
              </li>
              <li><span class="style-block-input">line-height:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.lineHeight" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">kolor:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.color" @blur="updateBlocks()"></li>
            </ul>
            <h4>Wyrównanie</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">text-align:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.textAlign" @change="updateBlocks()">
                  <option value="left">left</option>
                  <option value="center">center</option>
                  <option value="right">right</option>
                </select>
              </li>
            </ul>
            <h4>Odstępy</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">padding:</span><input v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.padding" @blur="updateBlocks()"/></li>
              <li><span class="style-block-input">margin:</span><input v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].style.margin" @blur="updateBlocks()"/></li>
            </ul>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">

                <li><span class="style-block-input">tłumaczenie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].paragraphs[selectedItem.indexchild].translation" @change="selectedDictionaryParagraphs()">
                    <option value="null">...</option>
                    <option v-for="(dict, dictIndex) in dictionary" :key="dictIndex" :value="dict">{{dict.phrasePL}}</option>
                  </select>
                </li>

                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-if="selectedItem.type === 'lists-ul'">
      <div class="edit-block">
        <div class='mdTabs'>

          <div v-if="tabActive == 'style'" class='mdTab'>
              <h4>Odstęp</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">paddings:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].lists.style.padding" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">margines:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].lists.style.margin" @blur="updateBlocks()"/></li>
              </ul>
              <h4>Położenie</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">text-align:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].lists.style.textAlign" @change="updateBlocks()">
                    <option value="left">left</option>
                    <option value="center">center</option>
                    <option value="right">right</option>
                  </select></li>
              </ul>
              <h4>Numeracja</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">list-style:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].lists.style.listStyle" @change="updateBlocks()">
                    <option value="disc">disc</option>
                    <option value="circle">circle</option>
                    <option value="square">square</option>
                    <option value="decimal">decimal</option>
                    <option value="georgian">georgian</option>
                    <option value="kannada">kannada</option>
                  </select>
                </li>
              </ul>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-if="selectedItem.type === 'lists-li'">
      <div class="edit-block">

        <div v-if="tabActive == 'style'" class='mdTab'>
          <div>
            <h4>Odstęp</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">padding:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].style.padding" @blur="updateBlocks()"/></li>
              <li><span class="style-block-input">margines:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].style.margin" @blur="updateBlocks()"/></li>
            </ul>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-if="selectedItem.type === 'lists-input'">
      <div class="edit-block">
        <div class='mdTabs'>

          <div v-if="tabActive == 'style'" class='mdTab'>
            <h4>Typografia</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">rozmiar:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.fontSize" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">pogrubienie:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.fontWeight" @change="updateBlocks()">
                  <option value="normal">normal</option>
                  <option value="bold">bold</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="500">500</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                  <option value="800">800</option>
                  <option value="900">900</option>
                </select>
              </li>
              <li><span class="style-block-input">kursywa:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.fontStyle" @change="updateBlocks()">
                  <option value="normal">normal</option>
                  <option value="italic">italic</option>
                  <option value="oblique">oblique</option>
                </select>
              </li>
              <li><span class="style-block-input">line-height:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.lineHeight" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">kolor:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.color" @blur="updateBlocks()"></li>
              <li><span class="style-block-input">wyrównanie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.textAlign" @change="updateBlocks()">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
              </li>
            </ul>
            <h4>Odstępy</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">padding:</span><input v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.padding" @blur="updateBlocks()"/></li>
              <li><span class="style-block-input">margin:</span><input v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.style.margin" @blur="updateBlocks()"/></li>
            </ul>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">

                <li><span class="style-block-input">tłumaczenie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].lists.structure.items[selectedItem.indexchild].row.translation" @change="selectedDictionaryLists()">
                    <option value="null">...</option>
                    <option v-for="(dict, dictIndex) in dictionary" :key="dictIndex" :value="dict">{{dict.phrasePL}}</option>
                  </select>
                </li>

                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </template>

    <template v-if="selectedItem.type === 'images-group'">
      <div class="edit-block">

        <div class='mdTabs'>
          <div v-if="tabActive == 'style'" class='mdTab'>
            <h4>Odstępy</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">padding:</span><input v-model="tmpBlocks[selectedItem.indexparent].imagesGroupStyle.padding" /></li>
              <li><span class="style-block-input">margin:</span><input v-model="tmpBlocks[selectedItem.indexparent].imagesGroupStyle.margin" /></li>
            </ul>
            <h4>Wyrównanie</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">text-align:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].imagesGroupStyle.textAlign">
                  <option value="left">left</option>
                  <option value="center">center</option>
                  <option value="right">right</option>
                </select>
              </li>
            </ul>
            <h4>Pozycja / ułożenie</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">display:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].imagesGroupStyle.display">
                  <option value="none">none</option>
                  <option value="contents">contents</option>
                  <option value="block">block</option>
                  <option value="flex">flex</option>
                  <option value="grid">grid</option>
                  <option value="inline">inline</option>
                  <option value="inline-block">inline-block</option>
                  <option value="inline-flex">inline-flex</option>
                  <option value="inline-grid">inline-grid</option>
                </select>
              </li>
              <div v-if="tmpBlocks[selectedItem.indexparent].imagesGroupStyle.display === 'flex' || tmpBlocks[selectedItem.indexparent].imagesGroupStyle.display === 'grid'">Wyrównanie (justify-content):
                <select v-model="tmpBlocks[selectedItem.indexparent].imagesGroupStyle.justifyContent">
                  <option value="left">Left</option>
                  <option value="center">Center</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </ul>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-if="selectedItem.type === 'image' && tmpBlocks[selectedItem.indexparent] && tmpBlocks[selectedItem.indexparent].images[selectedItem.indexchild]">
      <div class="edit-block">
        <div class='mdTabs'>
          <div v-if="tabActive == 'style'" class='mdTab'>
            <h4>Wymiary</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">width:</span><input v-model="tmpBlocks[selectedItem.indexparent].images[selectedItem.indexchild].style.width" @blur="updateBlocks()"/></li>
              <li><span class="style-block-input">height:</span><input v-model="tmpBlocks[selectedItem.indexparent].images[selectedItem.indexchild].style.height" @blur="updateBlocks()"/></li>
            </ul>
            <h4>Pozycja / ułożenie</h4>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">margin:</span><input v-model="tmpBlocks[selectedItem.indexparent].images[selectedItem.indexchild].style.margin" @blur="updateBlocks()"/></li>
              <li><span class="style-block-input">padding:</span><input v-model="tmpBlocks[selectedItem.indexparent].images[selectedItem.indexchild].style.padding" @blur="updateBlocks()"/></li>
              <li><span class="style-block-input">float:</span>
                <select v-model="tmpBlocks[selectedItem.indexparent].images[selectedItem.indexchild].style.float" @blur="updateBlocks()">
                  <option value="none">none</option>
                  <option value="left">left</option>
                  <option value="right">right</option>
                </select>
              </li>
            </ul>

            <div style="height:40px;">
              <label for="">usuń element: <button class="btn-nav btn-light" @click="removeImage(selectedItem.indexparent, selectedItem.indexchild)"><IconsVue :name="'delete'"/></button></label>
            </div>

          </div>
        </div>
        <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
          <div>
            <ul class="edit-block-list-style">
              <li><span class="style-block-input">id:</span><input type="text"></li>
              <li><span class="style-block-input">class:</span><input type="text"></li>
              <li><span class="style-block-input">title:</span><input type="text"></li>
            </ul>
          </div>
        </div>

      </div>
    </template>

    <template v-if="selectedItem.type === 'table'">
      <div class="edit-block" v-if="blocks[selectedItem.indexparent].table">
        <div class='mdTabs'>
          <div v-if="tabActive == 'style'" class='mdTab'>
            <div>
              <h4>Typografia</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">rozmiar:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.style.fontSize" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">pogrubienie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.style.fontWeight" @change="updateBlocks()">
                    <option value="normal">normal</option>
                    <option value="bold">bold</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                  </select>
                </li>
                <li><span class="style-block-input">color:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].table.style.color" @blur="updateBlocks()"></li>
              </ul>
              <h4>Size</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">height:</span><input v-model="tmpBlocks[selectedItem.indexparent].table.style.height" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">width:</span><input v-model="tmpBlocks[selectedItem.indexparent].table.style.width" @blur="updateBlocks()"/></li>
              </ul>
              <h4>Odstępy</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">padding:</span><input v-model="tmpBlocks[selectedItem.indexparent].table.style.padding" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">margin:</span><input v-model="tmpBlocks[selectedItem.indexparent].table.style.margin" @blur="updateBlocks()"/></li>
              </ul>
              <h4>Ramka</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">style:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.style.borderStyle"  @change="updateBlocks()">
                    <option value="none">none</option>
                    <option value="solid">solid</option>
                    <option value="dotted">dotted</option>
                    <option value="dashed">dashed</option>
                    <option value="double">double</option>
                  </select>
                </li>
                <li><span class="style-block-input">width:</span><input v-model="tmpBlocks[selectedItem.indexparent].table.style.borderWidth" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">color:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].table.style.borderColor" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">radius:</span><input v-model="tmpBlocks[selectedItem.indexparent].table.style.borderRadius" @blur="updateBlocks()"/></li>
              </ul>
              <h4>Background</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">color:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].table.style.backgroundColor" @blur="updateBlocks()"></li>
              </ul>
            </div>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="selectedItem.type === 'tableTr'">
      <div class="edit-block">
      <div class='mdTabs'>
        <div v-if="tabActive == 'style'" class='mdTab'>
            <div>
              <h4>Typografia</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">rozmiar:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.fontSize" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">pogrubienie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.fontWeight" @change="updateBlocks()">
                    <option value="normal">normal</option>
                    <option value="bold">bold</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                  </select>
                </li>
                <li><span class="style-block-input">align:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.align" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">color:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.color" @blur="updateBlocks()"></li>
              </ul>
              <h4>Size</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">height:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.height" @blur="updateBlocks()"></li>
              </ul>
              <h4>Border</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">width:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.borderWidth" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">style:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.borderStyle" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">color:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].table.structure.style.borderColor" @blur="updateBlocks()"></li>
              </ul>
            </div>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template v-if="selectedItem.type === 'tableTd'">
      <div class="edit-block">

        <div class='mdTabs'>
          <div v-if="tabActive == 'style'" class='mdTab'>
            <div>
              <h4>Wymiary</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">width:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.width" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">height:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.height" @blur="updateBlocks()"></li>
              </ul>
              <h4>Odstępy</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">margin:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.margin" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">padding:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.padding" @blur="updateBlocks()"></li>
                <li><span class="style-block-input">wyrównanie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].style.textAlign" @change="updateBlocks()" style="padding: 5px;  width: 225px;">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </li>
              </ul>

              <div>
                <!-- @click="clearInputs(selectedItem.indexparent, selectedItem.indexchild, selectedItem.index)" -->
                <label style="text-align: left;">typ input:
                  <select style="padding: 5px;  width: 225px;"
                    v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].type"
                    @blur="updateBlocks()"
                  >
                    <option value="text">tekst</option>
                    <option value="img">zdjęcie</option>
                    <option value="">-</option>
                  </select>
                </label>
              </div>

              <div style="width: 100%;  display: block;  margin: 16px 0px;">
                <button class="table-option-btn" @click="addRow(selectedItem.indexparent, selectedItem.indexchild)"><IconsVue :name="'addPlus'"/> <IconsVue :name="'rows'"/></button>
                <button class="table-option-btn" @click="removeRow(selectedItem.indexparent, selectedItem.indexchild)"><IconsVue :name="'delete'"/> <IconsVue :name="'rows'"/></button>
                <button class="table-option-btn" @click="addColumn(selectedItem.indexparent, selectedItem.index)"><IconsVue :name="'addPlus'"/> <IconsVue :name="'columns'"/></button>
                <button class="table-option-btn" @click="removeColumn(selectedItem.indexparent, selectedItem.index)"><IconsVue :name="'delete'"/> <IconsVue :name="'columns'"/></button>
              </div>
            </div>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <div>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>

    <template v-if="selectedItem.type === 'tableInput'">
      <div class="edit-block" v-if="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index]">

        <div class='mdTabs'>
          <div v-if="tabActive == 'style'" class='mdTab'>
            <div>
              <h4>Typografia</h4>
              <ul class="edit-block-list-style">
                <li><span class="style-block-input">rozmiar:</span><input v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.fontSize" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">pogrubienie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.fontWeight" @change="updateBlocks()">
                    <option value="normal">normal</option>
                    <option value="bold">bold</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                    <option value="300">300</option>
                    <option value="400">400</option>
                    <option value="500">500</option>
                    <option value="600">600</option>
                    <option value="700">700</option>
                    <option value="800">800</option>
                    <option value="900">900</option>
                  </select>
                </li>
                <li><span class="style-block-input">kursywa:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.fontStyle" @change="updateBlocks()">
                    <option value="normal">normal</option>
                    <option value="italic">italic</option>
                    <option value="oblique">oblique</option>
                  </select>
                </li>
                <li><span class="style-block-input">padding:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.padding" @blur="updateBlocks()"/></li>
                <li><span class="style-block-input">margines:</span><input type="text" v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.margin" @blur="updateBlocks()"/></li>

                <li><span class="style-block-input">wyrównanie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.textAlign" @change="updateBlocks()" style="padding: 5px;  width: 225px;">
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </li>
                <li><span class="style-block-input">display:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.display" @change="updateBlocks()">
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
                <li><span class="style-block-input">kolor:</span><input type="color" v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.style.color" @blur="updateBlocks()"/></li>
              </ul>
            </div>
          </div>
          <div v-if="tabActive == 'wlasciwosci'" class='mdTab'>
            <!-- {{ tmpBlocks }} -->
            <div>
              <ul class="edit-block-list-style">

                <li><span class="style-block-input">tłumaczenie:</span>
                  <select v-model="tmpBlocks[selectedItem.indexparent].table.structure.rows[selectedItem.indexchild][selectedItem.index].cell.translation" @change="selectedDictionaryTable()">
                    <option value="null">...</option>
                    <option v-for="(dict, dictIndex) in dictionary" :key="dictIndex" :value="dict">{{dict.phrasePL}}</option>
                  </select>
                </li>

                <li><span class="style-block-input">id:</span><input type="text"></li>
                <li><span class="style-block-input">class:</span><input type="text"></li>
                <li><span class="style-block-input">title:</span><input type="text"></li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>

    <!-- <template v-if="blocks && blocks[selectedItem.indexparent]">
      <label for="">blocks</label>
      <br>
      {{ blocks }}
    </template>

    <template v-if="tmpBlocks && tmpBlocks[selectedItem.indexparent]">
      <br>
      <label for="">tmpBlocks</label>
      <br>
      {{ tmpBlocks }}
    </template> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { app } from '../mixins/app'

import IconsVue from './Icons'
import ImageUploader from './ImageUploader'

export default {
  name: 'BlocksStylePage',
  mixins: [app],
  components: {IconsVue, ImageUploader},
  data() {
    return {
      tabActive: 'style',
      translation: [],
      tmpBlocks: []
    }
  },
  computed: {
    ...mapGetters('app', ['selectedItem', 'blocks', 'dictionary']),
    selectedBlockName() {
      return (this.blocks && this.blocks[this.selectedItem.indexparent] && this.blocks[this.selectedItem.indexparent].images) ? this.blocks[this.selectedItem.indexparent].images : []
    },
    syncedValue: {
      get() {
        return this.tmpBlocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].style.textAlign; // Możesz też użyć `valueB`, jeśli to ma sens
      },
      set(newValue) {
        this.blocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].style.textAlign = newValue;
        this.blocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].cell.style.textAlign = newValue; // Aktualizujemy obie zmienne
      }
    }
  },
  watch: {
    blocks: {
      handler(newVal) {
        this.updateTmpBlocks()
      },
      deep: true
    },
    // selectedBlockName: {
    //   handler(newVal) {
    //     console.log(newVal)
    //     // this.updateTmpBlocks()
    //   },
    //   deep: true
    // }
    selectedBlockName (newValue) {
      this.updateTmpBlocks()
    }
  },
  methods: {
    updateTmpBlocks () {
      this.tmpBlocks = JSON.parse(JSON.stringify(this.blocks))
    },
    updateBlocks () {
      console.log('--- updateBlocks ---')
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    removeImage(blockIndex, imageIndex, cellIndex=null) {
      console.log('--- removeImage ---')
      // this.selectedItem = {}
      if (cellIndex == null) {
        this.tmpBlocks[blockIndex].images.splice(imageIndex, 1);
        this.updateBlocks()
      } else {
        this.tmpBlocks[blockIndex].table.structure.rows[imageIndex][cellIndex].cell.value = '';
        this.updateBlocks()
      }
    },
    addRow(blockIndex,rowId) {
      this.tmpBlocks[blockIndex].table.structure.rows.splice(rowId + 1, 0, new Array(this.tmpBlocks[blockIndex].table.structure.rows[0].length).fill().map(() => ({cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}})));
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    removeRow(blockIndex, rowIndex) {
      this.$store.commit('app/SET_ITEM_SELECTED', {})
      this.tmpBlocks[blockIndex].table.structure.rows.splice(rowIndex, 1);
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    addColumn(blockIndex, colId) {
      this.tmpBlocks[blockIndex].table.structure.rows.forEach(row => row.splice(colId + 1, 0, {cell: { value: "", style: {padding:'6px'}}, type: 'text', style: {}}));
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    removeColumn(blockIndex, colIndex) {
      this.$store.commit('app/SET_ITEM_SELECTED', {})
      this.tmpBlocks[blockIndex].table.structure.rows.forEach(row => row.splice(colIndex, 1));
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    selectedHeaderDictionary () {
      this.tmpBlocks[this.selectedItem.indexparent].header.text = this.tmpBlocks[this.selectedItem.indexparent].header.translation.phrasePL
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    selectedDictionaryTable () {
      if (this.selectedItem) {
        console.log(this.tmpBlocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].cell.value)
      }
      // console.log(this.tmpBlocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild].cell)
      // structure: {
      //     rows: [
      //       [{cell: { value: "11", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "21", style: {padding:'6px'} }, type: 'text', style: {}},{cell: { value: "31", style: {padding:'6px'} }, type: 'text', style: {}}],

      this.tmpBlocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].cell.value = this.tmpBlocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].cell.translation.phrasePL
      // this.tmpBlocks[this.selectedItem.indexparent].table.structure.rows[this.selectedItem.indexchild][this.selectedItem.index].cell.translation = this.translation
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    selectedDictionaryLists () {
      this.tmpBlocks[this.selectedItem.indexparent].lists.structure.items[this.selectedItem.indexchild].row.value = this.tmpBlocks[this.selectedItem.indexparent].lists.structure.items[this.selectedItem.indexchild].row.translation.phrasePL
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    },
    selectedDictionaryParagraphs () {
      this.tmpBlocks[this.selectedItem.indexparent].paragraphs[this.selectedItem.indexchild].text = this.tmpBlocks[this.selectedItem.indexparent].paragraphs[this.selectedItem.indexchild].translation.phrasePL
      this.$store.commit('app/UPDATE_BLOCKS', this.tmpBlocks)
    }
  },
  created () {
    this.$store.dispatch('app/get_dictionary')
  }
}
</script>

<style scoped>
  #BlocksStyle {
    width: 95%;
    margin: 0px auto;
    padding: 0px;
  }

.btn-nav-tabs button {
  background:none;
  border:1px solid #f7b76d;
  padding:10px 30px;
  color: chocolate;
  cursor: pointer;
  margin-bottom: 10px;
}
.btn-nav-tabs button:hover {
  background: #f7b76d;
  color: white;
}
.activ-tab {
  background: #f09731 !important;
  color: white !important;
}

#BlocksStyle .edit-block {
  min-width: 260px;
  background: none;
  text-align: left;
  display: block;
}

.mdTab h4 {
  margin: 0px;
}
ul.edit-block-list-style {
  padding: 0px 0px 0px 15px;
  display: grid;
}
ul.edit-block-list-style li {
  list-style: none;
  margin-bottom: 4px;
}
span.style-block-input{
  width: 90px;
  display: block;
  float: left;
}
ul.edit-block-list-style li input, ul.edit-block-list-style li select {
  width: 225px;
  padding: 3px;
  font-size: 11px;
}
ul.edit-block-list-style li select {
  background:white;
  border:1px solid #8f8f9d;
  border-radius:2px;
}



</style>


<!-- <template>
  <div :class="$style.baz">
    <Bar></Bar>
  </div>
  </template>

  <style module>
  .baz {
    color: red;
  }
  </style> -->
