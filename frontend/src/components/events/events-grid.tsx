'use client';

import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import { Event } from "@/features/event/types/event";
import { breakpointColumns } from "./constants";
import EventCard from "./event-card";

interface EventsGridProps {
  events: Event[];
}

export default function EventsGrid({ events }: EventsGridProps) {
  return (
    <>
      <div className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
            <h2 className="text-xl font-semibold text-white/80">More Events</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
          </motion.div>
        </div>
      </div>

      <div className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-5 w-auto"
            columnClassName="pl-5 bg-clip-padding"
          >
            {events.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </Masonry>
        </div>
      </div>
    </>
  );
}
