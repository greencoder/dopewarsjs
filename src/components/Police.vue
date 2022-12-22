<template>
  <section id="police" class="overlay">
    <div>
      <header>
        <span>Police</span>
      </header>
      <div class="inner">
        <p v-html="message"></p>
      </div>
      <footer>
        <div v-if="showRunFightButtons">
          <button @click="handleRunButtonPress" class="full-width">Run</button>
          <button @click="handleFightButtonPress" class="full-width" :disabled="cannotFight">Fight</button>
        </div>
        <div v-else>
          <button @click="handleOkayButtonPress" class="full-width">Okay</button>
        </div>
      </footer>
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
    handleLostInventory: function() {
      this.$manager.resetInventory();
    },
    handleDamage: function(amount) {
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
      let { message, lostInventory, gotAway } = this.$manager.runFromPolice();

      this.message = message;
      this.gotAway = gotAway;

      if (lostInventory) {
        this.handleLostInventory();
      }
    },
    handleFightButtonPress: function() {
      let { damage, policeDamage, message } = this.$manager.fightPolice();

      this.handleDamage(damage);
      this.policeHealth -= policeDamage;
      this.message = message;
    }
  }
}
</script>
