<template>
  <div>
    <table>
      <tr>
        <td><strong>Health:</strong>{{ health }}</td>
        <td><strong>Days Left:</strong>{{ daysRemaining }}</td>
      </tr>
      <tr>
        <td><strong>Cash:</strong>{{ formatCurrency(cash) }}</td>
        <td><strong>Debt:</strong>{{ formatCurrency(debt) }}</td>
      </tr>
      <tr>
        <td><strong>Coat:</strong>{{ inventoryCount }}/{{ coatCapacity }}</td>
        <td><strong>Savings:</strong>{{ formatCurrency(savings) }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Summary',
  props: [
    'debt',
    'cash',
    'health',
    'savings',
    'inventory',
    'coatCapacity',
    'daysRemaining',
  ],
  computed: {
    inventoryCount: function() {
      return this.inventory.reduce(function (acc, obj) {
        return acc + obj.owned;
      }, 0);
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
}

td {
  padding-left: 0px;
  padding-bottom: 5px;
  border: 0px solid black;
}

tr:last-child td {
  padding-bottom: 0px;
}

td:last-child {
  padding-left: 25px;
}

span {
  display: block;
  margin-bottom: 5px;
}

strong {
  font-weight: 500;
  display: inline-block;
  margin-right: 4px;
}
</style>