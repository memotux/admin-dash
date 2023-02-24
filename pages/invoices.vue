<script lang="ts" setup>
import { mockDataInvoices } from "@/data/mochData";

const headers = [
  { title: 'Action', key: 'action', sortable: false },
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Cost', align: 'start', key: 'cost' },
  { title: 'Phone', align: 'start', key: 'phone', sortable: false, },
  { title: 'Date', align: 'start', key: 'date', },
]

const action = ref(true)

</script>

<template>
  <div>
    <Header title="Invoices" subtitle="List of Invoices Balances" />
    <VContainer>
      <VDataTable :items-per-page="-1" :headers="headers" :items="mockDataInvoices" item-value="name" class="elevation-1">
        <template #item.action>
          <VCheckboxBtn v-model="action" disabled />
        </template>
        <template #item.cost="{ item }">
          <VChip :color="colorTokens.dark.greenAccent[500]" size="large">
            $ {{ item.raw.cost }}
          </VChip>
        </template>
      </VDataTable>
    </VContainer>
  </div>
</template>
