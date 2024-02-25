<script setup>
import * as _jvocab from '@/ts/JlptVocab.ts'
import * as _data from '@/ts/data.ts'
</script>

<template>
  <div :set="(_page = filteredListLvl(_jvocab.listVoc))">
    <div class="menu">
      <ul>
        <li style="border-left: 1cm" @click="changeList('level', 'N0')"><span>All</span></li>

        <li><a @click="changeList('level', 'N5')">N5</a></li>
        <li><a @click="changeList('level', 'N4')">N4</a></li>
        <li><a @click="changeList('level', 'N3')">N3</a></li>
        <li><a @click="changeList('level', 'N2')">N2</a></li>
        <li><a @click="changeList('level', 'N1')">N1</a></li>
      </ul>
    </div>

    <section class="search">
      <div class="search">
        <input type="text" v-model="search" name="vocabSearch" placeholder="Search a word..." />
        <button class="search-button" @click="changeList('search', search)">Chercher</button>
      </div>
    </section>

    <div class="vocabulary-list">
      <div v-for="item in paginate(_page)" :key="item.id">
        <!-- CARD TEST 
        <div class="vocabulary-voc">
          <div class="level">
            <span id="level">N{{ item.level }}</span>
          </div>
          <div class="vocabulary-furigana">{{ item.furigana }}</div>
          <div @click="changeList('word', item.word)">{{ item.word }}</div>
          <div>{{ item.meaning }}</div>
        </div>-->
        <!-- CARD TEST -->
        <div class="card">
          <div class="card_form">{{ item.word }}</div>
          <div class="card_data">
            <div class="data">
              <div class="text">
                <label class="text_m">{{ item.meaning }}</label>
                <div class="cube text_s">
                  <label class="side front">N{{ item.level }}</label>
                </div>
                <label class="text_d"> - {{ item.furigana }} </label>
                <span title="Acceder a la lista (Temas)">Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination" :set="(_size = Math.ceil(_page.length / pageSize))">
      <button @click="changeList(page_param[0], page_param[1])">«</button>
      <button @click="changeList(page_param[0], page_param[1], parseInt(page_param[2]) - 1)">
        ‹
      </button>
      <div :set="(_register = createRegisterArray())">
        <span v-for="item in _register" :key="item">
          <button @click="changeList(page_param[0], page_param[1], parseInt(item))">
            {{ parseInt(item) }}
          </button>
        </span>
      </div>
      <button @click="changeList(page_param[0], page_param[1], parseInt(page_param[2]) + 1)">
        ›
      </button>
      <button @click="changeList(page_param[0], page_param[1], _size)">»</button>
    </div>
  </div>
</template>

<script>
export default {
  init() {},
  data() {
    return {
      lvl: 0,
      search: '',
      pageSize: 3 * 11,
      pageNow: 1,
      page_param: _data.slashParameters(),
      opt: ''
    }
  },
  methods: {
    pageConfig: function () {
      this.page_param = _data.slashParameters()
      if (this.page_param[0] == 'level') {
        console.log('param: ' + this.page_param)
        this.lvl = Number(this.page_param[1][1])
      }
      if (this.page_param[0] == 'search') this.lvl = 0
      if (this.page_param.length > 2) this.pageNow = Number(this.page_param[2])
      this.createRegisterArray()
    },
    filteredList: function (opt = this.search) {
      return _jvocab.listVoc.filter((val) => {
        return (
          val.romaji.includes(opt) ||
          val.furigana.includes(opt) ||
          val.word.includes(opt) ||
          val.meaning.includes(opt)
        )
      })
    },
    filteredListLvl: function (list) {
      if (this.page_param[0] == 'search')
        return this.filteredList(decodeURIComponent(this.page_param[1]))
      return list.filter((val) => {
        if (this.lvl == 0) return true
        return val.level == this.lvl
      })
    },
    changeList: function (type, option, numPage = 1) {
      numPage = numPage < 1 ? 1 : numPage
      numPage = numPage > this.sizeListFiltered() ? this.sizeListFiltered() : numPage
      _data.redirectPage(type, option, numPage)
      this.pageConfig()
    },
    paginate: function (list) {
      return list.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
    },
    sizeList: function () {
      return _jvocab.listVoc.length
    },

    sizeListFiltered: function () {
      return Math.ceil(this.filteredListLvl(_jvocab.listVoc).length / this.pageSize)
    },

    createRegisterArray: function () {
      let size = this.sizeListFiltered()
      let registerArray = []
      let lastIndex = size
      const maxLength = 5

      let firstRegNr = parseInt(this.page_param[2])
      let lastRegNr = firstRegNr + maxLength

      if (lastRegNr > size) {
        lastRegNr = size + 1
      }

      let diff = lastRegNr - firstRegNr

      if (diff < maxLength) {
        firstRegNr = lastRegNr - maxLength
        if (firstRegNr < 1) {
          firstRegNr = 1
        }
      }

      for (let i = firstRegNr; i < lastRegNr; i++) {
        registerArray.push(i) //store register number (starts with 1);
      }

      return registerArray
    }
  },
  async created() {
    console.log('debut created')
    this.pageConfig()
    this.createRegisterArray()
    console.log('fin created')
  },
  mounted() {}
}
</script>

<style></style>
