<template>
  <!-- First card as wrapper  -->
  <v-card flat tile width="100%" height="100%">
    <v-card id="rx-canvas" class="mx-auto" flat tile width="100%" height="100%">
      <v-row justify="center" class="py-4">
        <v-card id="rx-sheet" :color="sheetColor" flat tile>
          <div v-show="show" id="rx-component" class="frame">
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
import { mapGetters, mapMutations } from 'vuex';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RxHandler, RxComponent } from '~/rx-component/src/main';

export default Vue.extend({
  data: (): { show: boolean } => ({
    show: false
  }),
  computed: {
    ...mapGetters('canvas', {
      tool: 'tool'
    }),
    ...mapGetters('canvas', {
      getComponentById: 'componentById'
    }),
    sheetColor() {
      return this.$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3';
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.createCanvas(this.$el.querySelector('#rx-canvas'));
      this.createSheet(this.$el.querySelector('#rx-sheet'));
      this.createComponent(this.$el.querySelector('#rx-component')!);

      this.show = true;

      const sub = interval(1000 / 60)
        .pipe(
          tap(value => {
            const [rxComponent, rxHandler]: [
              RxComponent,
              RxHandler
            ] = this.getComponentById(0).handlers;
            const percent = value / 120;
            const k = Math.sin((Math.PI / 2) * percent);
            rxComponent.scale([k, k]);
            if (value >= 120) {
              sub.unsubscribe();
              rxHandler.updateOptions({
                draggable: true,
                interactive: true
              });

              rxComponent.setFocus(true);
            }
          })
        )
        .subscribe();
    });
  },
  methods: {
    ...mapMutations('canvas', {
      createCanvas: 'CREATE_CANVAS'
    }),
    ...mapMutations('canvas', {
      createSheet: 'CREATE_SHEET'
    }),
    ...mapMutations('canvas', {
      createComponent: 'CREATE_COMPONENT'
    })
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
#rx-component {
  animation-name: animation;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  left: calc(50% - 300px);
  top: calc(50% - 240px);
}
</style>
