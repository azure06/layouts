<template>
  <v-app-bar app clipped-right elevate-on-scroll>
    <v-row justify="start">
      <v-col cols="12">
        <v-btn-toggle v-model="toolMapper" dense>
          <v-btn>
            <v-icon>mdi-hand-right</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-vector-polygon</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-arrow-top-right-bottom-left</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle
          v-show="!$vuetify.breakpoint.smAndDown"
          v-model="formatMapper"
          class="mx-2"
          multiple
          dense
        >
          <v-btn :disabled="!formats">
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn :disabled="!formats">
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn :disabled="!formats">
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn :disabled="!formats">
            <v-icon>mdi-format-color-fill</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row v-show="$vuetify.breakpoint.mdAndUp" justify="end" align="center">
      <div class="messages">
        <v-slider
          append-icon="mdi-magnify-plus-outline"
          prepend-icon="mdi-magnify-minus-outline"
          label="Zoom"
          dense
          min="-50"
          max="50"
          :value="zoom"
          @input="value => $emit('zoom-change', value)"
          @click:append="$emit('zoom-change', zoom + 5 < 50 ? zoom + 5 : 50)"
          @click:prepend="$emit('zoom-change', zoom - 5 > -50 ? zoom - 5 : -50)"
        ></v-slider>
      </div>
      <v-btn-toggle
        class="mx-4"
        dense
        :value="theme"
        @change="value => $emit('theme-change', value)"
      >
        <v-btn>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-row>
    <v-menu left bottom>
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="n in 5" :key="n" @click="() => {}">
          <v-list-item-title>Option {{ n }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue';
import { CanvasComponent, Tool } from '@/store/canvas/types';

type T = Pick<CanvasComponent, 'style'>['style'];
type Styling = { [P in keyof T]: T[P] };

export default Vue.extend({
  props: {
    tool: {
      default: 'none',
      type: String as PropType<Tool>
    },
    zoom: {
      default: 0,
      type: Number
    },
    formats: {
      default: undefined,
      type: Object as PropType<Styling | undefined>
    }
  },
  computed: {
    theme() {
      switch ((this as any).$vuetify.theme.dark) {
        case true:
          return 0;
        default:
          return undefined;
      }
    },
    toolMapper: {
      get(): number {
        const tool: Tool = (this as any).tool;
        switch (tool) {
          case 'scale':
            return 0;
          case 'warp':
            return 1;
          case 'resize':
            return 2;
          default:
            return -1;
        }
      },
      set(toolIndex: number) {
        const value = (() => {
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
        })();
        this.$emit('tool-change', value);
      }
    },
    formatMapper: {
      get(): number[] {
        const formats: Styling | undefined = (this as any).formats;
        const array: number[] = [];
        if (formats) {
          if (formats.fontWeight > 400) array.push(0);
          if (formats.fontStyle === 'italic') array.push(1);
          if (formats.textDecoration === 'underline') array.push(2);
        }
        return array;
      },
      set(values: number[]) {
        const formats: Styling | undefined = (this as any).formats;
        const valuesObj = values.reduce((acc, value) => {
          acc[value] = true;
          return acc;
        }, {} as { [num: number]: boolean });
        if (formats) {
          this.$emit('format-change', {
            ...formats,
            fontWeight: valuesObj[0] ? '700' : '400',
            fontStyle: valuesObj[1] ? 'italic' : 'normal',
            textDecoration: valuesObj[2] ? 'underline' : 'none'
          });
        }
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.messages {
  width: 260px;
}
.messages ::v-deep .v-messages {
  min-height: 0px;
}
</style>
