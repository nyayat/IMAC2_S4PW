<script setup>
import * as jishoAPI from '@/ts/jisho.ts'
</script>

<template>
  <button @click="jishoAPI.search('日')">chercher 日</button>
  <button @click="jishoAPI.searchKanji('日')">chercher kanji 日</button>
  <button @click="jishoAPI.searchExemple('日')">chercher exemple 日</button>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style></style>
