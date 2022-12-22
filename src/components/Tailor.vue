<template>
  <section id="tailor" class="overlay">
    <div>
      <header>
        <span>Tailor</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <template v-if="canAddPockets && canAffordTailoring">
        <div class="inner">
          Want to store more drugs in your coat? The tailor can add more pockets for ${{ tailoringCost }}.
        </div>
        <footer>
          <button @click="handleAddPocketsButtonPress"
                  class="full-width"
                  :disabled="!canAffordTailoring">Add Pockets</button>
        </footer>
      </template>
      <template v-else-if="canAddPockets && !canAffordTailoring">
        <div class="inner">
          The tailor can add more pockets for ${{ tailoringCost }} but you can't afford it right now.
        </div>
        <footer>
          <button @click="handleOkayButtonPress" class="full-width">Okay</button>
        </footer>
      </template>
      <template v-else>
        <div class="inner">
          Sorry, your coat already has the maximum number of pockets it can handle.
        </div>
        <footer>
          <button @click="handleOkayButtonPress" class="full-width">Okay</button>
        </footer>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Tailor',
  computed: {
    inventoryCapacity: function() {
      return this.$store.getters.inventoryCapacity;
    },
    canAddPockets: function() {
      return this.inventoryCapacity < 100;
    },
    canAffordTailoring: function() {
      return this.$store.getters.cash >= this.tailoringCost;
    },
    tailoringCost: function() {
      if (this.inventoryCapacity <= 25) {
        return 1500;
      }
      else if (this.inventoryCapacity <= 50) {
        return 2500;
      }
      else if (this.inventoryCapacity <= 75) {
        return 5000;
      }
      else {
        return 10000;
      }
    }
  },
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    },
    handleAddPocketsButtonPress: function() {
      this.$manager.addPockets(25, this.tailoringCost);
      this.$store.dispatch('hideOverlay');
    },
    handleOkayButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    }
  }
}
</script>

<style scoped>
</style>
