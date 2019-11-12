<template>
  <section id="market" class="fullscreen">
    <header>
      <span>{{ location }}</span>
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
    <Summary :cash='cash'
             :debt='debt'
             :health='health'
             :savings='savings'
             :inventory='inventory'
             :coatCapacity='coatCapacity'
             :daysRemaining='daysRemaining'
    />
    <Buttons :selectedItem='selectedItem'
             :showOverlay='showOverlay'
             :inventory='inventory'
             :market='market'
             :netWorth='netWorth'
             :location='location'
             :daysRemaining='daysRemaining'
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
    'location',
    'debt',
    'cash',
    'netWorth',
    'health',
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