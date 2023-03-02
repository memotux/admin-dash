<script lang="ts" setup>
import { useTheme } from "vuetify";

const theme = useTheme()

const { data: mockDataInvoices } = await useAsyncData('invoices', () => queryContent('/data/invoices').findOne())

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

const headData = {
  title: 'Invoices',
  description: 'List of Invoices Balances'
}
useSeoMeta(headData)

</script>

<template>
  <div>
    <Header v-bind="headData" />
    <VContainer v-if="mockDataInvoices">
      <VDataTable :items-per-page="-1" :headers="headers" :items="mockDataInvoices.invoices" item-value="name"
        class="elevation-1">
        <template #item.action="{ item }">
          <VCheckboxBtn :value="() => actionVal(item.raw.id)" @click="() => updateActionVal(item.raw.id)" />
        </template>
        <template #item.cost="{ item }">
          <VChip :color="theme.current.value.colors['greenAccent-500']" size="large">
            $ {{ item.raw.cost }}
          </VChip>
        </template>
      </VDataTable>
    </VContainer>
  </div>
</template>

<style scoped>
.v-data-table {
  --v-theme-surface: var(--v-theme-primary-400)
}
</style>