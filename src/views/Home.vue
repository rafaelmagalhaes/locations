<template>
  <div class="home">
    <div v-for="(location,index) in locations" :key="index">
      <a>{{location.name}}</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { gmapApi } from 'vue2-google-maps'

export default {
  name: 'home',
  mounted () {
    this.$store.dispatch('getLocations')
  },
  computed: {
    locations () {
      return this.$store.getters.getLocations
    },
    google: gmapApi // call google map api to be able to refer to google maps api,
  },
  methods: {}

}
</script>
<style>
  .gm-style .gm-style-iw {
    width: 100% !important;
    height: 100% !important;
    min-height: 200px;

  }

  /*style the p tag*/
  .gm-style .gm-style-iw #google-popup p {
    padding: 10px;
  }
</style>
