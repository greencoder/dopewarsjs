<template>
  <section id="market" class="fullscreen">
    <header>
      <span>{{ currentLocation }}</span>
      <span id="btn-menu" @click="showOverlay('menu')">
        <img src="@/assets/images/menu.svg" />
      </span>
    </header>
    <News :newsItem="newsItem" v-if="newsItem" />
    <Market :inventory='inventory'
            :market='market'
            :selectedItem='selectedItem'
            :toggleSelectedItem='toggleSelectedItem'
    />
    <Summary v-if="overlay === null"
             :cash='cash'
             :debt='debt'
             :savings='savings'
             :inventory='inventory'
             :coatCapacity='coatCapacity'
             :daysRemaining='daysRemaining'
    />
    <Buttons v-if="overlay === null"
             :selectedItem='selectedItem'
             :showOverlay='showOverlay'
    />
  </section>
</template>

<script>
import Market from './Market.vue';
import Summary from './Summary.vue';
import News from './News.vue';
import Buttons from './Buttons.vue';

export default {
  name: 'Main',
  props: [
    'currentLocation',
    'debt',
    'cash',
    'savings',
    'selectedItem',
    'toggleSelectedItem',
    'daysRemaining',
    'inventory',
    'market',
    'newsItem',
    'coatCapacity',
    'showOverlay',
    'overlay',
  ],
  components: {
    Market,
    News,
    Summary,
    Buttons,
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