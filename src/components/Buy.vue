<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Buy {{ selectedItem.name }}</span>
        <img src="@/assets/images/close.svg" @click="hideOverlay" />
      </header>
      <div class="inner">
        <p>How {{ muchMany(selectedItem.name )}} {{ selectedItem.name }} do you want to buy?</p>
        <p class="subtext">There {{ isAre(availableCount) }} {{ availableCount|pluralize('unit') }} available to buy at ${{ selectedItem.price }}/each and you have room for {{ inventorySpace|pluralize('unit') }}. You have ${{ cash }} in cash.</p>
        <nav>
          <button @click="changeQuantity(0)">None</button>
          <button @click="incrementQuantity(-1)" v-bind:disabled="quantity === 0">-</button>
          <span>{{ quantity }}</span>
          <button @click="incrementQuantity(1)" v-bind:disabled="quantity >= maxPurchaseCount">+</button>
          <button @click="changeQuantity(maxPurchaseCount)">Max</button>
        </nav>
        <button @click="buyClick" class="full-width" v-bind:disabled="quantity === 0">{{ buttonTitle }}</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Buy',
  props: [
    'cash',
    'buyItem',
    'hideOverlay',
    'selectedItem',
    'market',
    'inventory',
    'coatCapacity',
  ],
  data: function() {
    return {
      quantity: 0
    }
  },
  methods: {
    buyClick: function() {
      let cost = this.selectedItem.price * this.quantity;
      this.buyItem(this.selectedItem, this.quantity, cost);
      this.hideOverlay();
    },
    isAre: function(count) {
      return count == 1 ? 'is' : 'are';
    },
    muchMany: function(item) {
      return item.endsWith('s') ? 'many' : 'much';
    },
    incrementQuantity(value) {
      this.quantity += value;
    },
    changeQuantity(value) {
      this.quantity = value;
    }
  },
  filters: {
    pluralize: function(number, string) {
      let returnString = `${number} ${string}`;
      return number === 1 ? returnString : returnString + 's';
    }
  },
  computed: {
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
      let ownedCount = this.inventory.reduce((acc, inventoryItem) => {
        return acc + inventoryItem.owned;
      }, 0);
      return this.coatCapacity - ownedCount;
    },
    availableCount: function() {
      let itemIndex = this.market.map(item => item.name).indexOf(this.selectedItem.name);
      let item = this.market[itemIndex];
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