'use client';

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { BookingWithEvent } from "@/features/booking/types/booking-with-event";

interface BookingCardProps {
  booking: BookingWithEvent;
  index: number;
  onCancelBooking?: (bookingId: string) => void;
}

function formatEventDate(datetime: string) {
  const date = new Date(datetime);
  return {
    day: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
    weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
  };
}

function getTimeUntil(datetime: string) {
  const eventDate = new Date(datetime);
  const now = new Date();
  const diffMs = eventDate.getTime() - now.getTime();
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMs < 0) return { label: 'Completed', isPast: true, isUrgent: false };
  if (diffHours < 24) return { label: `${diffHours}h left`, isPast: false, isUrgent: true };
  if (diffDays < 7) return { label: `${diffDays}d left`, isPast: false, isUrgent: false };
  return { label: `${diffDays} days`, isPast: false, isUrgent: false };
}

export default function BookingCardCompact({ booking, index, onCancelBooking }: BookingCardProps) {
  const router = useRouter();
  const dateInfo = booking.eventDatetime ? formatEventDate(booking.eventDatetime) : null;
  const timeInfo = booking.eventDatetime ? getTimeUntil(booking.eventDatetime) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={`group relative ${timeInfo?.isPast ? 'opacity-60' : ''}`}
    >
      <div className="relative flex gap-4 md:gap-6 p-5 md:p-6 rounded-2xl bg-gradient-to-br from-white/[0.03] to-white/[0.01] hover:from-white/[0.06] hover:to-white/[0.02] border border-white/[0.08] hover:border-purple-500/30 transition-all duration-300 overflow-hidden group cursor-none">
        
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-fuchsia-500/0 group-hover:from-purple-500/[0.02] group-hover:via-transparent group-hover:to-fuchsia-500/[0.02] transition-all duration-500 opacity-0 group-hover:opacity-100" />
        
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {dateInfo && (
          <div className="relative z-10 flex-shrink-0 w-20 text-center h-24 md:h-28 flex items-center">
            <div className="relative bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-fuchsia-500/20 rounded-2xl p-3 border border-purple-500/20 shadow-lg shadow-purple-500/5 overflow-hidden w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <div className="text-xs text-purple-400/80 font-semibold tracking-wider">{dateInfo.month}</div>
                <div className="text-3xl font-bold text-white leading-none my-1">{dateInfo.day}</div>
                <div className="text-xs text-white/40">{dateInfo.weekday}</div>
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 flex-shrink-0 w-28 h-24 md:w-32 md:h-28 rounded-2xl overflow-hidden shadow-xl border border-white/10">
          {booking.eventImageUrl ? (
            <img
              src={booking.eventImageUrl}
              alt={booking.eventTitle}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-900/30 via-fuchsia-900/20 to-purple-900/30 flex items-center justify-center backdrop-blur-sm">
              <svg className="w-10 h-10 text-purple-500/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
            </div>
          )}
        </div>

        <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="min-w-0 flex-1">
                <h3 className="font-bold text-lg truncate transition-colors duration-300">
                  <span className="bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute">
                    {booking.eventTitle}
                  </span>
                  <span className="text-white group-hover:opacity-0 transition-opacity duration-300">
                    {booking.eventTitle}
                  </span>
                </h3>
                <div className="flex items-center gap-2 text-sm text-white/50 mt-1.5">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="truncate">{booking.eventLocation}</span>
                  {dateInfo && (
                    <>
                      <span className="text-white/30">•</span>
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{dateInfo.time}</span>
                    </>
                  )}
                </div>
              </div>

              {timeInfo && (
                <span className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-xl font-semibold ${
                  timeInfo.isPast 
                    ? 'bg-white/5 text-white/40 border border-white/5' 
                    : timeInfo.isUrgent 
                      ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/10' 
                      : 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                }`}>
                  {timeInfo.label}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
                <span className="text-white/70">
                  <span className="text-white font-semibold">{booking.quantity}</span> 
                  {booking.quantity === 1 ? ' ticket' : ' tickets'}
                </span>
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
                ${(booking.eventPrice * booking.quantity).toFixed(2)}
              </span>
            </div>

            <div className="flex items-center gap-2 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
              <motion.button
                onClick={() => router.push(`/event/${booking.eventId}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-sm px-4 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 hover:from-purple-500/30 hover:to-fuchsia-500/30 text-purple-300 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-200 cursor-none shadow-lg shadow-purple-500/5"
              >
                View Details
              </motion.button>
              {!timeInfo?.isPast && onCancelBooking && (
                <motion.button
                  onClick={() => onCancelBooking(booking.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-sm px-4 py-2 rounded-xl hover:bg-red-500/20 text-white/50 hover:text-red-400 border border-transparent hover:border-red-500/30 transition-all duration-200 cursor-none"
                >
                  Cancel
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
