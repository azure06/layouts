<template>
  <!-- First card as wrapper  -->
  <v-card flat tile width="100%" height="100%">
    <v-card
      id="rx-canvas"
      class="mx-auto"
      flat
      tile
      width="100%"
      height="100%"
      :ripple="false"
    >
      <v-row justify="center" class="py-4" @mousedown="onCanvasClick">
        <v-card id="rx-sheet" :color="sheetColor" flat tile>
          <div
            v-for="(component, index) in components"
            v-show="index < components.length - 1"
            :id="`rx-component-${component.id}`"
            :key="`rx-component-${component.id}`"
            class="rx-component"
            @mousedown.stop="onComponentClick(component.id)"
          >
            <div v-if="index < components.length - 1" class="pa-2 fill-height">
              <textarea
                type="text"
                :style="
                  `outline: none; border: none; resize: none; width: 100%; height: 100%; color:${component.style.fontColor}; font-style:${component.style.fontStyle};` +
                    `font-weight:${component.style.fontWeight}; font-size:${component.style.fontSize}px; text-decoration:${component.style.textDecoration}; `
                "
                placeholder="Click to add text"
                :value="component.subtitle"
                @input="
                  event =>
                    changeComponentTitle({
                      subtitle: event.target.value,
                      id: component.id
                    })
                "
              />
            </div>
          </div>
        </v-card>
      </v-row>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { getNextEl, setCanvasEl } from '@/utils/vue';
import { CanvasComponent } from '~/store/canvas/types';

export default Vue.extend({
  computed: {
    sheetColor() {
      return this.$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3';
    },
    nextId(): string {
      const indexLast = this.components.length - 1;
      return this.components[indexLast].id;
    },
    ...mapGetters('canvas', {
      tool: 'tool',
      components: 'componentsPlusNext'
    })
  },
  mounted() {
    this.$nextTick(() => {
      setCanvasEl(this.$el.querySelector('#rx-canvas') as HTMLElement);

      // @ts-ignore
      this.createCanvas(this.$el.querySelector('#rx-canvas'));
      // @ts-ignore
      this.createSheet(this.$el.querySelector('#rx-sheet'));
      // @ts-ignore
      this.createComponent({
        id: this.nextId,
        target: getNextEl(this.nextId as string)
      });

      const sub = interval(1000 / 60)
        .pipe(
          tap(value => {
            const [component]: CanvasComponent[] = this.components;
            const [rxComponent, rxHandler] = component.handlers;
            const percent = value / 120;
            const k = Math.sin((Math.PI / 2) * percent);
            rxComponent.scale([k, k]);
            if (value >= 120) {
              sub.unsubscribe();
              rxHandler.updateOptions({
                draggable: true
              });
              // @ts-ignore
              this.setFocus(component.id);
            }
          })
        )
        .subscribe();
    });
  },
  methods: {
    ...mapActions('canvas', ['setFocus']),
    ...mapMutations('canvas', {
      createCanvas: 'CREATE_CANVAS',
      createSheet: 'CREATE_SHEET',
      createComponent: 'CREATE_COMPONENT',
      changeComponentTitle: 'UPDATE_COMPONENT'
    }),
    onCanvasClick(): void {
      // @ts-ignore
      this.setFocus(null);
    },
    onComponentClick(id: string): void {
      // @ts-ignore
      this.setFocus(id);
    }
  }
});
</script>

<style lang="scss" scoped>
@keyframes animation {
  0% {
  }
  100% {
  }
}
.rx-component {
  animation-name: animation;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  position: relative;
  left: calc(50% - 80px);
  top: calc(25% - 40px);
}
</style>
