<template>
  <div class="home" v-if="locations.length">
    <gmap-map
              ref="mapRef"
              :center="center"
              :zoom="12"
              style="width:100%;  min-height: 400px; height: 100%">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
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
  async mounted () {
    await this.$store.dispatch('getLocations')
    this.getMarkers()
  },
  data () {
    return {
      markers: [],
      center: { lat: 45.508, lng: -73.587 },
      map: 'map'
    }
  },
  computed: {
    locations () {
      return this.$store.getters.getLocations
    },
    google: gmapApi // call google map api to be able to refer to google maps api,
  },
  methods: {
    getMarkers () {
      this.$refs.mapRef.$mapPromise.then(map => {
        let markerBounds = this.google && new google.maps.LatLngBounds()
        let cords
        this.locations.map(location => {
          cords = {
            lat: location.latitude,
            lng: location.longitude
          }
          this.markers.push({
            position: cords,
            title: location.country
          })
          markerBounds.extend(cords)
        })
        map.fitBounds(markerBounds)
      })
    }
  }

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
