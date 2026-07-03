"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useStoredUser } from '../../utils/user';
import { useI18n } from '../../providers/I18nProvider';

interface RoomDetails {
  roomId: number;
  branchId: number;
  roomName: string;
  tvNum: number;
  boardNum: number;
  socketNum: number;
  projectorNum: number;
  imgUrl: string | null;
  capacity: number;
  description: string;
}

interface AvailabilitySlot {
  availId: number;
  startTime: string;
  endTime: string;
  status: 'free' | 'reserved' | 'pending';
  reserveId: string | null;
}

interface RoomDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  roomId: number | null;
  branchId: number;
}

export default function RoomDetailPanel({ isOpen, onClose, roomId, branchId }: RoomDetailPanelProps) {
  const { t } = useI18n();
  const user = useStoredUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    return new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format in local timezone
  });
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [imgSrc, setImgSrc] = useState<string>('');

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Fetch Room Details
  useEffect(() => {
    if (!isOpen || !roomId) {
      setRoomDetails(null);
      setAvailability([]);
      setError(null);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${backendUrl}/api/rooms/details?roomId=${roomId}&branchId=${branchId}`);
        if (!res.ok) {
          throw new Error('Room details currently unavailable');
        }
        const json = await res.json();
        if (json.success && json.data) {
          setRoomDetails(json.data);
          setImgSrc(json.data.imgUrl || `/api/assets/3D/${json.data.roomId}`);
        } else {
          throw new Error('Room details currently unavailable');
        }
      } catch (err: any) {
        setError(err.message || 'Failed to fetch details');
        setRoomDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, roomId, branchId, backendUrl]);

  // Fetch Availability if capacity > 0 and logged in
  useEffect(() => {
    if (!isOpen || !roomDetails || roomDetails.capacity <= 0 || !user) {
      setAvailability([]);
      return;
    }

    const fetchAvailability = async () => {
      try {
        const res = await fetch(
          `${backendUrl}/api/rooms/availability?roomId=${roomDetails.roomId}&date=${selectedDate}`
        );
        if (!res.ok) {
          throw new Error('Failed to fetch availability');
        }
        const json = await res.json();
        if (json.success && json.data) {
          setAvailability(json.data);
        }
      } catch (err) {
        console.error('Availability fetch error:', err);
      }
    };

    fetchAvailability();
  }, [isOpen, roomDetails, selectedDate, user, backendUrl]);

  // Handle fallback when 3D image fails to load
  const handleImageError = () => {
    // Falls back to a default visual representation if missing
    setImgSrc('');
  };

  const formatTime = (timeStr: string) => {
    // 08:00:00 -> 08:00
    return timeStr.slice(0, 5);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'free':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'reserved':
        return 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default:
        return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'free':
        return t('common.available') || 'Available';
      case 'reserved':
        return t('common.reserved') || 'Reserved';
      case 'pending':
        return t('common.pending') || 'Pending';
      default:
        return status;
    }
  };

  const cleanRoomName = (name: string) => {
    if (!name) return '';
    return name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        onClick={onClose}
        className={`fixed top-[84px] inset-x-0 bottom-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Slide-out drawer panel */}
      <div
        className={`fixed top-[84px] right-0 h-[calc(100vh-84px)] w-full sm:w-[450px] bg-[#FFF8EB] dark:bg-neutral-900 border-l border-[#C5C6CD] dark:border-neutral-800 shadow-2xl transition-transform duration-300 ease-in-out z-40 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            {roomDetails ? cleanRoomName(roomDetails.roomName) : ''}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="Close panel"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {loading && (
            <div className="flex flex-col items-center justify-center py-10 space-y-2">
              <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm text-neutral-500">Loading details...</p>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-sm">
              <p className="font-semibold">Error</p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {!loading && !error && roomDetails && (
            <div className="space-y-6">
              {/* 3D Visualization Visual */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center">
                {imgSrc ? (
                  <img
                    src={imgSrc}
                    alt={`${roomDetails.roomName} 3D visualization`}
                    className="w-full h-full object-cover transition-opacity duration-300"
                    onError={handleImageError}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-4 text-center text-neutral-400 dark:text-neutral-500 space-y-2">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                    <span className="text-xs font-medium uppercase tracking-wider">3D Preview Offline</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                  {t('Description')}
                </h3>
                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                  {roomDetails.description || 'No description available for this study space.'}
                </p>
              </div>

              {/* Room Stats (Conditional on Capacity > 0) */}
              {roomDetails.capacity > 0 ? (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Room Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Capacity */}
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex flex-col justify-center">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('floor_map.panel.capacity')}</span>
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {roomDetails.capacity} {t('floor_map.panel.people')}
                      </span>
                    </div>

                    {/* Sockets */}
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex flex-col justify-center">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('floor_map.panel.sockets')}</span>
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {roomDetails.socketNum || t('floor_map.panel.none')}
                      </span>
                    </div>

                    {/* TV Screens */}
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex flex-col justify-center">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('floor_map.panel.tv')}</span>
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {roomDetails.tvNum || t('floor_map.panel.none')}
                      </span>
                    </div>

                    {/* Whiteboard */}
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex flex-col justify-center">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('floor_map.panel.whiteboard')}</span>
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {roomDetails.boardNum || t('floor_map.panel.none')}
                      </span>
                    </div>

                    {/* Projectors */}
                    <div className="p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800 flex flex-col justify-center">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">{t('floor_map.panel.projector')}</span>
                      <span className="text-sm font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                        {roomDetails.projectorNum || t('floor_map.panel.none')}
                      </span>
                    </div>
                  </div>

                  {/* Booking / Availability Section */}
                  <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-4">
                    {user ? (
                      <>
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                            {t('floor_map.panel.available_slots')}
                          </h3>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="text-xs px-2 py-1 rounded-md border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                          />
                        </div>

                        {/* Availability list */}
                        {availability.length > 0 ? (
                          <div className="divide-y divide-neutral-100 dark:divide-neutral-800 border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden bg-neutral-50/50 dark:bg-neutral-800/30">
                            {availability.map((slot) => (
                              <div key={slot.availId} className="flex items-center justify-between p-3">
                                <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                                  {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                                </div>
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${getStatusColor(slot.status)}`}>
                                  {getStatusText(slot.status)}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-neutral-500 text-center py-4">No availability slots loaded for this date.</p>
                        )}

                        {/* Book CTA redirect */}
                        <div className="pt-2">
                          <Link href={`/library/reserve?roomId=${roomDetails.roomId}`} className="block w-full">
                            <button className="w-full py-2.5 px-4 rounded-lg bg-[#FFF] dark:bg-[#FFF] text-[#000] dark:text-[#000] font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all border border-neutral-300 dark:border-neutral-700 shadow-sm flex items-center justify-center gap-2">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                              </svg>
                              {t('floor_map.panel.book_now')}
                            </button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="p-4 text-center rounded-lg bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200/50 dark:border-amber-900/30">
                        <svg className="w-8 h-8 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <p className="mt-2 text-sm font-medium text-neutral-800 dark:text-neutral-300">
                          {t('floor_map.panel.please_login')}
                        </p>
                        <Link href="/login" className="inline-block mt-3 text-xs font-semibold text-cyan-600 hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300">
                          Sign in to LIMA Account &rarr;
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
