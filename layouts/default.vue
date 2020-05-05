<template>
  <v-app class="app">
    <Header :tool="toolToIndex" @tool-change="changeTool" />
    <v-navigation-drawer
      v-model="drawer"
      mini-variant
      permanent
      app
      color="grey darken-4"
    >
      <v-list class="pa-0">
        <v-list-item class="px-2 ma-0">
          <v-list-item-icon>
            <v-icon large>mdi-language-haskell</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container class="fill-height pa-0" fluid>
        <nuxt />
      </v-container>
    </v-content>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import { Tool } from '../store/canvas/types';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default Vue.extend({
  components: {
    Header,
    Footer
  },
  data(): { tool?: number; drawer: boolean } {
    return {
      drawer: true
    };
  },
  computed: {
    ...mapGetters('canvas', {
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      tool: 'tool'
    }),
    toolToIndex() {
      switch (this.tool as Tool) {
        case 'scale':
          return 0;
        case 'warp':
          return 1;
        case 'resize':
          return 2;
        default:
          return -1;
      }
    }
  },
  methods: {
    ...mapMutations('canvas', {
      changeTool: 'CHANGE_TOOL'
    })
  }
});
</script>
<style lang="scss" scoped>
@keyframes animation {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.app {
  animation-name: animation;
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}
</style>
