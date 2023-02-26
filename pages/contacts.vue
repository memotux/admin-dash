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

</script>

<template>
  <div>
    <Header title="Contacts" subtitle="List of Contacts for future reference" />
    <VContainer v-if="mockDataContacts">
      <VDataTable :items-per-page="-1" :headers="headers" :items="mockDataContacts.contacts" item-value="name"
        class="elevation-1" :search="search">
        <template #top>
          <VToolbar>
            <VDivider class="mx-4" inset vertical />
            <VSpacer />
            <VTextField v-model="search" append-icon="mdi:mdi-magnify" label="Search" single-line hide-details />
          </VToolbar>
        </template>
      </VDataTable>
    </VContainer>
  </div>
</template>
