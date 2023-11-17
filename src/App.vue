<script setup>
import { ref, watch, reactive, computed } from 'vue';

import AppHeader from "@/components/AppHeader.vue";
import AppFooter from '@/components/AppFooter.vue';
</script>


<template>
  <div id="app">
    <AppHeader />

    <a-row>
      <a-col offset="2" span="20">
        <router-view />
      </a-col>
    </a-row>

    <AppFooter />
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
