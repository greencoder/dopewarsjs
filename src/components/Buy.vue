<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Buy {{ selectedItem.name }}</span>
        <img src="@/assets/images/close.svg" @click="handleCloseOverlayButtonClick" />
      </header>
      <div class="inner">
        <p>How {{ selectedItem.adjective }} {{ selectedItem.name|lower }} do you want to buy?</p>
        <p class="subtext">
          There {{ isAre(availableCount) }} {{ availableCount|pluralize('unit') }} available
          to buy at ${{ selectedItem.price }}/each and you have room
          for {{ inventorySpace|pluralize('unit') }}. You have ${{ cash }} in cash.
        </p>
        <nav>
          <button @click="changeQuantity(0)">None</button>
          <button @click="incrementQuantity(-1)" v-bind:disabled="quantity === 0">-</button>
          <span>{{ quantity }}</span>
          <button @click="incrementQuantity(1)" v-bind:disabled="quantity >= maxPurchaseCount">+</button>
          <button @click="changeQuantity(maxPurchaseCount)">Max</button>
        </nav>
        <button @click="handleBuyButtonPress" class="full-width" v-bind:disabled="quantity === 0">
          {{ buttonTitle }}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Buy',
  data: function() {
    return {
      quantity: 0
    }
  },
  methods: {
    handleBuyButtonPress: function() {
      let cost = this.selectedItem.price * this.quantity;
      this.buyItem(this.selectedItem, this.quantity, cost);
      this.hideOverlay();
    },
    hideOverlay: function() {
      this.$store.dispatch('hideOverlay');
    },
    handleCloseOverlayButtonClick: function() {
      this.hideOverlay();
    },
    isAre: function(count) {
      return count == 1 ? 'is' : 'are';
    },
    incrementQuantity(value) {
      this.quantity += value;
    },
    changeQuantity(value) {
      this.quantity = value;
    },
    buyItem(item, quantity, cost) {
      this.$store.commit('buyItem', { item, quantity, cost });
    }
  },
  filters: {
    pluralize: function(number, string) {
      let returnString = `${number} ${string}`;
      return number === 1 ? returnString : returnString + 's';
    },
    lower: function(string) {
      return string.toLowerCase();
    }
  },
  computed: {
    cash: function() {
      return this.$store.getters.cash;
    },
    selectedItem: function() {
      return this.$store.getters.selectedItem;
    },
    buttonTitle: function() {
      if (this.quantity === 0) {
        return 'Buy';
      }
      else {
        let cost = this.quantity * this.selectedItem.price;
        return `Buy for $${cost}`;
      }
    },
    inventorySpace: function() {
      return this.$store.getters.inventorySpaceAvailable;
    },
    availableCount: function() {
      let marketItems = this.$store.getters.marketItems;
      let itemIndex = marketItems.map(item => item.name).indexOf(this.selectedItem.name);
      let item = marketItems[itemIndex];
      return item.available;
    },
    maxPurchaseCount: function() {
      let canAfford = Math.floor(this.cash / this.selectedItem.price);
      return Math.min(canAfford, this.inventorySpace, this.availableCount);
    }
  }
}
</script>

<style scoped>

p {
  margin: 10px 5px !important;
}

p.subtext {
  font-size: 0.85em;
  padding-right: 5px;
  margin: 0px;
}

p.warning {
  color: red;
  font-weight: bold;
  padding-bottom: 20px;
}

nav {
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

nav span {
  display: inline-block;
  font-size: 1.5em;
  text-align: center;
  margin-left: 15px;
  margin-right: 15px;
  min-width: 40px;
}

nav button:first-child {
  margin-right: 10px;
}

nav button:last-child {
  margin-left: 10px;
}

</style>
