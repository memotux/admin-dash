<script lang="ts" setup>
const { data: mockDataTeam } = await useAsyncData('team', () => queryContent('/data/team').findOne())

const headers = [
  {
    title: 'Name',
    align: 'start',
    sortable: false,
    key: 'name',
  },
  { title: 'Email', align: 'start', key: 'email' },
  { title: 'Age', align: 'start', key: 'age' },
  { title: 'Phone', align: 'start', key: 'phone', sortable: false, },
  { title: 'Access', align: 'start', key: 'access' },
]

const getColor = (type: string) => {
  return type === 'admin' ? 'greenAccent-600' : 'greenAccent-700'
}
const accessIcons = {
  'admin': 'fa-solid fa-screwdriver-wrench',
  'manager': 'fa-solid fa-shield-halved',
  'user': 'fa-solid fa-lock-open'
}

const headData = {
  title: 'Team',
  description: 'Managing Team Members'
}
useSeoMeta(headData)
</script>

<template>
  <div>
    <Header v-bind="headData" />
    <VContainer>
      <VTable class="elevation-1 rounded bg-primary-400">
        <thead>
          <tr>
            <th v-for="item in headers" :key="item.key">{{ item.title }}</th>
          </tr>
        </thead>
        <tbody v-if="mockDataTeam">
          <tr v-for="item in mockDataTeam.team" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.age }}</td>
            <td>{{ item.phone }}</td>
            <td>
              <VChip
                :color="getColor(item.access)"
                size="large"
                :append-icon="accessIcons[item.access as keyof typeof accessIcons]">
                {{ item.access }}
              </VChip>
            </td>
          </tr>
        </tbody>
      </VTable>
    </VContainer>
  </div>
</template>
