<script lang="ts" setup>
import { useTheme } from 'vuetify'
import { DateSelectArg, formatDate } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'

interface CalendarEvent { id: string, title: string, start: string }

const theme = useTheme()
const color = colorTokens[theme.global.name.value as 'dark' | 'light']

const currentEvents = ref<CalendarEvent[]>([])

const setEvents = (events: any[]) => { currentEvents.value = events }

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

const handleEventClick = (selected: any) => {
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
  eventClick: handleEventClick,
  eventsSet: setEvents,
  initialEvents: [
    { id: '1234', title: 'All-day event', date: '2023-02-14' },
    { id: '4321', title: 'Timed event', date: '2023-02-28' },
  ],
  eventColor: color.greenAccent[500],
  eventTextColor: color.grey[900]
}

</script>

<template>
  <VContainer>
    <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
    <VContainer>
      <VRow justify="space-between">
        <VCol cols="3" class="bg-surface">
          <VList>
            <VListSubheader>Events</VListSubheader>

            <VListItem v-for="(item) in currentEvents" :key="item.id" :title="item.title" :subtitle="formatDate(item.start, {
              month: 'long',
              year: 'numeric',
              day: 'numeric',
            })" active-color="secondary" class="bg-secondary mb-4" rounded="xl">
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
