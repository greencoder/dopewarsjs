<template>
  <div>
    <p>Time Remaining: {{ daysRemaining }} days</p>
    <table>
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

p {
  padding: 0px 0px 10px 0px;
}

table {
  padding-left: 0px;
  border-collapse: collapse;
}

table td {
  padding-left: 0px;
  padding-bottom: 0px;
}

table tr:first-child td {
  padding-bottom: 5px;
}

table td:last-child {
  padding-left: 15px;
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