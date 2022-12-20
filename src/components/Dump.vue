<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Dump {{ selectedItem.name }}</span>
        <img src="@/assets/images/close.svg" @click="handleCloseOverlayButtonClick" />
      </header>
      <div class="inner">
        <p>Nobody is interested in your {{ selectedItem.name|lower }} right now, but you can dump it.</p>
        <p>How much do you want to dump?</p>
        <p class="subtext">You have {{ inventoryCount|pluralize('unit') }} that you can get rid of.</p>
        <nav>
          <button @click="changeQuantity(0)">None</button>
          <button @click="incrementQuantity(-1)" v-bind:disabled="quantity === 0">-</button>
          <span>{{ quantity }}</span>
          <button @click="incrementQuantity(1)" v-bind:disabled="quantity >= inventoryCount">+</button>
          <button @click="changeQuantity(inventoryCount)">Max</button>
        </nav>
        <button @click="handleDumpButtonPress" class="full-width" v-bind:disabled="quantity === 0">
          Dump
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Dump',
  data: function() {
    return {
      quantity: 0
    }
  },
  methods: {
    handleDumpButtonPress: function() {
      this.dumpItem(this.selectedItem, this.quantity);
      this.hideOverlay();
    },
    incrementQuantity(value) {
      this.quantity += value;
    },
    changeQuantity(value) {
      this.quantity = value;
    },
    dumpItem: function(item, quantity) {
      this.$store.commit('dumpItem', { item, quantity });
    },
    hideOverlay: function() {
      this.$store.dispatch('hideOverlay');
    },
    handleCloseOverlayButtonClick: function() {
      this.hideOverlay();
    },
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
    inventoryCount: function() {
      let inventory = this.$store.getters.inventory;
      let itemIndex = inventory.map(item => item.name).indexOf(this.selectedItem.name);
      let item = inventory[itemIndex];
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
