<script setup lang="ts">
const items = [
  { title: 'Dashboard', icon: 'mdi:mdi-view-dashboard', to: '/' },
  { title: 'Data', type: 'subheader' },
  { title: 'Manage Team', icon: 'mdi:mdi-account-group', to: '/team' },
  { title: 'Contacts', icon: 'mdi:mdi-contacts', to: '/contacts' },
  { title: 'Invoices Balances', icon: 'mdi:mdi-receipt', to: '/invoices' },
  { title: 'Pages', type: 'subheader' },
  { title: 'Profile Form', icon: 'mdi:mdi-account', to: '/form' },
  { title: 'Calendar', icon: 'mdi:mdi-calendar-today', to: '/calendar' },
  { title: 'FAQ Page', icon: 'mdi:mdi-frequently-asked-questions', to: '/faq' },
  { title: 'Charts', type: 'subheader' },
  { title: 'Bar Chart', icon: 'mdi:mdi-chart-bar', to: '/bar' },
  { title: 'Pie Chart', icon: 'mdi:mdi-chart-pie', to: '/pie' },
  { title: 'Line Chart', icon: 'mdi:mdi-chart-line', to: '/line' },
  { title: 'Geography Chart', icon: 'mdi:mdi-map', to: '/geo' },
]
</script>

<template>
  <v-navigation-drawer color="#1F2A40">
    <v-list>
      <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" title="John Leider"
        subtitle="john@google.com">
        <template v-slot:append>
          <v-btn size="small" variant="text" icon="mdi:mdi-menu-down"></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list :lines="false" nav>
      <template v-for="(item) in items" :key="item.title">
        <v-list-subheader v-if="item.type === 'subheader'" :title="item.title" />
        <v-list-item v-else active-color="secondary" :to="item.to">
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>