'use client';

import { motion } from "framer-motion";
import { BookingWithEvent } from "@/features/booking/types/booking-with-event";
import BookingCard from "./booking-card";

interface BookingsListProps {
  bookings: BookingWithEvent[];
  onCancelBooking?: (bookingId: string) => void;
}

export default function BookingsList({ bookings, onCancelBooking }: BookingsListProps) {
  const now = new Date();
  const upcomingBookings = bookings.filter(b => 
    b.eventDatetime && new Date(b.eventDatetime) >= now
  );
  const pastBookings = bookings.filter(b => 
    !b.eventDatetime || new Date(b.eventDatetime) < now
  );

  upcomingBookings.sort((a, b) => 
    new Date(a.eventDatetime).getTime() - new Date(b.eventDatetime).getTime()
  );
  pastBookings.sort((a, b) => 
    new Date(b.eventDatetime).getTime() - new Date(a.eventDatetime).getTime()
  );

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
            {bookings.length}
          </div>
          <div className="text-sm text-slate-400 mt-1">Total Bookings</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <div className="text-3xl font-bold text-green-400">
            {upcomingBookings.length}
          </div>
          <div className="text-sm text-slate-400 mt-1">Upcoming</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <div className="text-3xl font-bold text-slate-400">
            {pastBookings.length}
          </div>
          <div className="text-sm text-slate-400 mt-1">Completed</div>
        </div>
        <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
          <div className="text-3xl font-bold text-white">
            {bookings.reduce((sum, b) => sum + b.quantity, 0)}
          </div>
          <div className="text-sm text-slate-400 mt-1">Total Tickets</div>
        </div>
      </motion.div>

      {upcomingBookings.length > 0 && (
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-xl font-semibold mb-4 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-green-400" />
            Upcoming Events
            <span className="text-sm font-normal text-slate-500">({upcomingBookings.length})</span>
          </motion.h2>
          <div className="space-y-4">
            {upcomingBookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                index={index}
                onCancelBooking={onCancelBooking}
              />
            ))}
          </div>
        </div>
      )}

      {pastBookings.length > 0 && (
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-xl font-semibold mb-4 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Past Events
            <span className="text-sm font-normal text-slate-500">({pastBookings.length})</span>
          </motion.h2>
          <div className="space-y-4 opacity-75">
            {pastBookings.map((booking, index) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                index={index + upcomingBookings.length}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
