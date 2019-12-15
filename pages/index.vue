<template>
  <v-row class="home">
    <div id="rx-component">
      <input
        type="text"
        style="width: calc(100%); height: 100%; outline: none; border: none; padding: 0 10px;"
        value="hello"
      />
    </div>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { RxComponent, RxHandler } from '../rx-component/src/main';

export default Vue.extend({
  components: {},
  computed: {},
  mounted() {
    const rxComponent = new RxComponent(
      // tslint:disable-next-line:no-non-null-assertion
      this.$el.querySelector('#rx-component')! as HTMLElement,
      {
        width: '250px',
        height: '50px',
        left: '500px'
      }
    );

    const rxHandler = new RxHandler(rxComponent, {
      draggable: true,
      rotable: true,
      warpable: true,
      interactive: true
    })
      .onFocus(() => {
        rxHandler.updateOptions({ interactive: true });
        rxComponent.updateStyle({
          backgroundColor: 'rgba(242,242,245,09)'
        });
        // subscription = interval(1000 / 60)
        //   .pipe(
        //     tap(times => {
        //       const calcDistance = (time: number, delta = 15) =>
        //         (1 / 2) * 9.81 * (time * time) * delta;
        //       rxComponent.updateStyle({
        //         top: `${+rxComponent.target.style.top!.slice(0, -2) -
        //           calcDistance(times / 60) +
        //           calcDistance((times + 1) / 60)}px`,
        //       });
        //     })
        //   )
        //   .subscribe();
      })
      .onBlur(() => {
        rxHandler.updateOptions({ interactive: false });
        rxComponent.updateStyle({
          backgroundColor: 'inherit'
        });
        // subscription.unsubscribe();
      });
  }
});
</script>

<style lang="scss" scoped></style>
