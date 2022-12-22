import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locations: null,
    overlay: null,
    currentScreen: null,
    currentLocation: null,
    selectedItem: null,
    debt: null,
    cash: null,
    gun: null,
    health: null,
    savings: null,
    daysRemaining: null,
    newsItem: null,
    inventory: null,
    inventoryCapacity: null,
    marketItems: null,
    availableItems: null
  },
  getters: {
    priceList: state => {
      return state.availableItems.map(item => ({
        name: item.name,
        priceLow: item.priceLow,
        priceHigh: item.priceHigh
      }));
    },
    boomBustItem: (_, getters) => {
      let boomBustItems = getters.marketItems.filter(function(marketItem) {
        return (marketItem.isBoomPrice === true || marketItem.isBustPrice === true);
      });

      if (boomBustItems.length > 0) {
        return boomBustItems[0];
      }
      else {
        return null;
      }
    },
    inventorySpaceAvailable: state => {
      let inventoryOwned = state.inventory.reduce((acc, inventoryItem) => {
        return acc + inventoryItem.owned;
      }, 0);
      return state.inventoryCapacity - inventoryOwned;
    },
    inventoryOwned: state => {
      return state.inventory.reduce((acc, inventoryItem) => {
        return acc + inventoryItem.owned;
      }, 0);
    },
    hasGun: state => {
      return state.gun;
    },
    specialForLocation: state => {
      return state.currentLocation.special;
    },
    locations: state => {
      return state.locations;
    },
    currentLocation: state => {
      return state.currentLocation;
    },
    netWorth: state => {
      return state.cash - state.debt;
    },
    isShowingOverlay: state => {
      return state.currentScreen !== 'main';
    },
    currentScreen: state => {
      return state.currentScreen;
    },
    marketItems: state => {
      return state.marketItems;
    },
    unavailableInventoryItems: state => {
      let marketItemNames = state.marketItems.map(item => item.name);
      let nonMarketItems = state.inventory.filter(inventoryItem => {
        return !marketItemNames.includes(inventoryItem.name) && inventoryItem.owned > 0;
      });

      return nonMarketItems;
    },
    inventory: state => {
      return state.inventory;
    },
    inventoryCapacity: state => {
      return state.inventoryCapacity;
    },
    daysRemaining: state => {
      return state.daysRemaining;
    },
    health: state => {
      return state.health;
    },
    cash: state => {
      return state.cash;
    },
    debt: state => {
      return state.debt;
    },
    savings: state => {
      return state.savings;
    },
    selectedItem: state => {
      return state.selectedItem;
    },
    newsItem: state => {
      return state.newsItem;
    },
    availableItems: state => {
      return state.availableItems;
    }
  },
  mutations: {
    initializeGameState: (state, gameOptions) => {
      state.cash = gameOptions.cash;
      state.debt = gameOptions.debt;
      state.savings = gameOptions.startingSavings;
      state.health = gameOptions.health;
      state.locations = gameOptions.locations;
      state.overlay = null;
      state.gun = gameOptions.gun;
      state.currentScreen = 'main';
      state.currentLocation = gameOptions.locations[0];
      state.selectedItem = null;
      state.daysRemaining = gameOptions.gameLength;
      state.inventoryCapacity = gameOptions.inventoryCapacity;
      state.availableItems = gameOptions.items;
      state.marketItems = [];
      state.newsItem = null;
      state.inventory = [];
    },
    addPockets: (state, { numberOfPockets, cost }) => {
      state.inventoryCapacity += numberOfPockets;
      state.cash -= cost;
    },
    buyGun: (state, cost) => {
      state.gun = true;
      state.cash -= cost;
    },
    buyItem: (state, { item, quantity, cost }) => {
      // Update the inventory
      let inventoryIndex = state.inventory.map(inventoryItem => inventoryItem.name).indexOf(item.name);
      let inventoryItem = state.inventory[inventoryIndex];
      inventoryItem.owned += quantity;

      // Update the market
      let marketIndex = state.marketItems.map(marketItem => marketItem.name).indexOf(item.name);
      let marketItem = state.marketItems[marketIndex];
      marketItem.available -= quantity;

      state.cash -= cost;
      state.selectedItem = null;
    },
    dumpItem: (state, { item, quantity }) => {
      let inventoryIndex = state.inventory.map(inventoryItem => inventoryItem.name).indexOf(item.name);
      let inventoryItem = state.inventory[inventoryIndex];
      inventoryItem.owned -= quantity;

      state.selectedItem = null;
    },
    sellItem: (state, { item, quantity, profit }) => {
      // Update the inventory
      let inventoryIndex = state.inventory.map(inventoryItem => inventoryItem.name).indexOf(item.name);
      let inventoryItem = state.inventory[inventoryIndex];
      inventoryItem.owned -= quantity;

      // Update the market
      let marketIndex = state.marketItems.map(marketItem => marketItem.name).indexOf(item.name);
      let marketItem = state.marketItems[marketIndex];
      marketItem.available += quantity;

      state.cash += profit;
      state.selectedItem = null;
    },
    updateMarketItems: (state, randomizedMarketItems) => {
      state.marketItems = randomizedMarketItems;
    },
    updateDaysRemaining: (state, daysRemaining) => {
      state.daysRemaining = daysRemaining;
    },
    updateInventory: (state, inventory) => {
      state.inventory = inventory;
    },
    reduceHealth: (state, amount) => {
      let newHealth = state.health - amount;

      if (newHealth < 0) {
        state.health = 0;
      }
      else {
        state.health = newHealth;
      }
    },
    selectItem: (state, item) => {
      state.selectedItem = item;
    },
    updateLocation: (state, newLocation) => {
      state.currentLocation = newLocation;
    },
    updateSelectedItem: (state, newItem) => {
      state.selectedItem = newItem;
    },
    updateNewsItem: (state, newsItem) => {
      state.newsItem = newsItem;
    },
    updateCurrentScreen: (state, screen) => {
      state.currentScreen = screen;
    }
  },
  actions: {
    showOverlay(context, screen) {
      context.commit('updateCurrentScreen', screen);
    },
    hideOverlay: context => {
      context.commit('updateSelectedItem', null);
      context.commit('updateCurrentScreen', 'main');
    }
  }
});
