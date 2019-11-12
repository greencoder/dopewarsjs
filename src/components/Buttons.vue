<template>
  <div>
    <nav>
      <button @click="showOverlay('buy')" v-bind:disabled="buyButtonDisabled">Buy</button>
      <button @click="showOverlay('sell')" v-bind:disabled="sellButtonDisabled">Sell</button>
    </nav>
    <nav>
      <button @click="showOverlay('travel')" v-if="daysRemaining > 0">Travel</button>
      <button @click="finishGame" v-else>Finish Game</button>
      <button @click="notImplemented()">{{ specialForLocation }}</button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Buttons',
  props: [
    'daysRemaining',
    'selectedItem',
    'showOverlay',
    'market',
    'inventory',
    'location',
    'netWorth',
  ],
  methods: {
    finishGame: function() {
      alert(`Nice job! Your final cash was $${this.netWorth}`);
    },
    notImplemented: function() {
      alert('This is not implemented yet.');
    },
    itemIsAvailable: function(item) {
      let availableItems = this.market.filter(function(marketItem) {
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
    specialForLocation: function() {
      var special;
      switch(this.location) {
        case 'Queens':
          special = 'Loan Shark';
          break;
        case 'Staten Island':
          special = 'Doctor';
          break;
        case 'The Bronx':
          special = 'Gun Shop';
          break;
        case 'Manhattan':
          special = 'ATM';
          break;
        case 'Brooklyn':
          special = 'Tailor';
          break;
      }
      return special;
    },
    buyButtonDisabled: function() {
      if (this.selectedItem !== null) {
        if (this.itemIsAvailable(this.selectedItem)) {
          return false;
        }
      }
      return true;
    },
    sellButtonDisabled: function() {
      if (this.selectedItem !== null) {
        if (this.itemIsOwned(this.selectedItem)) {
          return false;
        }
      }
      return true;
    }
  }
}
</script>

<style scoped>

div {
  background-color: inherit;
  padding-top: 20px !important;
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