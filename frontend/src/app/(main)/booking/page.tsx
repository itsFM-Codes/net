'use client';

import { useState, useEffect, memo, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Navbar from "@/components/shared/navbar";
import { bookingService } from "@/features/booking/api/booking-service";
import { LoadingSpinner } from "@/components/events";
import { CustomCursor, CursorTrail } from "@/components/home";
import { FloatingChat } from "@/components/chat";
import { useAuth } from "@/components/providers/auth-provider";
import {
  BookingCardCompact,
  EmptyBookings,
  LoginPrompt,
  BookingsBackground,
} from "@/components/bookings";
import { BookingWithEvent } from "@/features/booking/types/booking-with-event";

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



export default function BookingsPage() {
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('all');

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', user?.userId],
    queryFn: async () => {
      if (!user?.userId) {
        throw new Error('User not authenticated');
      }
      const response = await bookingService.getBookingsByUserId(user.userId);
      if (response.statusCode === 200 && response.payload) {
        return response.payload;
      }
      throw new Error(response.error || 'Failed to load bookings');
    },
    enabled: isAuthenticated && !!user?.userId,
  });

  const cancelBookingMutation = useMutation({
    mutationFn: async (bookingId: string) => {
      const response = await bookingService.deleteBooking({ id: bookingId });
      if (response.statusCode !== 200) {
        throw new Error(response.error || 'Failed to cancel booking');
      }
      return response.payload;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings', user?.userId] });
    },
  });

  const handleCancelBooking = useCallback((bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      cancelBookingMutation.mutate(bookingId);
    }
  }, [cancelBookingMutation]);

  const bookings = data || [];
  const now = new Date();
  
  const upcomingBookings = bookings.filter((b: BookingWithEvent) => 
    b.eventDatetime && new Date(b.eventDatetime) >= now
  ).sort((a: BookingWithEvent, b: BookingWithEvent) => 
    new Date(a.eventDatetime).getTime() - new Date(b.eventDatetime).getTime()
  );
  
  const pastBookings = bookings.filter((b: BookingWithEvent) => 
    !b.eventDatetime || new Date(b.eventDatetime) < now
  ).sort((a: BookingWithEvent, b: BookingWithEvent) => 
    new Date(b.eventDatetime).getTime() - new Date(a.eventDatetime).getTime()
  );

  const filteredBookings = filter === 'upcoming' ? upcomingBookings 
    : filter === 'past' ? pastBookings 
    : [...upcomingBookings, ...pastBookings];

  if (authLoading || (isAuthenticated && isLoading)) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white cursor-none">
        <CursorWrapper />
        <MemoizedNavbar />
        <BookingsBackground />
        <div className="relative z-10 pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <LoginPrompt />
          </div>
        </div>
        <FloatingChat />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] text-white cursor-none">
        <CursorWrapper />
        <MemoizedNavbar />
        <BookingsBackground />
        <div className="relative z-10 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-white/40 text-sm">{error instanceof Error ? error.message : 'Please try again later.'}</p>
          </div>
        </div>
        <FloatingChat />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white cursor-none [&_a]:cursor-none [&_button]:cursor-none">
      <BookingsBackground />
      <CursorWrapper />
      <MemoizedNavbar />

      <div className="relative z-10 pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div>
                <p className="text-purple-400/70 text-xs md:text-sm tracking-[0.3em] uppercase mb-3">
                  Your Journey
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 leading-tight">
                  My{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                    Bookings
                  </span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-2xl">
                  Track your upcoming cosmic adventures and manage your reservations
                </p>
              </div>
              <Link href="/event">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 hover:from-purple-500/30 hover:to-fuchsia-500/30 text-white font-medium rounded-xl border border-purple-500/30 transition-all duration-300 cursor-none shadow-lg shadow-purple-500/10"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Browse Events
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-fuchsia-500/0 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {bookings.length === 0 ? (
            <EmptyBookings />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex gap-1 mb-6"
              >
                {[
                  { key: 'all', label: 'All', count: bookings.length },
                  { key: 'upcoming', label: 'Upcoming', count: upcomingBookings.length },
                  { key: 'past', label: 'Past', count: pastBookings.length },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setFilter(tab.key as typeof filter)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all cursor-none ${
                      filter === tab.key
                        ? 'bg-purple-500/20 text-purple-300'
                        : 'text-white/40 hover:text-white/60 hover:bg-white/[0.03]'
                    }`}
                  >
                    {tab.label}
                    <span className={`ml-1.5 ${filter === tab.key ? 'text-purple-400/70' : 'text-white/20'}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="space-y-2"
              >
                {filteredBookings.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20 px-4"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/[0.02] border border-white/10 mb-4">
                      <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-white/60 mb-2">No {filter} bookings found</h3>
                    <p className="text-white/30 text-sm">Your {filter} bookings will appear here</p>
                  </motion.div>
                ) : (
                  filteredBookings.map((booking: BookingWithEvent, index: number) => (
                    <BookingCardCompact
                      key={booking.id}
                      booking={booking}
                      index={index}
                      onCancelBooking={handleCancelBooking}
                    />
                  ))
                )}
              </motion.div>
            </>
          )}
        </div>
      </div>

      <FloatingChat />
    </div>
  );
}

