<template>
  <div>
    <v-app class="app red">
      <Header />
      <v-content>
        <v-container class="fill-height">
          <nuxt />
        </v-container>
      </v-content>
      <Footer />
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default Vue.extend({
  components: {
    Header,
    Footer
  },
  computed: {},
  created() {},
  methods: {}
});
</script>
<style lang="scss" scoped>
.app {
  background-color: inherit;
}
.container {
  max-width: 1440px;
}
</style>
