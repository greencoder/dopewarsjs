<template>
  <section id="gameOver" class="overlay">
    <div>
      <header>
        <span>Game Over</span>
      </header>
      <div class="inner">
        <p><strong>Final Cash: ${{ formattedNetWorth }}</strong></p>
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
    netWorth() {
      return this.$store.getters.netWorth;
    },
    formattedNetWorth() {
      return this.netWorth.toLocaleString('en-US');
    },
    message() {
      if (this.netWorth >= 10000000) {
        return 'You finished with over ten million dollars! Pablo Escobar would be proud.';
      }
      else if (this.netWorth >= 1000000) {
        return 'You retired as a millionaire in the Carribean.';
      }
      else if (this.netWorth >= 100000) {
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
