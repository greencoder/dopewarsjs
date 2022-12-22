<template>
  <section id="bank" class="overlay">
    <div>
      <header>
        <span>Bank</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <div class="inner">
        <p>Keep your money safe and earn interest.</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Bank',
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    }
  }
}
</script>

<style scoped>
</style>
