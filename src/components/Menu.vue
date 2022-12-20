<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Game Menu</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <div class="inner">
        <p>Do you want to start a new game?</p>
        <button @click='handleRestartPress' class="full-width">Restart Game</button>
        <button @click='handlePricesButtonPress' class="full-width">Price List</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Menu',
  emits: [
    'restart-game',
    'show-overlay'
  ],
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    },
    handlePricesButtonPress: function() {
      this.$store.dispatch('showOverlay', 'prices');
    },
    handleRestartPress: function() {
      if (confirm('Are you sure you want to start a new game?')) {
        this.$manager.restartGame();
      }
    }
  }
}
</script>

<style scoped>
</style>
