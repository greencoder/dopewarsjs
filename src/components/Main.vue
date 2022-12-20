<template>
  <section id="market" class="fullscreen">
    <header>
      <span>{{ currentLocation.name }}</span>
      <span id="btn-menu" @click="handleMenuButtonClick">
        <img src="@/assets/images/menu.svg" />
      </span>
    </header>
    <News />
    <Summary  />
    <Market />
    <Buttons />
  </section>
</template>

<script>
import Market from './Market.vue';
import Summary from './Summary.vue';
import News from './News.vue';
import Buttons from './Buttons.vue';

export default {
  name: 'Main',
  components: {
    Market,
    News,
    Summary,
    Buttons,
  },
  computed: {
    currentLocation: function() {
      return this.$store.getters.currentLocation;
    }
  },
  methods: {
    handleMenuButtonClick: function() {
      this.$store.dispatch('showOverlay', 'menu');
    }
  }
}
</script>

<style scoped>

section#market div:last-child {
  padding-bottom: 25px;
}

header {
  height: 50px;
  background-color: #353A3F;
  padding: 0px 15px;
  color: #fff;
  font-size: 1.2em;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: left;
}

header span#btn-menu {
  width: 44px;
  height: 44px;
  display: inline-block;
  margin-left: auto;
  border: 0px solid orange;
  display: flex;
  align-items: center;
  justify-content: center;
}

header img {
  height: 8px;
}

</style>
