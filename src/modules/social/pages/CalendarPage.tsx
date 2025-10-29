// src\modules\social\pages\CalendarPage.tsx
"use client";

import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Button } from "@/components/ui/button";

export default function CalendarPage() {
  const [events, setEvents] = useState([
    { id: "1", title: "Facebook Post - Product Launch", date: "2025-10-25" },
    { id: "2", title: "Instagram Reel - Teaser", date: "2025-10-27" },
    { id: "3", title: "LinkedIn Update - Blog Share", date: "2025-10-28" },
  ]);

  function handleDateClick(info: any) {
    alert(`Clicked date: ${info.dateStr}`);
  }

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden bg-white dark:bg-neutral-950">
      {/* Sub Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Calendar</h1>
        <Button size="sm" variant="outline">
          Add Post
        </Button>
      </div>

      {/* Main Content */}
      <main className="overflow-y-auto p-6">
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
          height="auto"
          headerToolbar={{
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,dayGridWeek",
          }}
          eventDisplay="block"
          eventClassNames="bg-blue-500 text-white text-xs rounded px-1 py-0.5"
        />
      </main>
    </div>
  );
}
