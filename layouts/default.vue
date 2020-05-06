<template>
  <v-app class="app">
    <!-- Header -->
    <app-bar
      :tool="toolToIndex"
      :zoom="zoom"
      @tool-change="value => changeTool(indexToTool(value))"
      @change-theme="value => ($vuetify.theme.dark = value === 0)"
      @zoom-change="changeZoom"
    />

    <!-- Left Drawer -->
    <v-navigation-drawer v-model="drawer" mini-variant permanent app>
      <v-list class="pa-0">
        <v-list-item class="px-2 ma-0">
          <v-list-item-icon>
            <v-icon large>mdi-language-haskell</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Content -->
    <v-content>
      <v-divider />
      <v-container class="fill-height pa-0" fluid>
        <!-- Right Drawer -->
        <drawer />
        <nuxt />
      </v-container>
    </v-content>

    <!-- Footer -->
    <app-footer />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Tool, RxHandlers } from '../store/canvas/types';
import appFooter from '@/components/appfooter.vue';
import drawer from '@/components/drawer.vue';
import appBar from '@/components/appbar.vue';

export default Vue.extend({
  components: {
    appBar,
    drawer,
    appFooter
  },
  data(): { tool?: number; drawer: boolean; zoom: number } {
    return {
      drawer: true,
      zoom: 0
    };
  },
  computed: {
    ...mapGetters('canvas', {
      tool: 'tool',
      sheet: 'sheet'
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
    ...mapActions('canvas', {
      changeTool: 'changeTool'
    }),
    indexToTool(toolIndex: number): Tool {
      switch (toolIndex) {
        case 0:
          return 'zoom';
        case 1:
          return 'warp';
        case 2:
          return 'resize';
        case 3:
          return 'scale';
        default:
          return 'none';
      }
    },
    changeZoom(value: number) {
      this.zoom = value;
      const sheet: RxHandlers | undefined = this.sheet;
      if (sheet) {
        const k = (value + 50) / 50 || 0.01;
        console.warn(k);
        sheet[0].scale([k, k]);
        this.zoom = value;
      } else {
        this.zoom = 0;
      }
    }
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
