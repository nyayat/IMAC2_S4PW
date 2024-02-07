<script setup>
import * as JVocab from '@/ts/JlptVocab.ts'
import * as _data from '@/ts/data.ts'
import { ref } from 'vue'
</script>

<template>
  <div :set="(_page = filteredListLvl(filteredList()))">
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
    <div class="search"><input type="text" v-model="search" placeholder="Search ..." /></div>

    <div class="vocabulary-list">
      <div v-for="item in paginate(_page)" :key="item.id">
        <div class="vocabulary-voc">
          <div class="vocabulary-furigana">{{ item.furigana }}</div>
          <div @click="changeList('word', item.word)">{{ item.word }}</div>
        </div>
      </div>
    </div>
    <div class="pagination" :set="(_size = Math.ceil(_page.length / pageSize))">
      <button @click="changeList('level', page_param[1])">«</button>
      <button @click="changeList('level', page_param[1], parseInt(page_param[2]) - 1)">‹</button>
      <div :set="(_register = createRegisterArray())">
        <span v-for="item in _register" :key="item">
          <button @click="changeList('level', page_param[1], parseInt(item))">
            {{ parseInt(item) }}
          </button>
        </span>
      </div>
      <button @click="changeList('level', page_param[1], parseInt(page_param[2]) + 1)">›</button>
      <button @click="changeList('level', page_param[1], _size)">»</button>
    </div>
  </div>
</template>

<script>
export default {
  init() {},
  data() {
    return {
      lvl: 0,
      vocabList: [],
      search: '',
      pageSize: 3 * 11,
      pageNow: 1,
      page_param: _data.slashParameters()
    }
  },
  methods: {
    pageConfig: function () {
      this.page_param = _data.slashParameters()
      if (this.page_param[0] == 'level') {
        console.log('param: ' + this.page_param)
        this.lvl = Number(this.page_param[1][1])
        if (this.page_param.length > 2) this.pageNow = Number(this.page_param[2])
      }

      this.createRegisterArray()
    },
    filteredList: function () {
      /* _data.redirectPage('level', this.page_param[1], parseInt(this.page_param[2]))
      this.pageConfig() */
      //TODO: Changer l'url pour que le filtre marche totalement
      return this.vocabList.filter((val) => {
        console.log(val)
        return (
          val.furigana.includes(this.search) ||
          val.word.includes(this.search) ||
          val.romaji.includes(this.search)
        )
      })
    },
    filteredListLvl: function (list) {
      return list.filter((val) => {
        if (this.lvl == 0) return true
        return val.level == this.lvl
      })
    },
    changeList: function (type, level, numPage = 1) {
      numPage = numPage < 1 ? 1 : numPage

      numPage = numPage > this.sizeListFiltered() ? this.sizeListFiltered() : numPage
      _data.redirectPage(type, level, numPage)
      this.pageConfig()
    },
    paginate: function (list) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return list.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
    },
    sizeList: function () {
      return this.vocabList.length
    },

    sizeListFiltered: function () {
      return Math.ceil(this.filteredListLvl(this.filteredList()).length / this.pageSize)
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
    this.vocabList = await JVocab.allVocabulary()
    this.createRegisterArray()
    console.log('fin created')
  },
  mounted() {}
}
</script>

<style></style>
