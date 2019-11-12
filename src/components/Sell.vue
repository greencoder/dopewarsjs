<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Sell {{ selectedItem.name }}</span>
        <img src="@/assets/images/close.svg" @click="hideOverlay" />
      </header>
      <div class="inner">
        <p>How {{ muchMany(selectedItem.name )}} {{ selectedItem.name }} do you want to sell?</p>
        <p class="subtext">You have {{ inventoryCount|pluralize('unit') }} available to sell at ${{ selectedItem.price }}/each.</p>
        <nav>
          <button @click="changeQuantity(0)">None</button>
          <button @click="incrementQuantity(-1)" v-bind:disabled="quantity === 0">-</button>
          <span>{{ quantity }}</span>
          <button @click="incrementQuantity(1)" v-bind:disabled="quantity >= inventoryCount">+</button>
          <button @click="changeQuantity(inventoryCount)">Max</button>
        </nav>
        <button @click="sellClick" class="full-width" v-bind:disabled="quantity === 0">{{ buttonTitle }}</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Sell',
  props: [
    'cash',
    'sellItem',
    'hideOverlay',
    'selectedItem',
    'inventory',
  ],
  data: function() {
    return {
      quantity: 0
    }
  },
  methods: {
    sellClick: function() {
      let profit = this.selectedItem.price * this.quantity;
      this.sellItem(this.selectedItem, this.quantity, profit);
      this.hideOverlay();
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
        return 'Sell';
      }
      else {
        let profit = this.quantity * this.selectedItem.price;
        return `Sell for $${profit}`;
      }
    },
    inventoryCount: function() {
      let itemIndex = this.inventory.map(item => item.name).indexOf(this.selectedItem.name);
      let item = this.inventory[itemIndex];
      return item.owned;
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