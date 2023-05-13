import { differenceInDays, formatISO, add } from "date-fns"
import { Calendar } from "@fullcalendar/core"
import dayGridPlugin from "@fullcalendar/daygrid"

export default function createCalendar() {
  const today = new Date()

  const events = [
    {
      name: "Murder Mystery Night",
      start: add(today, { days: 2, hours: 5 }),
      end: add(today, { days: 2, hours: 8 }),
    },
    {
      name: "Gorgonzola Enthusiasts Conference",
      start: add(today, { days: 5 }),
      end: add(today, { days: 7 }),
    },
    {
      name: "Dragon Appreciation Day",
      start: add(today, { days: 12 }),
      end: add(today, { days: 12 }),
    },
    {
      name: "Circus Skills Workshop",
      start: add(today, { days: 15 }),
      end: add(today, { days: 16 }),
    },
    {
      name: "Couch Sitting Competition",
      start: add(today, { days: 20 }),
      end: add(today, { days: 21 }),
    },
    {
      name: "Three Week Rustic Retreat",
      start: add(today, { days: 25 }),
      end: add(today, { days: 45 }),
    },
  ]

  const eventsList = document.getElementById("events-list")
  const calendarEl = document.getElementById("calendar")
  /**
   * @type {NodeListOf<HTMLDivElement>}
   */
  const calenderEvents = document.querySelectorAll(".fc-event")

  if (!calendarEl || !eventsList || !calenderEvents) return

  const calendar = new Calendar(calendarEl, {
    plugins: [dayGridPlugin],
    initialView: "dayGridMonth",
    events: events.map((event) => ({
      title: event.name,
      start: formatISO(event.start),
      end: formatISO(event.end),
    })),
  })

  calendar.render()

  calendarEl.style.backgroundColor = "black"
  calendarEl.style.padding = "1rem"
  calendarEl.style.opacity = "0.8"
  calendarEl.style.borderRadius = "0.5rem"
  calendarEl.style.margin = "1rem"

  calenderEvents.forEach((event) => {
    event.style.whiteSpace = "normal"
    event.style.fontSize = "1.5rem"
    event.style.textAlign = "center"
    event.style.padding = "0.5rem"
    event.style.borderRadius = "0.5rem"
  })

  eventsList.style.display = "grid"
  eventsList.style.gap = "1rem"
  eventsList.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))"
  eventsList.style.maxWidth = "80vw"
  eventsList.style.margin = "1rem"
  events.forEach((event) => {
    const daysRemaining = differenceInDays(event.start, today)
    const listItem = document.createElement("li")
    listItem.textContent = `${event.name} is in ${daysRemaining} days`
    listItem.style.padding = "1rem"
    listItem.style.backgroundColor = daysRemaining < 7 ? "red" : "green"
    listItem.style.color = "white"
    listItem.style.borderRadius = "0.5rem"
    listItem.style.textAlign = "center"
    listItem.style.maxWidth = "200px"
    eventsList?.appendChild(listItem)
  })
}
