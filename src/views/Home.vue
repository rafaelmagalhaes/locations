<template>
  <div class="container" v-if="locations.length">
    <gmap-map
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      style="width:100%;  min-height: 400px; height: 100%">
      <gmap-info-window class="w-100"
                        :opened="infoOpened"
                        :position="infoPosition"
                        :options="infoOptions"
                        @closeclick="closeInfo">
        {{infoContent}}
      </gmap-info-window>
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        @click="openInfo(m,index)"
      ></gmap-marker>
    </gmap-map>
    <input type="text" class="form-control mb-4 mt-4" v-model="search" placeholder="Search by country name"/>
    <country-list @clicked="openInfo" :countries="filteredLocations" />
  </div>
</template>

<script>
// @ is an alias to /src
import { gmapApi } from 'vue2-google-maps'
import CountryList from '@/components/list'
export default {
  name: 'home',
  components: { CountryList },
  async mounted () {
    await this.$store.dispatch('getLocations') // fetch the locations endpoint from the vuex store
    this.getMarkers() // call this functions after locations has been dispatched
  },
  data () {
    return {
      markers: [],
      search: '',
      zoom: 12,
      center: { lat: 45.508, lng: -73.587 },
      map: 'map',
      infoOptions: {
        pixelOffset: { // offset infowindow so it visually sits nicely on top of our marker
          width: 0,
          height: -35
        }
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
      return this.$store.getters.getLocations // get the location state from vuex
    },
    filteredLocations () { // search for location
      return this.locations.filter(location => {
        return location.name.toLowerCase().includes(this.search.toLowerCase()) // check if search query matches any country name
      })
    },
    google: gmapApi // call google map api to be able to refer to google maps api,
  },
  methods: {
    getMarkers () {
      this.$refs.mapRef.$mapPromise.then(map => { // access the map
        let markerBounds = this.google && new google.maps.LatLngBounds()
        let cords // create cordinates empty variable
        this.locations.map(location => { // loop over the locations from the state
          cords = {
            lat: location.latitude,
            lng: location.longitude
          } // assign lat and lng from the values to cords variable

          this.markers.push({ // push all cord to the markers array
            position: cords,
            name: location.name // set the name so we can access it in the infoWindow
          })
          markerBounds.extend(cords)
        })
        map.fitBounds(markerBounds) // center the map based of the markers
      })
    },
    openInfo (location, index) {
      if (!location.position) { // if theres not position set the position
        location.position = {
          lat: location.latitude,
          lng: location.longitude
        }
      }
      this.center = location.position // center the map around the location object
      this.infoPosition = location.position // set the position for the info window
      this.$refs.mapRef.$mapPromise.then(map => { // access the map and set zoom to 5 and pan to location
        map.panTo(location.position)
        map.setZoom(5)
      })
      this.infoOpened = true // opne the infowindow
      this.infoContent = location.name // set the content to the country name
    },
    closeInfo () {
      this.infoOpened = false // close the infowindow
      this.$refs.mapRef.$mapPromise.then(map => { // access map and return to center  and zoom out of location
        map.panTo(this.center)
        map.setZoom(2)
      })
    }
  }

}
</script>
<style>
  .gm-style .gm-style-iw {
    min-height: 50px;
  }
  /*style the p tag*/
  .gm-style .gm-style-iw #google-popup p {
    padding: 10px;
  }
</style>
