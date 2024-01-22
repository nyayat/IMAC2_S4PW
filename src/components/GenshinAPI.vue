<script setup>
import { listItems, getData, redirectPage } from '@/ts/data.ts'
</script>

<template>
  <div v-for="item in listItems" :key="item.id">
    <button @click="redirectPage(item)">{{ item }}</button>
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
