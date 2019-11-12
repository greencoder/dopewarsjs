<template>
  <div id="container" v-bind:class="{ dark: isShowingOverlay }">
    <Main v-if="screen === 'main'"
          :location="location"
          :debt="debt"
          :cash="cash"
          :netWorth="netWorth"
          :health="health"
          :savings="savings"
          :daysRemaining="daysRemaining"
          :inventory="inventory"
          :market="market"
          :coatCapacity="coatCapacity"
          :showOverlay="showOverlay"
          :hideOverlay="hideOverlay"
          :newsItem="newsItem"
          :selectedItem="selectedItem"
          :toggleSelectedItem="toggleSelectedItem"
    />
    <Travel v-if="screen === 'travel'"
            :hideOverlay="hideOverlay"
            :location='location'
            :travel='travel'
    />
    <Menu v-if="screen === 'menu'"
          :hideOverlay="hideOverlay"
          :showOverlay="showOverlay"
          :restartGame="restartGame"
    />
    <Buy v-if="screen === 'buy'"
          :cash="cash"
          :buyItem="buyItem"
          :hideOverlay="hideOverlay"
          :selectedItem="selectedItem"
          :inventory="inventory"
          :market="market"
          :coatCapacity="coatCapacity"
    />
    <Sell v-if="screen === 'sell'"
          :cash="cash"
          :sellItem="sellItem"
          :hideOverlay="hideOverlay"
          :selectedItem="selectedItem"
          :inventory="inventory"
    />
    <Prices v-if="screen === 'prices'"
            :hideOverlay="hideOverlay"
    />
  </div>
</template>

<script>
import Main from './Main.vue';
import Travel from './Travel.vue';
import Menu from './Menu.vue';
import Buy from './Buy.vue';
import Sell from './Sell.vue';
import Prices from './Prices.vue';

import GameManager from '../scripts/Manager.js';

export default {
  name: 'Game',
  components: {
    Main,
    Travel,
    Menu,
    Buy,
    Sell,
    Prices,
  },
  mounted: function() {
    this.startGame();
  },
  computed: {
    isShowingOverlay: function() {
      return this.screen !== 'main';
    },
    netWorth: function() {
      return this.cash - this.debt;
    }
  },
  methods: {
    startGame: function() {
      let data = GameManager.loadGame();

      if (data) {
        this.importData(data);
      }
      else {
        let newGameData = GameManager.initializeGame();
        this.importData(newGameData);
        GameManager.saveGame(newGameData);
      }
    },
    exportData: function() {
      return {
        overlay: this.overlay,
        screen: this.screen,
        location: this.location,
        selectedItem: this.selectedItem,
        debt: this.debt,
        cash: this.cash,
        health: this.health,
        savings: this.savings,
        daysRemaining: this.daysRemaining,
        coatCapacity: this.coatCapacity,
        newsItem: this.newsItem,
        inventory: this.inventory,
        market: this.market,
      }
    },
    importData: function(dict) {
        this.overlay = dict.overlay;
        this.screen = dict.screen;
        this.location = dict.location;
        this.selectedItem = dict.selectedItem;
        this.debt = dict.debt;
        this.cash = dict.cash;
        this.health = dict.health;
        this.savings = dict.savings;
        this.daysRemaining = dict.daysRemaining;
        this.coatCapacity = dict.coatCapacity;
        this.newsItem = dict.newsItem;
        this.inventory = dict.inventory;
        this.market = dict.market;
    },
    restartGame: function() {
      GameManager.deleteGame();
      this.startGame();
    },
    sellItem: function(sellItem, quantity, profit) {
      // Update the inventory
      let inventoryIndex = this.inventory.map(item => item.name).indexOf(sellItem.name);
      let inventoryItem = this.inventory[inventoryIndex];
      inventoryItem.owned -= quantity;

      // Update the market
      let marketIndex = this.market.map(item => item.name).indexOf(sellItem.name);
      let marketItem = this.market[marketIndex];
      marketItem.available += quantity;

      this.cash += profit;
      this.selectedItem = null;
    },
    buyItem: function(buyItem, quantity, cost) {
      // Update the inventory
      let inventoryIndex = this.inventory.map(item => item.name).indexOf(buyItem.name);
      let inventoryItem = this.inventory[inventoryIndex];
      inventoryItem.owned += quantity;

      // Update the market
      let marketIndex = this.market.map(item => item.name).indexOf(buyItem.name);
      let marketItem = this.market[marketIndex];
      marketItem.available -= quantity;

      this.cash -= cost;
      this.selectedItem = null;
    },
    travel: function(newLocation) {
      this.selectedItem = null;
      this.location = newLocation;
      this.startNewDay(newLocation);
    },
    startNewDay: function(location) {
      this.daysRemaining -= 1;
      this.market = GameManager.randomizeMarket();
      this.newsItem = this.generateNewsItem(this.market, location);
      this.screen = 'main';
      this.overlay = null;
      GameManager.saveGame(this.exportData());
    },
    generateNewsItem: function(market, location) {
      if (market) {
        return `Have you noticed ${location} kinda sucks?`;
      }
      return "No news is good news";
    },
    showOverlay: function(overlay) {
      this.screen = overlay;
    },
    hideOverlay: function() {
      this.selectedItem = null;
      this.screen = 'main';
    },
    toggleSelectedItem: function(item) {
      if (this.selectedItem && this.selectedItem.name === item.name) {
        this.selectedItem = null;
      }
      else {
        this.selectedItem = item;
      }
    }
  },
  data() {
    return {
      overlay: null,
      screen: null,
      location: null,
      selectedItem: null,
      debt: null,
      cash: null,
      health: null,
      savings: null,
      daysRemaining: null,
      coatCapacity: null,
      newsItem: null,
      inventory: [],
      market: [],
    }
  }
}
</script>

<style>

div#container {
  height: 100%;
  background-color: #fff;
}

div#container.dark {
  background-color: #464646;
}

@media screen and (min-width: 480px) {
  div#container {
    width: 375px;
    position: relative;
    padding-bottom: 100px;
  }
}

/* General Styles */

button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1px solid #353A3F;
  background-color: inherit;
  border-radius: 8px;
  padding: 0px 16px;
  font-size: 1.0em;
  outline: none;
  font-weight: normal;
  height: 40px;
}

button:active {
  background-color: #353A3F;
  color: #fff;
}

button:disabled {
  border: 1px solid #C0C0C0;
  color: #C0C0C0;
}

button.full-width {
  width: 100%;
  margin-bottom: 10px;
}

p {
  margin: 0px;
}

/* Fullscreen Section */

section.fullscreen {
  background-color: #fff;
  height: 100%;
}

section.fullscreen > div {
  padding: 12px 15px 0px 15px;
}

/* Overlay Section */

section.overlay {
  background-color: #464646;
  border: 15px solid #464646;
  padding: 0px;
}

section.overlay div {
  height: 100%;
  width: 100%;
  background-color: #fff;
}

section.overlay header {
  background-color: #efefef;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: left;
  border-bottom: 1px solid #353A3F;
  font-weight: bold;
}

section.overlay header img {
  height: 15px;
  width: 15px;
  margin-left: auto;
}

section.overlay div.inner {
  background-color: #fff;
  padding: 10px;
}

section.overlay div.inner p {
  margin: 10px 0px 20px 5px;
  line-height: 1.5em;
}

</style>