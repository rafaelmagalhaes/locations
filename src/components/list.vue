<template>
  <div>
    <div class="row" v-if="countries.length">
      <div class="col-4 mb-5" v-for="(location,index) in countries" :key="index">
        <a href="" class="btn btn-outline-primary" @click.prevent="getLocation(location,index)">{{location.name}}</a>
      </div>
    </div>
    <div class="row mb-4" v-else><div class="col">No results found</div></div>
  </div>
</template>

<script>
export default {
  props: {
    countries: { type: Array, required: true }
  },
  methods: {
    getLocation (location, index) {
      this.$emit('clicked', location, index)
    }
  }
}
</script>
<style scoped>
  .btn{
    border-radius: 20px;
    width: 100%;
  }
</style>
