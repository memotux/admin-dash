<script lang="ts" setup>
const headData = {
  title: 'Dashboard',
  description: 'Welcome to your dashboard'
}
useSeoMeta(headData)

const { data: lineChart, pending: pendingLine } = await useAsyncData('Linechart', () => queryContent('/data/line').findOne())
const { data: barChart, pending: pendingBar } = await useAsyncData('barchart', () => queryContent('/data/bar').findOne())
const { data: transactions } = await useAsyncData('transactions', () => queryContent('/data/transactions').findOne())
</script>

<template>
  <VContainer>
    <VRow align="center">
      <VCol>
        <Header v-bind="headData" />
      </VCol>
      <VCol class="text-right">
        <VBtn
          color="blueAccent-700"
          append-icon="fa-solid fa-download">Download Reports
        </VBtn>
      </VCol>
    </VRow>
    <VRow align="center">
      <VCol cols="3">
        <StatBox
          class="bg-primary-400 rounded-lg ma-2"
          title="12,361"
          subtitle="Emails Sent"
          :progress="75"
          increase="+14%"
          icon="fa-regular fa-envelope" />
      </VCol>
      <VCol cols="3">
        <StatBox
          class="bg-primary-400 rounded-lg ma-2"
          title="431,225"
          subtitle="Sales Obtained"
          :progress="50"
          increase="+21%"
          icon="fa-solid fa-cash-register" />
      </VCol>
      <VCol cols="3">
        <StatBox
          class="bg-primary-400 rounded-lg ma-2"
          title="32,441"
          subtitle="New Clients"
          :progress="30"
          increase="+5%"
          icon="fa-solid fa-person" />
      </VCol>
      <VCol cols="3">
        <StatBox
          class="bg-primary-400 rounded-lg ma-2"
          title="1,325,134"
          subtitle="Traffic Received"
          :progress="80"
          increase="+43%"
          icon="fa-solid fa-traffic-light" />
      </VCol>
    </VRow>
    <VRow align="center">
      <VCol cols="8">
        <VContainer class="bg-primary-400 rounded-lg ma-2">
          <VRow justify="space-between" align="stretch">
            <VCol cols="3">
              <h3>Revenue Generated</h3>
              <p class="text-h4 font-weight-bold text-greenAccent-500 mb-8">$59,342.32</p>
            </VCol>
            <VCol cols="3" class="text-right">
              <VBtn
                color="secondary"
                variant="plain"
                icon="fa-solid fa-download" />
            </VCol>
          </VRow>
          <VProgressCircular
            v-if="pendingLine || !lineChart"
            size="100"
            color="warning"
            indeterminate />
          <LineGraph v-else :data="lineChart.line" is-dashboard />
        </VContainer>
      </VCol>
      <VCol cols="4">
        <VContainer class="bg-primary-400 rounded-lg ma-2">
          <h3 class="mb-8">Recent Transactions</h3>
          <VList lines="one" rounded="lg" height="30vh">
            <VListItem
              v-for="item in transactions!.transactions"
              :key="item.txId">
              <VRow>
                <VCol>
                  <h4 class="text-secondary">{{ item.txId }}</h4>
                  <p>{{ item.user }}</p>
                </VCol>
                <VCol class="text-center">
                  <VListItemTitle>{{ item.date }}</VListItemTitle>
                </VCol>
                <VCol class="text-right">
                  <VChip color="secondary" size="large">$ {{ item.cost }}</VChip>
                </VCol>
              </VRow>
            </VListItem>
          </VList>
        </VContainer>
      </VCol>
    </VRow>
    <VRow align="center">
      <VCol cols="4">
        <VContainer class="bg-primary-400 rounded-lg ma-2 text-center">
          <h3 class="mb-4">Campaign</h3>
          <VProgressCircular
            size="125"
            width="20"
            :model-value="75"
            bg-color="blueAccent-700"
            color="secondary"
            class="mb-3" />
          <p class="text-h6 mb-3 text-secondary">$48,352 revenue generated</p>
          <p>Includes extra misc expenditures and costs.</p>
        </VContainer>
      </VCol>
      <VCol cols="4">
        <VContainer class="bg-primary-400 rounded-lg ma-2 text-center">
          <h3 class="mb-4">Sales Quantity</h3>
          <VProgressCircular
            v-if="pendingBar || !barChart"
            size="100"
            color="warning"
            indeterminate />
          <BarGraph v-else :data="barChart.bar" is-dashboard />
        </VContainer>
      </VCol>
      <VCol cols="4">
        <VContainer class="bg-primary-400 rounded-lg ma-2 text-center">
          <h3 class="mb-4">Geography Based Traffic</h3>
          <VProgressCircular size="100" color="warning" indeterminate />
        </VContainer>
      </VCol>
    </VRow>
  </VContainer>
</template>
