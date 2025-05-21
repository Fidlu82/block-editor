<template>
  <div>
    <!-- Przycisk otwierający modal -->
    <button @click="openModal" class="open-modal-btn"><IconsVue :name="'image'"/></button>

    <!-- {{ imagesList }} -->
    <!-- Modal z miniaturkami -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal" style="z-index: 999;">
      <div class="modal">
        <div id="btn-options" style="text-align: right;height: 21px;">
          <button @click="closeModal" class="close-btn">X</button>
        </div>
        <div id="btn-nav" style="margin: 0px 0px 8px;">
          <button class="btn-group" :class="(tabSelected === 'montaz_instrukcje') ? 'btn-group-active': ''" @click="tabSelected = 'montaz_instrukcje', current = 1">Montaż instrukcja</button>
          <button class="btn-group" :class="(tabSelected === 'produkty') ? 'btn-group-active': ''" @click="tabSelected = 'produkty', current = 1">Produkty</button>
          <button class="btn-group" :class="(tabSelected === 'zestaw') ? 'btn-group-active': ''" @click="tabSelected = 'zestaw', current = 1">Zestaw</button>
        </div>
        <div id="btn-nav" style="margin: 0px 0px 8px;" v-if="Object.keys(paginated).length<Object.keys(imagesList[tabSelected]).length">
          <button :class="(current !== 1) ? 'btn-pages' : 'btn-disabled'" @click="changePage('first')" :disabled="current === 1">{{ '|<' }}</button>
          <button :class="(current !== 1) ? 'btn-pages' : 'btn-disabled'" @click="changePage('-')" :disabled="current === 1">{{ '<<' }}</button>
          <!-- <button :class="(current<(imagesList[this.tabSelected].length / this.pageSize)) ? 'btn-pages' : 'btn-disabled'" @click="changePage('+')" :disabled="current>(this.imagesList[this.tabSelected].length / this.pageSize)">{{ '>>' }}</button>
          <button :class="(current<(imagesList[this.tabSelected].length / this.pageSize)) ? 'btn-pages' : 'btn-disabled'" @click="changePage('last')" :disabled="current>(this.imagesList[this.tabSelected].length / this.pageSize)">{{ '>|' }}</button> -->
          <button :class="(current<(filterSearching.length / this.pageSize)) ? 'btn-pages' : 'btn-disabled'" @click="changePage('+')" :disabled="current>(filterSearching.length / this.pageSize)">{{ '>>' }}</button>
          <button :class="(current<(filterSearching.length / this.pageSize)) ? 'btn-pages' : 'btn-disabled'" @click="changePage('last')" :disabled="current>(filterSearching.length / this.pageSize)">{{ '>|' }}</button>
        </div>
        <div style="margin: 0px 0px 20px;  display: block;">
          <input class="result-pages" type="text" v-model="searchtext" style="margin: 5px; padding: 5px;"/>
          <span class="result-pages">{{current}} / {{ Math.ceil(filterSearching.length / pageSize) }}</span></div>

        <!-- @input="seaechText($event.target.value)" -->
          <div id="tabs">

            <div v-if="tabSelected === 'produkty'">
              <!-- <div class="gallery" v-if="imagesList && Object.keys(imagesList.produkty).length>0 "> -->
              <div class="gallery" v-if="imagesList && Object.keys(paginated).length>0 ">
                <img
                  v-for="(image, indexPagin) in paginated"
                  :key="indexPagin"
                  :title="image"
                  :src="'https://lib.pulsar.pl/img/thumbs/'+image"
                  @click="selectImage('https://lib.pulsar.pl/img/produkty/'+image)"
                  class="thumbnail"
                />
              </div>
            </div>
            <div v-if="tabSelected === 'montaz_instrukcje'">
              <div class="gallery" v-if="imagesList && Object.keys(imagesList.montaz_instrukcje).length>0 ">
                <img
                  v-for="(image, indexPagin) in paginated"
                  :key="indexPagin"
                  :title="image"
                  :src="'https://lib.pulsar.pl/img/montaz_instrukcje/'+image"
                  @click="selectImage('https://lib.pulsar.pl/img/montaz_instrukcje/'+image)"
                  class="thumbnail"
                />
              </div>
            </div>
            <div v-if="tabSelected === 'zestaw'">
              <div class="gallery" v-if="imagesList && Object.keys(imagesList.zestaw).length>0 ">
                <img
                  v-for="(image, indexPagin) in paginated"
                  :key="indexPagin"
                  :title="image"
                  :src="'https://lib.pulsar.pl/img/zestaw/'+image"
                  @click="selectImage('https://lib.pulsar.pl/img/zestaw/'+image)"
                  class="thumbnail"
                />
              </div>
            </div>

          </div>

        <!-- <div class="gallery">
          <img
            v-for="(image, index) in images"
            :key="index"
            :src="image"
            @click="selectImage(image)"
            class="thumbnail"
          />
        </div> -->
      </div>
    </div>

    <!-- Wybrane zdjęcie -->
    <!-- <div v-if="selectedImage" class="selected-image">
      <h3>Wybrane zdjęcie:</h3>
      <img :src="selectedImage" alt="Wybrane zdjęcie" />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import IconsVue from './Icons'
