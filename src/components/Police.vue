<template>
  <section id="police" class="overlay">
    <div>
      <header>
        <span>Police</span>
      </header>
      <div class="inner">
        <p v-html="message"></p>
        <div v-if="showRunFightButtons">
          <p>What do you want to do?</p>
          <button @click="handleRunButtonPress" class="full-width">Run</button>
          <button @click="handleFightButtonPress" class="full-width" :disabled="cannotFight">Fight</button>
        </div>
        <div v-else>
          <button @click="handleOkayButtonPress" class="full-width">Okay</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Police',
  data() {
    return {
      policeHealth: 100,
      gotAway: false,
      message: null
    }
  },
  mounted() {
    this.message = this.initialMessage;
  },
  computed: {
    health: function() {
      return this.$store.getters.health;
    },
    cannotFight: function() {
      return this.$store.getters.hasGun === false;
    },
    showRunFightButtons: function() {
      return this.policeHealth > 0 && this.health > 0 && this.gotAway === false;
    },
    initialMessage: function() {
      if (this.cannotFight) {
        return 'Officer hardass is after you! You don\'t have a gun, so your only choice is to run!';
      }
      else {
        return 'Officer hardass is after you!';
      }
    }
  },
  methods: {
    runFromPolice: function() {
      let result = Math.floor(Math.random() * 100) + 1

      // You have a 6% chance of losing your inventory when running
      if (result >= 94) {
        this.message = 'You got away but lost all your inventory.';
        this.handleLostInventory();
        this.gotAway = true;
      }

      // You have a 50% chance of getting away cleanly
      else if (result >= 50) {
        this.message = 'You managed to lose him in an alley.';
        this.gotAway = true;
      }

      // You didn't get away
      else {
        this.message = 'You tried to flee but he is still after you!';
      }
    },
    fightPolice: function() {
      // You have a 1 in 4 chance of killing the cop
      let killShot = Math.floor(Math.random() * 100) + 1 >= 75;

      if (killShot) {
        this.policeHealth = 0;
        this.message = 'You killed the cop and got away!';
      }

      // You have a 1/6 chance of getting wounded and a 1/25 of getting killed
      else {
        let result = Math.floor(Math.random() * 100) + 1;

        if (result >= 96) {
          this.handleWounded(100);
          this.message = 'You have been killed!';
        }
        else if (result >= 83) {
          this.handleWounded(25);
          this.message = `You have been wounded! Your health is ${this.health}%.`;
        }
        else {
          this.policeHealth -= 25;
          this.message = 'You wounded the cop but he\'s still after you!';
        }
      }
    },
    handleLostInventory: function() {
      this.$manager.resetInventory();
    },
    handleWounded: function(amount) {
      this.$store.commit('reduceHealth', amount);
    },
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    },
    handleOkayButtonPress: function() {
      if (this.health === 0) {
        this.$manager.finishGame();
      }
      else {
        this.$store.dispatch('hideOverlay');
      }
    },
    handleRunButtonPress: function() {
      this.runFromPolice();
    },
    handleFightButtonPress: function() {
      this.fightPolice();
    }
  }
}
</script>

<style scoped>
</style>
