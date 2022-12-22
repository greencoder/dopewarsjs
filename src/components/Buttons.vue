<template>
  <div id="buttons">
    <nav>
      <button @click="handleBuyButtonClick" v-bind:disabled="buyButtonDisabled">Buy Drugs</button>
      <button @click="handleSellButtonClick" v-bind:disabled="sellButtonDisabled">Sell Drugs</button>
    </nav>
    <nav>
      <button @click="handleTravelButtonClick" v-if="canTravel">Travel</button>
      <button @click="handleFinishGameButtonClick" v-else>Finish Game</button>
      <button @click="handleSpecialButtonClick">{{ specialForLocation }}</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  emits: [
    'show-overlay',
    'finish-game'
  ],
  methods: {
    handleBuyButtonClick: function() {
      this.$store.dispatch('showOverlay', 'buy');
    },
    handleSellButtonClick: function() {
      if (this.$store.getters.selectedItem.price) {
        this.$store.dispatch('showOverlay', 'sell');
      }
      else {
        this.$store.dispatch('showOverlay', 'dump');
      }
    },
    handleTravelButtonClick: function() {
      this.$store.dispatch('showOverlay', 'travel');
    },
    handleFinishGameButtonClick: function() {
      this.$manager.finishGame();
    },
    handleSpecialButtonClick: function() {
      let specialScreen = this.specialForLocation.toLowerCase();
      this.$store.dispatch('showOverlay', specialScreen);
    },
    itemIsAvailable: function(item) {
      let availableItems = this.marketItems.filter(function(marketItem) {
        return (marketItem.name === item.name) && (marketItem.available > 0);
      });
      return availableItems.length > 0;
    },
    itemIsOwned: function(item) {
      let ownedItems = this.inventory.filter(function(inventoryItem) {
        return (inventoryItem.name === item.name) && (inventoryItem.owned > 0);
      });
      return ownedItems.length > 0;
    }
  },
  computed: {
    canTravel: function() {
      return this.$store.getters.daysRemaining > 0
    },
    daysRemaining: function() {
      return this.$store.getters.daysRemaining;
    },
    inventory: function() {
      return this.$store.getters.inventory;
    },
    marketItems: function() {
      return this.$store.getters.marketItems;
    },
    selectedItem: function() {
      return this.$store.getters.selectedItem;
    },
    specialForLocation: function() {
      return this.$store.getters.specialForLocation;
    },
    buyButtonDisabled: function() {
      if (this.selectedItem !== null && this.itemIsAvailable(this.selectedItem)) {
        return false;
      }
      else {
        return true;
      }
    },
    sellButtonDisabled: function() {
      if (this.selectedItem !== null && this.itemIsOwned(this.selectedItem)) {
        return false;
      }
      else {
        return true;
      }
    }
  }
}
</script>

<style scoped>

div#buttons {
  background-color: inherit;
  padding-top: 25px;
}

nav {
  padding-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

nav:last-child {
  padding-bottom: 0px;
}

nav button {
  width: calc(50% - 5px);
}

</style>
