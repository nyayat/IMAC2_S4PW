<script setup lang="ts">
import * as _data from '@/ts/data'
</script>

<template>
  <div id="nav-bar">
    <ul>
      <li style="border-left: 1cm"><span>Narai</span></li>
      <!-- 
      <li><a @click="_data.redirectPage('level', 'N5')">N5</a></li>
      <li><a @click="_data.redirectPage('level', 'N4')">N4</a></li>
      <li><a @click="_data.redirectPage('level', 'N3')">N3</a></li>
      <li><a @click="_data.redirectPage('level', 'N2')">N2</a></li>
      <li><a @click="_data.redirectPage('level', 'N1')">N1</a></li> -->
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'navBar',
  data() {
    return {}
  },
  methods: {},
  mounted() {}
}
</script>

<style></style>
