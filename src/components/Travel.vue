<template>
  <section id="travel" class="overlay">
    <header>
      <span>Travel</span>
      <img src="@/assets/images/close.svg" @click="hideOverlay" />
    </header>
    <div class="inner">
      <p>Where do you want to go?</p>
      <button @click="handleTravelClick('Queens')" v-bind:disabled="location === 'Queens'" class="full-width">Queens</button>
      <button @click="handleTravelClick('Staten Island')" v-bind:disabled="location === 'Staten Island'" class="full-width">Staten Island</button>
      <button @click="handleTravelClick('The Bronx')" v-bind:disabled="location === 'The Bronx'" class="full-width">The Bronx</button>
      <button @click="handleTravelClick('Manhattan')" v-bind:disabled="location === 'Manhattan'" class="full-width">Manhattan</button>
      <button @click="handleTravelClick('Brooklyn')" v-bind:disabled="location === 'Brooklyn'" class="full-width">Brooklyn</button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Travel',
  props: [
    'hideOverlay',
    'location',
    'travel',
  ],
  methods: {
    handleTravelClick: function(location) {
      this.travel(location);
    }
  }
}
</script>

<style scoped>

</style>