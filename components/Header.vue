<template>
  <v-card flat tile class="header">
    <v-row align="center">
      <v-col cols="12" sm="10">
        <v-card-text class="font-weight-bold px-8">
          RxCanvas
        </v-card-text>
      </v-col>
      <v-col cols="12" sm="2"> </v-col>
    </v-row>
    <v-row>
      <v-tabs v-model="tab" height="75" grow dark show-arrows>
        <v-tab v-for="tabItem in tabs" :key="tabItem.title" :to="tabItem.to">
          {{ tabItem.title }}
        </v-tab>
      </v-tabs>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      tab: null
    };
  },
  computed: {
    tabs() {
      return [
        {
          title: 'ホーム',
          to: '/'
        }
      ];
    }
  }
});
</script>

<style lang="scss" scoped>
.header {
  .private {
    opacity: 0.5;
    color: #555;
  }
}
</style>