import { helpers } from "../mixins/helpers"

export default {
  mixins: [helpers],
  data() {
    return {
      isModalOpen: false,
      tabSelected: 'montaz_instrukcje',
      path: 'https://lib.pulsar.pl/img/',
      selectedImage: '',
      pageSize:120,
      current: 1,
      searchtext: ''
    };
  },
  components: {IconsVue},
  computed: {
    ...mapGetters('app', ['imagesList', 'blocks']),
    indexStart() {
    return (this.current - 1) * this.pageSize;
    },
    indexEnd() {
      return this.indexStart + this.pageSize;
    },
    filterSearching () {
      console.log(this.searchtext)
      let searchArr = []
      let orders = []  // <- tablica projektów
      const self = this

      if (this.tabSelected === 'produkty') {
        orders = JSON.parse(JSON.stringify(this.imagesList.produkty))
      } else if (this.tabSelected === 'montaz_instrukcje') {
        orders = JSON.parse(JSON.stringify(this.imagesList.montaz_instrukcje))
      } else if (this.tabSelected === 'zestaw') {
        orders = JSON.parse(JSON.stringify(this.imagesList.zestaw))
      }

      Object.keys(orders).forEach(function (key) {
          if (
            orders[key].toLowerCase().includes(self.searchtext.toLowerCase())
          ) {
            searchArr.push(orders[key])
          }
        })
      return searchArr
    },
    paginated() {
      var imageTmp = [];
      // console.log(this.tabSelected)
        imageTmp = JSON.parse(JSON.stringify(this.filterSearching))
      // if (this.tabSelected === 'produkty') {
      //   imageTmp = JSON.parse(JSON.stringify(this.imagesList.produkty))
      // } else if (this.tabSelected === 'montaz_instrukcje') {
      //   imageTmp = JSON.parse(JSON.stringify(this.imagesList.montaz_instrukcje))
      // } else if (this.tabSelected === 'zestaw') {
      //   imageTmp = JSON.parse(JSON.stringify(this.imagesList.zestaw))
      // }
      return imageTmp.slice(this.indexStart, this.indexEnd);
    }
  },
  methods: {
    changePage (evt) {
      var lastPage = this.imagesList[this.tabSelected].length / this.pageSize

      if (evt === "+") {
        this.current++
        if ( this.current > lastPage) {
          this.current = Math.ceil(lastPage)
        }
      }
      else if (evt === "-") {
        this.current--
        if (this.current < 1) {
          this.current = 1
        }
      }
      else if (evt === "first") {
        this.current = 1
      }
      else if (evt === "last") {
        this.current = Math.ceil(lastPage)
      }
      console.log(this.current)
    },
    $url_img(elem) {
      //let prod = (elem.indexOf('/'))?elem.replace('/',','):elem;
      let prod = this.slash_to_comma(elem)
      return process.env.VUE_APP_ROOT_IMG + prod
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    selectImage(image) {
      this.selectedImage = image;
      this.closeModal();
      this.$emit('selectedImage', this.selectedImage )
    }
  }
}
</script>

<style scoped>
.btn-group {
  cursor: pointer;
  background: none;
  border: 1px solid burlywood;
  color: #484848;
  padding: 8px 30px;
}
.btn-group:hover, .btn-group-active {
  background: burlywood;
  color: white;
}
.btn-group:disabled, .btn-group[disabled], .btn-group[disabled=disabled], .btn-group:hover:disabled, .btn-group[disabled]:hover, .btn-group[disabled=disabled]:hover,
.button:active:hover:not([disabled]) {
  border: 1px solid #999999;
  background-color: #cccccc;
  color: #666666;
}

.btn-pages {
  cursor: pointer;
  background: none;
  border: 1px solid #87cade;
  color: #484848;
  padding: 4px 20px;
}
.btn-pages:hover {
  background: #87cade;
  color: white;
}
.btn-disabled {
cursor: no-drop;
  background: none;
  border: 1px solid #cecece;
  color: #cecece;
  padding: 4px 20px;
}

.result-pages {
  cursor: normal;
  background: none;
  border: 1px solid #03c621;
  color: #408c16;
  padding: 4px 20px;
}
  .open-modal-btn {
    padding: 2px 6px;
    margin-bottom: 20px;
    background-color: #ff8d0b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .close-btn {
    padding: 2px 6px;
    margin-bottom: 20px;
    background-color: #ff6969;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .close-btn:hover {
    background-color: #ff0000;
  }
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal {
    background: white;
    padding: 20px;
    border-radius: 8px;
    min-width: 500px;
    max-width: 65%;
  }
  .gallery {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    height: 670px;
  }
  .thumbnail {
    cursor: pointer;
    border: 2px solid transparent;
    max-height: 60px;
    max-width: 68px;
  }
  .thumbnail:hover {
    border-color: #14c8ff;
    border-width: 1px;
    padding: 5px;
  }
  .selected-image img {
    max-width: 100%;
    border-radius: 8px;
  }
  #tabs {
    width: 100%;
    height: 100%;
    min-height: 640px;
  }
</style>
