<template>
  <section id="guns" class="overlay">
    <div>
      <header>
        <span>Gun Shop</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <template v-if="canBuyGun && canAffordGun">
        <div class="inner">
          Want to fight back when you are getting hassled by the cops?
          You can buy a gun for ${{ gunCost }}.
        </div>
        <footer>
          <button @click="handleBuyGunButtonPress"
                  class="full-width"
                  :disabled="!canAffordGun">Buy Gun</button>
        </footer>
      </template>
      <template v-else-if="canBuyGun && !canAffordGun">
        <div class="inner">
          There are guns available for ${{ gunCost }} but you can't afford it right now.
        </div>
        <footer>
          <button @click="handleOkayButtonPress" class="full-width">Okay</button>
        </footer>
      </template>
      <template v-else>
        <div class="inner">
          You already own a gun!
        </div>
        <footer>
          <button @click="handleOkayButtonPress" class="full-width">Okay</button>
        </footer>
      </template>
    </div>
  </section>
</template>

<script>
export default {
  name: 'GunShop',
  computed: {
    canBuyGun: function() {
      return !this.$store.getters.hasGun;
    },
    canAffordGun: function() {
      return this.$store.getters.cash >= this.gunCost;
    },
    gunCost: function() {
      return 1000;
    }
  },
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    },
    handleBuyGunButtonPress: function() {
      this.$store.commit('buyGun', this.gunCost);
      this.$store.dispatch('hideOverlay');
    },
    handleOkayButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    }
  }
}
</script>

<style scoped>
</style>
