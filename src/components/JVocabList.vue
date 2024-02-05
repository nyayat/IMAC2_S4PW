<script setup>
import * as JVocab from '@/ts/JlptVocab.ts'
import * as Data from '@/ts/data.ts'
</script>

<template>
  <div class="vocabulary-list">
    <div v-for="item in JVocab.listVocab" :key="item.id">
      <div class="vocabulary-voc">
        <div class="vocabulary-furigana">{{ item.furigana }}</div>
        <div @click="Data.redirectPage('word', item.word)">{{ item.word }}</div>
      </div>
    </div>
  </div>
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
