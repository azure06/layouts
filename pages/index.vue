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
            v-for="index in nextSlotIndex"
            v-show="index < nextSlotIndex"
            :id="`rx-component-${index}`"
            :key="`rx-component-${index}`"
            class="rx-component"
            @mousedown.stop="onComponentClick(components[index - 1])"
          >
            <div class="pa-6">
              <input
                type="text"
                class="font-weight-bold display-4"
                style="outline: none; border: none;"
                value="RxCanvas"
              />
              <div
                type="text"
                class="subtitle-1 font-weight-bold px-2"
                style="letter-spacing: 0.15rem"
              >
                Relentless pursuit of perfection
              </div>
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
import { CanvasComponent } from '~/store/canvas/types';

export default Vue.extend({
  computed: {
    nextSlotIndex(): number {
      return this.components.length + 1;
    },
    sheetColor() {
      return this.$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3';
    },
    ...mapGetters('canvas', {
      tool: 'tool',
      getComponentById: 'componentById',
      components: 'components'
    })
  },
  mounted() {
    this.$nextTick(() => {
      // @ts-ignore
      this.createCanvas(this.$el.querySelector('#rx-canvas'));
      // @ts-ignore
      this.createSheet(this.$el.querySelector('#rx-sheet'));
      // @ts-ignore
      this.createComponent(
        this.$el.querySelector(`#rx-component-${this.nextSlotIndex}`)!
      );

      const sub = interval(1000 / 60)
        .pipe(
          tap(value => {
            const component: CanvasComponent = this.getComponentById(0);
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
      createComponent: 'CREATE_COMPONENT'
    }),
    onCanvasClick(): void {
      // @ts-ignore
      this.setFocus(null);
    },
    onComponentClick(component: CanvasComponent): void {
      // @ts-ignore
      this.setFocus(component.id);
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
  left: calc(50% - 300px);
  top: calc(25% - 240px);
}
</style>
