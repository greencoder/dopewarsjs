<template>
  <section id="travel" class="overlay">
    <header>
      <span>Travel</span>
      <img src="@/assets/images/close.svg" @click="handleCloseOverlayPress" />
    </header>
    <div class="inner">
      <p>Where do you want to go?</p>
      <button v-for="location in locations"
              v-bind:key="location.name"
              v-on:click="handleTravelPress(location)"
              v-bind:disabled="isCurrentLocation(location)"
              class="full-width">{{ location.name }}</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Travel',
  computed: {
    locations() {
      return this.$store.getters.locations;
    },
    currentLocation() {
      return this.$store.getters.currentLocation;
    }
  },
  methods: {
    isCurrentLocation: function(location) {
      return location.name === this.currentLocation.name;
    },
    handleCloseOverlayPress: function() {
      this.$store.dispatch('hideOverlay');
    },
    handleTravelPress: function(location) {
      this.$manager.travel(location);
    }
  }
}
</script>

<style scoped>

</style>
