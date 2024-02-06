<script setup>
import * as JVocab from '@/ts/JlptVocab.ts'
import * as _data from '@/ts/data.ts'
import { ref } from 'vue'
</script>

<template>
  <div class="menu">
    <ul>
      <li style="border-left: 1cm"><span>Narai</span></li>

      <li><a @click="changeList('level', 'N5')">N5</a></li>
      <li><a @click="changeList('level', 'N4')">N4</a></li>
      <li><a @click="changeList('level', 'N3')">N3</a></li>
      <li><a @click="changeList('level', 'N2')">N2</a></li>
      <li><a @click="changeList('level', 'N1')">N1</a></li>
    </ul>
  </div>
  <!--<div class="vocabulary-list">
    <div v-for="item in vocabList" :key="item.id">
      <div class="vocabulary-voc">
        <div class="vocabulary-furigana">{{ item.furigana }}</div>
        <div @click="_data.redirectPage('word', item.word)">{{ item.word }}</div>
      </div>
    </div>
  </div> -->
  <input type="text" v-model="search" placeholder="Search ..." />
  <div class="vocabulary-list">
    <div v-for="item in paginate(filteredListLvl(filteredList()))" :key="item.id">
      <div class="vocabulary-voc">
        <div class="vocabulary-furigana">{{ item.furigana }}</div>
        <div @click="_data.redirectPage('word', item.word)">{{ item.word }}</div>
      </div>
    </div>
  </div>
  <!-- <div class="item fruit" v-for="fruit in filteredList()" :key="fruit">
    <p>{{ fruit }}</p>
  </div>
  <div class="item error" v-if="input&&!filteredList().length">
     <p>No results found!</p>
  </div>
  -->
</template>

<script>
export default {
  init() {},
  data() {
    return {
      lvl: 0,
      vocabList: [],
      vocabListN: [],
      search: '',
      pageSize: 20,
      pageNow: 1
    }
  },
  methods: {
    pageConfig: function () {
      const page_param = _data.slashParameters()
      if (page_param[0] == 'level') {
        console.log('param: ' + page_param)
        this.lvl = Number(page_param[1][1])
        if (page_param.length > 2) this.pageNow = Number(page_param[2])
      }
    },
    filteredList: function () {
      return this.vocabList.filter((val) => {
        return val.furigana.includes(this.search) || val.word.includes(this.search)
      })
    },
    filteredListLvl: function (list) {
      return list.filter((val) => {
        return val.level == this.lvl
      })
    },
    changeList: function (type, level) {
      _data.redirectPage(type, level)
      this.pageConfig()
    },
    paginate: function (list) {
      // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
      return list.slice((this.pageNow - 1) * this.pageSize, this.pageNow * this.pageSize)
    }
  },
  async created() {
    console.log('debut created')
    this.pageConfig()
    this.vocabList = await JVocab.allVocabulary()
    console.log('fin created')
  },
  mounted() {}
}
</script>

<style></style>
