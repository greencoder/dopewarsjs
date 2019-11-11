<template>
  <div id="container">
    <Main :currentLocation="currentLocation"
          :debt="debt"
          :cash="cash"
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
          :overlay="overlay"
    />
    <Travel v-if="overlay === 'travel'"
            :hideOverlay="hideOverlay"
            :currentLocation='currentLocation'
    />
    <Menu v-if="overlay === 'menu'"
          :hideOverlay="hideOverlay"
    />
  </div>
</template>

<script>
import Main from './Main.vue';
import Travel from './Travel.vue';
import Menu from './Menu.vue';

export default {
  name: 'Game',
  components: {
    Main,
    Travel,
    Menu,
  },
  methods: {
    showOverlay: function(overlay) {
      this.overlay = overlay;
    },
    hideOverlay: function() {
      this.overlay = null;
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
      currentLocation: 'Brooklyn',
      selectedItem: null,
      debt: 999.99,
      cash: 888.88,
      savings: 777.77,
      daysRemaining: 29,
      coatCapacity: 30,
      newsItem: "You mugged a guy who was sleeping in the subway. You scored 4 weed!",
      inventory: [
       {name: 'Acid', owned: 0},
       {name: 'Cocaine', owned: 1},
       {name: 'Ecstasy', owned: 2},
       {name: 'PCP', owned: 3},
       {name: 'Heroin', owned: 4},
       {name: 'Weed', owned: 5},
       {name: 'Shrooms', owned: 6},
       {name: 'Speed', owned: 7},
      ],
      market: [
        {name: 'Acid', price: 100, available: 0},
        {name: 'Cocaine', price: 101, available: 11},
        {name: 'Ecstasy', price: 102, available: 22},
        {name: 'PCP', price: 103, available: 33},
        {name: 'Heroin', price: 104, available: 44},
        {name: 'Weed', price: 105, available: 55},
        {name: 'Shrooms', price: 106, available: 66},
        {name: 'Speed', price: 107, available: 77},
      ]
    }
  }
}
</script>

<style>

div#container {
  position: static;
}

@media screen and (min-width: 480px) {
  div#container {
    width: 375px;
    height: 100%;
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

p {
  margin: 0px;
}

section.fullscreen > div {
  padding: 12px 15px 0px 15px;
}

/* Semantic Elements */

section {
  height: 100%;
  width: 100%;
}

section.fullscreen {
  background-color: #fff;
  position: absolute;
  top: 0px;
  left: 0px;
}

@media screen and (min-width: 480px) {
  section.fullscreen {
    max-width: 450px;
  }
}

/* Overlay Section */

section.overlay {
  background-color: rgb(50, 50, 50, 0.9);
  position: absolute;
  top: 0px;
  left: 0px;
  min-height: 100%;
  height: 100%;
}

section.overlay div {
  margin: 15px;
  background-color: #fff;
  margin-bottom: 50px;
  max-height: -webkit-fill-available;
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

section.overlay nav {
  background-color: #fff;
  padding: 10px;
}

section.overlay nav p {
  margin: 10px 0px 20px 5px;
}

button.full-width {
  width: 100%;
  margin-bottom: 10px;
}

</style>