<template>
  <section id="tailor" class="overlay">
    <div>
      <header>
        <span>Tailor</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <div class="inner">
        <p>Want to store more drugs in your coat?</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Tailor',
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    }
  }
}
</script>

<style scoped>
</style>
