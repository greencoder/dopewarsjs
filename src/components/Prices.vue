<template>
  <section id="menu" class="overlay">
    <div>
      <header>
        <span>Price List</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <div class="inner">
        <p>Here are the normal price ranges for items:</p>
        <ul>
          <li v-for="item in priceList" :key="item.name">
            {{ item.name }}: ${{ item.priceLow }}&hairsp;-&hairsp;${{ item.priceHigh }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Prices',
    computed: {
      priceList() {
        return this.$store.getters.priceList;
      }
    },
    methods: {
      handleCloseButtonPress() {
        this.$store.dispatch('hideOverlay');
      }
    }
}
</script>

<style scoped>

li {
  margin-bottom: 10px;
}

</style>
