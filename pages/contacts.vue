<script lang="ts" setup>
const { data: mockDataContacts } = await useAsyncData('contacts', () => queryContent('/data/contacts').findOne())

const search = ref('')

const headers = [
  { title: 'Registrar ID', align: 'start', key: 'registrarId' },
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Age', align: 'start', key: 'age' },
  { title: 'Phone', align: 'start', key: 'phone', sortable: false, },
  { title: 'Address', align: 'start', key: 'address', sortable: false },
  { title: 'City', align: 'start', key: 'city', },
  { title: 'ZipCode', align: 'start', key: 'zipCode', },
]

const headData = {
  title: 'Contacts',
  description: 'List of Contacts for future reference'
}
useSeoMeta(headData)

</script>

<template>
  <div>
    <Header v-bind="headData" />
    <VContainer v-if="mockDataContacts">
      <VDataTable
        :items-per-page="-1"
        :headers="headers"
        :items="mockDataContacts.contacts"
        item-value="name"
        class="elevation-1"
        :search="search">
        <template #top>
          <VToolbar color="primary-400">
            <VDivider class="mx-4" inset vertical />
            <VSpacer />
            <VTextField
              v-model="search"
              append-icon="mdi:mdi-magnify"
              label="Search"
              single-line
              hide-details />
          </VToolbar>
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