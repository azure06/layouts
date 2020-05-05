/* eslint-disable no-unused-vars */
<template>
  <v-card class="mx-auto" flat tile width="100%" height="100%">
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
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { Tool } from 'store/canvas/types';
import { interval } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RxComponent, RxHandler } from '../rx-component/src/main';

export default Vue.extend({
  data(): { rxComponents: Array<[RxComponent, RxHandler]>; show: boolean } {
    return {
      rxComponents: [],
      show: false
    };
  },
  computed: {
    ...mapGetters('canvas', {
      // map `this.doneCount` to `this.$store.getters.doneTodosCount`
      tool: 'tool'
    })
  },
  watch: {
    tool(tool: Tool) {
      this.changeMode(tool);
    }
  },
  mounted() {
    this.rxComponents = [
      this.createComponent(
        this.$el.querySelector('#rx-component')! as HTMLElement
      )
    ];

    this.show = true;

    const sub = interval(1000 / 60)
      .pipe(
        tap(value => {
          const [[rxComponent, rxHandler]] = this.rxComponents;
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
  },
  methods: {
    changeMode(tool: Tool) {
      const [[_, rxHandler]] = this.rxComponents;
      console.log(_);
      switch (tool) {
        case 'scale':
          rxHandler.updateOptions({ scalable: true });
          break;
        case 'warp':
          rxHandler.updateOptions({ warpable: true });
          break;
        case 'resize':
          rxHandler.updateOptions({ resizable: true });
          break;
        default:
          rxHandler.updateOptions({ scalable: false });
      }
    },
    createComponent(target: HTMLElement): [RxComponent, RxHandler] {
      const rxComponent = new RxComponent(target, {
        width: '600px',
        height: '240px'
      });
      const rxHandler = new RxHandler(rxComponent, {
        draggable: false,
        rotable: false,
        scalable: false,
        interactive: false
      })
        .onFocus(() => {
          rxComponent.setFocus(true);
        })
        .onBlur(() => {
          rxComponent.setFocus(true);
          // rxHandler.updateOptions({ interactive: false });
        });
      return [rxComponent, rxHandler];
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
#rx-component {
  animation-name: animation;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
  left: calc(50% - 300px);
  top: calc(50% - 240px);
}
</style>
