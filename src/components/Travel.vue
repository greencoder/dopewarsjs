<template>
  <section id="travel" class="overlay">
    <div>
      <header>
        <span>Travel</span>
        <img src="@/assets/images/close.svg" @click="hideOverlay" />
      </header>
      <nav>
        <p>Where do you want to go?</p>
        <button v-bind:disabled="currentLocation === 'Queens'" class="full-width">Queens</button>
        <button v-bind:disabled="currentLocation === 'Statin Island'" class="full-width">Statin Island</button>
        <button v-bind:disabled="currentLocation === 'The Bronx'" class="full-width">The Bronx</button>
        <button v-bind:disabled="currentLocation === 'Manhattan'" class="full-width">Manhattan</button>
        <button v-bind:disabled="currentLocation === 'Brooklyn'" class="full-width">Brooklyn</button>
      </nav>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Travel',
  props: [
    'hideOverlay',
    'currentLocation',
  ]
}
</script>

<style scoped>
</style>