<template>
  <section id="gameOver" class="overlay">
    <div>
      <header>
        <span>Game Over</span>
      </header>
      <div class="inner">
        <p><strong>Final Cash: ${{ netWorth }}</strong></p>
        <p>{{ message }}</p>
        <button @click="handleNewGameButtonPress" class="full-width">Start New Game</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Tailor',
  computed: {
    netWorth: function() {
      return this.$store.getters.netWorth;
    },
    message: function() {
      if (this.netWorth >= 1000000) {
        return 'You retired a millionaire in the Carribean.';
      }
      else if (this.netWorth >= 250000) {
        return 'You have a promising future as a narco.';
      }
      else {
        return 'Better luck next time.';
      }
    }
  },
  methods: {
    handleNewGameButtonPress: function() {
      this.$manager.restartGame();
    }
  }
}
</script>

<style scoped>
</style>
