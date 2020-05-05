<template>
  <v-app-bar app>
    <v-row justify="start">
      <v-col cols="12">
        <v-btn-toggle
          :value="tool"
          dense
          @change="value => $emit('tool-change', value)"
        >
          <v-btn>
            <v-icon>mdi-image-size-select-large</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-vector-polygon</v-icon>
          </v-btn>
          <v-btn>
            <v-icon>mdi-arrow-top-right-bottom-left</v-icon>
          </v-btn>
        </v-btn-toggle>
        <v-btn-toggle v-show="false" class="mx-2" :value="toggle" dense>
          <v-btn>
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-color-fill</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
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
import Vue from 'vue';

export default Vue.extend({
  props: {
    tool: {
      default: -1,
      type: Number
    }
  },
  data() {
    return {
      toggle: 0
    };
  },
  computed: {}
});
</script>

<style lang="scss" scoped></style>
