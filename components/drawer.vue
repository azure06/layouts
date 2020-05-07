<template>
  <v-navigation-drawer app permanent right clipped width="320">
    <template v-slot:prepend>
      <v-divider />
      <v-row>
        <v-col class="d-flex justify-center">
          <v-color-picker
            v-model="color"
            show-swatches
            swatches-max-height="75"
          ></v-color-picker>
        </v-col>
        <v-col class="d-flex justify-center">
          <v-btn-toggle v-model="toggle" dense mandatory>
            <v-btn v-for="t in types" :key="t" @click="type = t">{{ t }}</v-btn>
          </v-btn-toggle>
        </v-col>
      </v-row>
    </template>

    <v-divider></v-divider>

    <div class="d-flex flex-column fill-height">
      <v-list two-line dense class="wrapper">
        <v-list-item-group v-model="selected">
          <template v-for="(component, index) in components">
            <v-list-item :key="component.id">
              <template v-slot:default="{ active }">
                <v-list-item-content class="px-2">
                  <v-list-item-title>{{ component.title }}</v-list-item-title>
                  <v-list-item-subtitle v-text="component.subtitle" />
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn
                    :color="active ? 'grey lighten-1' : ''"
                    icon
                    @click="removeComponent(component.id)"
                  >
                    <v-icon>mdi-close </v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
            <v-divider
              v-if="index + 1 < components.length"
              :key="`divider-${component.id}`"
            ></v-divider>
          </template>
        </v-list-item-group>
      </v-list>

      <div class="d-flex flex-column btn-group">
        <v-divider />
        <div class="px-4 pb-2 pt-1 align-self-end">
          <v-btn-toggle dense>
            <v-btn x-small @click="addComponent({ id: nextId, target: nextEl })"
              ><v-icon x-small>mdi-plus</v-icon></v-btn
            >
            <v-btn x-small><v-icon x-small>mdi-minus</v-icon></v-btn>
          </v-btn-toggle>
        </div>
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { getNextEl } from '@/utils/vue';

interface Data {
  types: ['hexa', 'rgba', 'hsla'];
  type: 'hex' | 'hexa' | 'rgba' | 'hsla' | 'hsva';
  hex: string;
  hexa: string;
  rgba: { r: number; g: number; b: number; a: number };
  hsla: { h: number; s: number; l: number; a: number };
  hsva: { h: number; s: number; v: number; a: number };
  toggle: number;
}

export default Vue.extend({
  data: (): Data => ({
    types: ['hexa', 'rgba', 'hsla'],
    type: 'hexa',
    hex: '#FF00FF',
    hexa: '#FF00FFFF',
    rgba: { r: 255, g: 0, b: 255, a: 1 },
    hsla: { h: 300, s: 1, l: 0.5, a: 1 },
    hsva: { h: 300, s: 1, v: 1, a: 1 },
    toggle: 0
  }),
  computed: {
    ...mapGetters('canvas', {
      components: 'components',
      componentsPlusNext: 'componentsPlusNext',
      focus: 'focus'
    }),
    nextEl() {
      return getNextEl(this.nextId as string);
    },
    nextId() {
      const indexLast = this.componentsPlusNext.length - 1;
      return this.componentsPlusNext[indexLast].id;
    },
    color: {
      get() {
        return this[this.type];
      },
      set(value: any) {
        this[this.type] = value;
      }
    },
    selected: {
      get() {
        return this.components.findIndex(
          (component: any) => component.id === this.focus
        );
      },
      set(index: number) {
        this.setFocus(index !== undefined ? this.components[index].id : null);
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
  },
  methods: {
    ...mapActions('canvas', ['setFocus', 'removeComponent']),
    ...mapMutations('canvas', {
      addComponent: 'CREATE_COMPONENT'
    })
  }
});
</script>

<style lang="scss" scoped>
.wrapper {
  padding-bottom: 37px;
}
.btn-group {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
