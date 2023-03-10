<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'

import type { DateSelectArg, EventApi, EventClickArg } from '@fullcalendar/core'

const theme = useTheme()

const currentEvents = ref<EventApi[]>([])

const eventsSet = (events: EventApi[]) => { currentEvents.value = events.sort((a, b) => new Date(a.start!).getTime() > new Date(b.start!).getTime() ? 1 : 0) }

const select = (info: DateSelectArg) => {
  const title = prompt("Enter title for new event...")

  const calendarApi = info.view.calendar
  calendarApi.unselect()

  if (title) {
    calendarApi.addEvent({
      id: `${info.startStr}-${title}`,
      title,
      start: info.start || undefined,
      end: info.end || undefined,
      allDay: info.allDay
    })
  }
}

const eventClick = (selected: EventClickArg) => {
  if (confirm(`Delete event: ${selected.event.title}`)) {
    selected.event.remove()
  }
}

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
  },
  initialView: 'dayGridMonth',
  editable: true,
  selectable: true,
  selectMirror: true,
  // dayMaxEvent: true,
  select,
  eventClick,
  eventsSet,
  initialEvents: [
    { id: '1234', title: 'All-day event', date: '2023-02-14' },
    { id: '4321', title: 'Timed event', date: '2023-02-28' },
  ],
  eventColor: theme.current.value.colors['greenAccent-500'],
  eventTextColor: theme.current.value.colors['grey-900']
}

const headData = {
  title: 'Calendar',
  description: 'Full Calendar Interactive Page'
}
useSeoMeta(headData)

const formatSubtitle = (date: string) => formatDate(date, {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
})

</script>

<template>
  <VContainer>
    <Header v-bind="headData" />
    <VContainer>
      <VRow justify="space-between">
        <VCol cols="3" class="bg-primary-400">
          <VList class="bg-primary-500">
            <VListSubheader>Events</VListSubheader>

            <VListItem
              v-for="(item) in currentEvents"
              :key="item.id"
              :title="item.title"
              :subtitle="formatSubtitle(item.start!.toString())"
              active-color="secondary"
              class="bg-greenAccent-500 mb-4"
              rounded="xl">
            </VListItem>
          </VList>
        </VCol>
        <VCol>
          <FullCalendar height="75vh" :options="calendarOptions" />
        </VCol>
      </VRow>
    </VContainer>
  </VContainer>
</template>
