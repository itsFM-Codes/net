'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookingWithEvent } from "@/features/booking/types/booking-with-event";

interface BookingCardProps {
  booking: BookingWithEvent;
  index: number;
  onCancelBooking?: (bookingId: string) => void;
}

function formatDate(datetime: string) {
  const date = new Date(datetime);
  return {
    date: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
  };
}

function getEventStatus(datetime: string) {
  const eventDate = new Date(datetime);
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMs < 0) {
    return { status: 'past', label: 'Completed', color: 'text-slate-400', bg: 'bg-slate-500/20', border: 'border-slate-500/30' };
  } else if (diffHours < 24) {
    return { status: 'soon', label: 'Starting Soon', color: 'text-amber-400', bg: 'bg-amber-500/20', border: 'border-amber-500/30' };
  } else if (diffDays < 7) {
    return { status: 'upcoming', label: `In ${diffDays} day${diffDays !== 1 ? 's' : ''}`, color: 'text-green-400', bg: 'bg-green-500/20', border: 'border-green-500/30' };
  } else {
    return { status: 'scheduled', label: `In ${diffDays} days`, color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500/30' };
  }
}

export default function BookingCard({ booking, index, onCancelBooking }: BookingCardProps) {
  const router = useRouter();
  const formattedDate = booking.eventDatetime ? formatDate(booking.eventDatetime) : null;
  const eventStatus = booking.eventDatetime ? getEventStatus(booking.eventDatetime) : null;
  const totalPrice = booking.eventPrice * booking.quantity;

  const handleViewEvent = () => {
    router.push(`/event/${booking.eventId}`);
  };

  return (
    <motion.div
      className="group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-fuchsia-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />

        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
            {booking.eventImageUrl ? (
              <>
                <img
                  src={booking.eventImageUrl}
                  alt={booking.eventTitle}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 md:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 flex items-center justify-center">
                <svg className="w-16 h-16 text-purple-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {formattedDate && (
              <div className="absolute top-4 left-4 md:hidden bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10 text-center">
                <div className="text-2xl font-bold leading-none">{formattedDate.date}</div>
                <div className="text-xs uppercase text-purple-400 font-medium">{formattedDate.month}</div>
              </div>
            )}
          </div>

          <div className="flex-1 p-5 md:p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              {eventStatus && (
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${eventStatus.bg} border ${eventStatus.border} ${eventStatus.color} text-xs font-medium`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${eventStatus.status === 'soon' ? 'bg-amber-400 animate-pulse' : eventStatus.status === 'past' ? 'bg-slate-400' : 'bg-green-400'}`} />
                  {eventStatus.label}
                </span>
              )}

              {formattedDate && (
                <div className="hidden md:flex items-center gap-3 text-right">
                  <div>
                    <div className="text-sm text-slate-400">{formattedDate.full}</div>
                    <div className="text-xs text-purple-400">{formattedDate.time}</div>
                  </div>
                  <div className="bg-white/5 rounded-xl px-3 py-2 border border-white/10 text-center">
                    <div className="text-xl font-bold leading-none">{formattedDate.date}</div>
                    <div className="text-[10px] uppercase text-purple-400">{formattedDate.month}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-purple-300 transition-colors">
                {booking.eventTitle}
              </h3>
              {booking.eventLocation && (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{booking.eventLocation}</span>
                  {booking.eventDurationMinutes > 0 && (
                    <>
                      <span className="text-white/30">•</span>
                      <span>{booking.eventDurationMinutes} min</span>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4 py-3 px-4 rounded-xl bg-white/5 border border-white/5">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span className="text-sm">
                  <span className="font-semibold text-white">{booking.quantity}</span>
                  <span className="text-slate-400"> ticket{booking.quantity !== 1 ? 's' : ''}</span>
                </span>
              </div>

              <div className="w-px h-4 bg-white/10" />

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Price per ticket:</span>
                <span className="font-semibold text-white">${booking.eventPrice.toFixed(2)}</span>
              </div>

              <div className="w-px h-4 bg-white/10" />

              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-400">Total:</span>
                <span className="font-bold text-lg bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-auto pt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewEvent}
                className="flex-1 md:flex-none px-5 py-2.5 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-500 hover:to-fuchsia-500 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 cursor-none"
              >
                View Event
              </motion.button>

              {eventStatus?.status !== 'past' && onCancelBooking && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onCancelBooking(booking.id)}
                  className="px-5 py-2.5 border border-red-500/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-red-500/10 cursor-none"
                >
                  Cancel
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-2.5 border border-white/10 hover:border-white/30 rounded-xl text-slate-400 hover:text-white transition-all duration-200 hover:bg-white/5 cursor-none"
                title="Download Ticket"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-white/5 bg-black/20 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Booking ID: <span className="font-mono text-slate-400">{booking.id.slice(0, 8)}...</span>
          </span>
          <span className="text-xs text-slate-500">
            Confirmation sent to your email
          </span>
        </div>
      </div>
    </motion.div>
  );
}
