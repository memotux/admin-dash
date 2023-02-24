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

const actions = new Set()

const updateActionVal = (item: number) => {
  if (actions.has(item)) {
    actions.delete(item)
    return
  }
  actions.add(item)
}

const actionVal = (id: number) => actions.has(id)

</script>

<template>
  <div>
    <Header title="Invoices" subtitle="List of Invoices Balances" />
    <VContainer>
      <VDataTable :items-per-page="-1" :headers="headers" :items="mockDataInvoices" item-value="name" class="elevation-1">
        <template #item.action="{ item }">
          <VCheckboxBtn :value="() => actionVal(item.raw.id)" @click="() => updateActionVal(item.raw.id)" />
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
