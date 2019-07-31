<template>
  <div class="home" v-if="locations.length">
    <gmap-map
              ref="mapRef"
              :center="center"
              :zoom="12"
              style="width:100%;  min-height: 400px; height: 100%">
      <gmap-info-window class="w-100"
                        :opened="infoOpened"
                        :position="infoPosition"
                        :options="infoOptions"
                        @closeclick="infoOpened=false">
                          {{infoContent}}
      </gmap-info-window>
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="toggleInfo(m,index)"
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
      map: 'map',
      infoOptions: {
        width: 0,
        height: 0
      },
      infoPosition: {
        lat: 0,
        lng: 0
      },
      infoOpened: false,
      infoContent: ''
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
            name: location.name
          })
          markerBounds.extend(cords)
        })
        map.fitBounds(markerBounds)
      })
    },
    toggleInfo (location, index) {
      this.center = location.position
      this.infoPosition = location.position
      this.infoOpened = true
      this.infoContent = location.name
      this.infoOptions.pixelOffset = new google.maps.Size(0, -42)
    }
  }

}
</script>
<style>
  .gm-style .gm-style-iw {
    min-height:50px;
  }

  /*style the p tag*/
  .gm-style .gm-style-iw #google-popup p {
    padding: 10px;
  }
</style>
