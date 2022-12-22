<template>
  <div>
    <table>
      <tr>
        <td><strong>Cash:</strong>{{ formatCurrency(cash) }}</td>
        <td><strong>Days Left:</strong>{{ daysRemaining }}</td>
      </tr>
      <tr>
        <td><strong>Debt:</strong>{{ formatCurrency(debt) }}</td>
        <td><strong>Health:</strong>{{ health }}%</td>
      </tr>
      <tr>
        <td><strong>Savings:</strong>{{ formatCurrency(savings) }}</td>
        <td><strong>Inventory:</strong>{{ inventoryOwned }}/{{ inventoryCapacity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  computed: {
    inventory: function() {
      return this.$store.getters.inventory;
    },
    inventoryCapacity() {
      return this.$store.getters.inventoryCapacity;
    },
    health() {
      return this.$store.getters.health;
    },
    daysRemaining() {
      return this.$store.getters.daysRemaining;
    },
    inventoryOwned: function() {
      return this.$store.getters.inventoryOwned;
    },
    cash: function() {
      return this.$store.getters.cash;
    },
    debt: function() {
      return this.$store.getters.debt;
    },
    savings: function() {
      return this.$store.getters.savings;
    }
  },
  methods: {
    formatCurrency: function(value) {
      if (value != null) {
        return `$${value.toFixed(0)}`
      }
      else {
        return 'None';
      }
    }
  }
}
</script>

<style scoped>

div {
  background-color: inherit;
  padding-top: 15px !important;
}

table {
  padding-left: 0px;
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 6px;
  font-size: 0.9em;
}

td {
  width: 50%;
  padding: 4px 0px;
  border: 0px solid black;
}

tr:last-child td {
  padding-bottom: 0px;
}

span {
  display: block;
  margin-bottom: 5px;
}

strong {
  font-weight: 600;
  display: inline-block;
  margin-right: 4px;
}
</style>
