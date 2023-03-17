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
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    },
    handleOkayButtonPress: function() {
      if (this.health === 0) {
        this.$manager.finishGame();
      }
      else {
        this.gotAway = false;
        this.$store.dispatch('hideOverlay');
      }
    },
    handleRunButtonPress: function() {
      let { lostInventory, gotAway } = this.$manager.runFromPolice();

      if (lostInventory) {
        this.message = 'You got away but lost all your inventory.';
        this.handleLostInventory();
      }
      else if (gotAway) {
        this.gotAway = gotAway;
        this.message = 'You managed to lose him in an alley.';
        this.$manager.resetPolice();
      }
      else {
        this.message = 'You tried to flee but he is still after you!';
      }
    },
    handleFightButtonPress: function() {
      let { selfDamage, policeDamage } = this.$manager.fightPolice();

      let selfWounded = selfDamage > 0;
      let policeWounded = policeDamage > 0;

      this.$store.commit('reduceHealth', selfDamage);
      this.policeHealth -= policeDamage;

      if (this.health < 1) {
        this.message = 'You have been killed!';
      }
      else if (this.policeHealth < 1) {
        this.message = 'The cop fled and you got away!';
        this.gotAway = true;
        this.$manager.resetPolice();
      }
      else if (selfWounded) {
        this.message = `You have been wounded! Your health is now ${this.health}%`;
      }
      else if (policeWounded) {
        this.message = 'You wounded the cop but he\'s still after you!';
      }
    }
  }
}
</script>
