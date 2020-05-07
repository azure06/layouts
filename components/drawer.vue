<template>
  <v-navigation-drawer app permanent right clipped width="320">
    <template v-slot:prepend>
      <v-divider />
      <v-row>
        <v-col cols="12" md="4">
          <v-btn
            v-for="t in types"
            :key="t"
            class="my-4"
            block
            @click="type = t"
            >{{ t }}</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-center">
          <v-color-picker v-model="color"></v-color-picker>
        </v-col>
        <v-col cols="12" md="4">
          <v-sheet dark class="pa-4">
            <pre>{{ showColor }}</pre>
          </v-sheet>
        </v-col>
      </v-row>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <!-- <v-list-item v-for="item in items" :key="item.title">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'];
  type: 'hex' | 'hexa' | 'rgba' | 'hsla' | 'hsva';
  hex: string;
  hexa: string;
  rgba: { r: number; g: number; b: number; a: number };
  hsla: { h: number; s: number; l: number; a: number };
  hsva: { h: number; s: number; v: number; a: number };
}

export default Vue.extend({
  data: (): Data => ({
    types: ['hex', 'hexa', 'rgba', 'hsla', 'hsva'],
    type: 'hex',
    hex: '#FF00FF',
    hexa: '#FF00FFFF',
    rgba: { r: 255, g: 0, b: 255, a: 1 },
    hsla: { h: 300, s: 1, l: 0.5, a: 1 },
    hsva: { h: 300, s: 1, v: 1, a: 1 }
  }),
  computed: {
    color: {
      get() {
        return this[this.type];
      },
      set(value: any) {
        this[this.type] = value;
      }
    },
    showColor() {
      return null;
      // if (typeof this.color === 'string') return this.color;
      // return JSON.stringify(
      //   Object.keys(this.color).reduce((color, key) => {
      //     color[key] = Number(this.color[key].toFixed(2));
      //     return color;
      //   }, {}),
      //   null,
      //   2
      // );
    }
  }
});
</script>

<style lang="scss" scoped></style>
