'use client';

import { useState, useEffect, memo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, useMotionValue } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import Navbar from "@/components/shared/navbar";
import { eventService } from "@/features/event/api/event-service";
import { bookingService } from "@/features/booking/api/booking-service";
import { formatDate } from "@/components/events/constants";
import { CustomCursor, CursorTrail } from "@/components/home";
import { FloatingChat } from "@/components/chat";
import { useAuth } from "@/components/providers/auth-provider";

const MemoizedNavbar = memo(Navbar);

function CursorWrapper() {
  const [cursorTrail, setCursorTrail] = useState<CursorTrail[]>([]);
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const uniqueId = Date.now() + Math.random();
      setCursorTrail(prev => {
        const newTrail = [...prev, { id: uniqueId, x: e.clientX, y: e.clientY }];
        return newTrail.slice(-12);
      });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const checkHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isHoverTarget = target.closest('a, button, [role="button"], input, textarea, select, [data-hover]');
      setIsHovering(!!isHoverTarget);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', checkHover);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', checkHover);
    };
  }, [cursorX, cursorY]);

  return (
    <CustomCursor
      cursorX={cursorX}
      cursorY={cursorY}
      cursorTrail={cursorTrail}
      isClicking={isClicking}
      isHovering={isHovering}
    />
  );
}

export default function EventDetail() {
  const params = useParams();
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState(1);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ['event', params.id],
    queryFn: async () => {
      const response = await eventService.getEventById(params.id as string);
      if (response.statusCode === 200 && response.payload) {
        return response.payload;
      }
      throw new Error('Event not found');
    },
  });

  const isPastEvent = event ? new Date(event.datetime) < new Date() : false;

  const createBookingMutation = useMutation({
    mutationFn: async ({ userId, eventId, quantity }: { userId: string; eventId: string; quantity: number }) => {
      const response = await bookingService.createBooking({ userId, eventId, quantity });
      if (response.statusCode === 200 || response.statusCode === 201) {
        return response.payload;
      }
      throw new Error(response.error || 'Failed to create booking');
    },
    onSuccess: () => {
      setBookingSuccess(true);
      setBookingError(null);
      setTimeout(() => {
        router.push('/booking');
      }, 2000);
    },
    onError: (error: Error) => {
      setBookingError(error.message);
      setBookingSuccess(false);
    },
  });

  const handleBookNow = () => {
    if (!isAuthenticated || !user) {
      router.push(`/login?redirect=/event/${params.id}`);
      return;
    }

    if (!event) return;

    setBookingError(null);
    createBookingMutation.mutate({
      userId: user.userId,
      eventId: event.id,
      quantity: selectedSeats,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center cursor-none">
        <CursorWrapper />
        <motion.div
          className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    );
  }

  if (!event || error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 cursor-none">
        <CursorWrapper />
        <MemoizedNavbar />
        <h1 className="text-2xl font-bold">{error ? (error instanceof Error ? error.message : String(error)) : "Event not found"}</h1>
        <button
          onClick={() => router.push('/event')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors cursor-none"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const formattedDate = formatDate(event.datetime);
  const totalPrice = event.price * selectedSeats;

  return (
    <div className="h-screen bg-black text-white cursor-none [&_a]:cursor-none [&_button]:cursor-none overflow-hidden">
      <CursorWrapper />
      <MemoizedNavbar />

      <div className="absolute inset-0">
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
      </div>

      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute top-20 left-8 lg:left-12 z-20 flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-none group"
        onClick={() => router.push('/event')}
      >
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm">Back to Events</span>
      </motion.button>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-8 lg:p-12 pb-16 lg:pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex-1 max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-4 text-white/50 text-sm">
                <span className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  {event.location}
                </span>
                <span>•</span>
                <span>{formattedDate.date} {formattedDate.month}</span>
                <span>•</span>
                <span>{formattedDate.time}</span>
                <span>•</span>
                <span>{event.durationMinutes} min</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {event.title}
              </h1>

              <p className="text-white/50 text-lg leading-relaxed max-w-xl">
                {event.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="lg:w-96"
            >
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-3xl font-bold">${event.price}</div>
                    <div className="text-white/40 text-sm">per person</div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedSeats(Math.max(1, selectedSeats - 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors cursor-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-2xl font-bold w-8 text-center">{selectedSeats}</span>
                    <button
                      onClick={() => setSelectedSeats(Math.min(event.seatsAvailable, selectedSeats + 1))}
                      className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors cursor-none"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-4 border-t border-white/10 mb-6">
                  <span className="text-white/40">Total</span>
                  <span className="text-2xl font-bold">${totalPrice}</span>
                </div>

                {bookingError && (
                  <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                    {bookingError}
                  </div>
                )}

                {bookingSuccess && (
                  <div className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-400 text-sm flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Booking confirmed! Redirecting...
                  </div>
                )}

                <motion.button
                  className={`w-full py-4 rounded-xl font-semibold cursor-none flex items-center justify-center gap-2 ${
                    bookingSuccess
                      ? 'bg-green-600'
                      : isPastEvent
                      ? 'bg-gray-600 cursor-not-allowed'
                      : createBookingMutation.isPending
                      ? 'bg-purple-600/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-fuchsia-600'
                  } text-white`}
                  whileHover={!createBookingMutation.isPending && !bookingSuccess && !isPastEvent ? { scale: 1.02 } : {}}
                  whileTap={!createBookingMutation.isPending && !bookingSuccess && !isPastEvent ? { scale: 0.98 } : {}}
                  onClick={handleBookNow}
                  disabled={createBookingMutation.isPending || bookingSuccess || isPastEvent}
                >
                  {createBookingMutation.isPending ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing...
                    </>
                  ) : bookingSuccess ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Booked!
                    </>
                  ) : isPastEvent ? (
                    'Event Has Ended'
                  ) : !isAuthenticated ? (
                    'Sign In to Book'
                  ) : (
                    'Book Now'
                  )}
                </motion.button>

                <div className="mt-4 text-center text-sm text-white/30">
                  {event.seatsAvailable}/{event.capacity} seats remaining
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <FloatingChat />
    </div>
  );
}
