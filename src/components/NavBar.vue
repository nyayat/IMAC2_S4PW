<script setup lang="ts">
import * as Data from '@/ts/data'
</script>

<template id="nav-bar">
  <ul>
    <li style="border-left: 1cm"><span>Narai</span></li>
    <li><a @click="Data.redirectPage('level', 'N5')">N5</a></li>
    <li><a @click="Data.redirectPage('level', 'N4')">N4</a></li>
    <li><a @click="Data.redirectPage('level', 'N3')">N3</a></li>
    <li><a @click="Data.redirectPage('level', 'N2')">N2</a></li>
    <li><a @click="Data.redirectPage('level', 'N1')">N1</a></li>
  </ul>
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

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e7e7e7;
  background-color: #f3f3f3;

  position: fixed;
  top: 0;
  width: 100%;
}

li {
  float: left;
  font-size: 20px;
}

li > *:not(a) {
  display: block;
  color: #666;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a {
  display: block;
  color: #666;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover:not(.active) {
  background-color: #ddd;
}

li a.active {
  color: white;
  background-color: #04aa6d;
}
</style>
