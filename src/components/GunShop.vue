<template>
  <section id="guns" class="overlay">
    <div>
      <header>
        <span>Gun Shop</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <div class="inner">
        <p>Buy a gun to protect yourself from the cops.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Guns',
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    }
  }
}
</script>

<style scoped>
</style>
