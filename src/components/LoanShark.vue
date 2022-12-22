<template>
  <section id="loanShark" class="overlay">
    <div>
      <header>
        <span>Loan Shark</span>
        <img src="@/assets/images/close.svg" @click="handleCloseButtonPress" />
      </header>
      <div class="inner">
        <p>Do you want to borrow some cash?</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'LoanShark',
  methods: {
    handleCloseButtonPress: function() {
      this.$store.dispatch('hideOverlay');
    }
  }
}
</script>

<style scoped>
</style>
