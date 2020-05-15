<template>
  <v-app class="app">
    <!-- Header -->
    <app-bar
      :tool="tool"
      :formats="formats"
      :zoom="zoom"
      @tool-change="changeTool"
      @theme-change="value => ($vuetify.theme.dark = value === 0)"
      @format-change="style => changeStyle({ id: focus, style })"
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
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { RxHandlers } from '../store/canvas/types';
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
      componentById: 'componentById',
      focus: 'focus',
      tool: 'tool',
      sheet: 'sheet'
    }),
    formats(): any | undefined {
      const value = this.componentById(this.focus);
      return value ? value.style : value;
    }
  },
  methods: {
    ...mapActions('canvas', {
      changeTool: 'changeTool'
    }),
    ...mapMutations('canvas', {
      changeStyle: 'UPDATE_COMPONENT_STYLE'
    }),
    changeZoom(value: number) {
      this.zoom = value;
      const sheet: RxHandlers | undefined = this.sheet;
      if (sheet) {
        const k = (value + 50) / 50 || 0.01;
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
