'use client';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getLumaEvents } from '@/app/[locale]/(helpers)/getLumaEvents';
import EventsGrid from '@/components/EventsGrid';

interface Event {
  id: string;
  name: string;
  description: string;
  start_date: string;
  formatted_start_date: string;
  duration: string;
  location: string;
  media_url?: string; // Hacer opcional para evitar error de tipos
  register_link: string;
  event_type: string;
  cost: string;
  capacity?: number;
  city: string;
}

interface EventsByDate {
  [date: string]: Event[];
}

const EventsLuma = () => {
  const t = useTranslations('Events');
  const [events, setEvents] = useState<Event[]>([]);
  const [eventsByDate, setEventsByDate] = useState<EventsByDate>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 Obteniendo eventos de Luma...');
        console.log('📍 Haciendo fetch a: /api/luma-events');
        
        const lumaEvents = await getLumaEvents();
        
        console.log('📊 Respuesta completa de la API:', lumaEvents);
        console.log('📈 Número total de eventos recibidos:', lumaEvents.length);
        
        if (lumaEvents.length === 0) {
          console.log('⚠️ No se encontraron eventos próximos en Luma');
          console.log('🕒 Fecha actual para comparación:', new Date().toISOString());
          setEvents([]);
          setEventsByDate({});
          return;
        }
        
        // Mostrar detalles de cada evento para debugging
        lumaEvents.forEach((event, index) => {
          console.log(`📅 Evento ${index + 1}:`, {
            name: event.name,
            start_date: event.start_date,
            formatted_date: event.formatted_start_date
          });
        });
        
        // Deduplicar eventos por ID para evitar duplicados
        const uniqueEvents = lumaEvents.filter((event, index, self) => 
          index === self.findIndex(e => e.id === event.id)
        );
        
        if (uniqueEvents.length !== lumaEvents.length) {
          console.log(`⚠️ Se encontraron ${lumaEvents.length - uniqueEvents.length} eventos duplicados, removidos`);
        }
        
        console.log(`✅ ${uniqueEvents.length} eventos únicos obtenidos de Luma`);
        setEvents(uniqueEvents);
        
        // Agrupar eventos por fecha
        const grouped = uniqueEvents.reduce((acc: EventsByDate, event) => {
          const eventDate = new Date(event.start_date);
          const dateKey = eventDate.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'America/Bogota'
          });
          
          if (!acc[dateKey]) {
            acc[dateKey] = [];
          }
          acc[dateKey].push(event);
          return acc;
        }, {});
        
        setEventsByDate(grouped);
        
      } catch (error) {
        console.error('❌ Error fetching events from Luma:', error);
        setError(error instanceof Error ? error.message : 'Error desconocido');
        setEvents([]);
        setEventsByDate({});
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Bogota'
      });
    } catch {
      return '';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4"></div>
          <p className="text-gray-500">Cargando eventos próximos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="bg-white dark:bg-zinc-900 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
            {t('Title')}
          </h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="text-red-600 text-xl mb-2">⚠️ Error de conexión</div>
            <p className="text-red-700 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-zinc-900 py-12 px-4 pt-20">
  <div className="w-full">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold mb-8 text-black dark:text-white">
            Próximos eventos Colombia Tech Week
          </h1>
        </div>
        
        {Object.keys(eventsByDate).length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <p className="text-2xl text-gray-700 dark:text-gray-300 mb-2">
              No hay eventos próximos disponibles
            </p>
            <p className="text-gray-500">
              Los próximos eventos aparecerán aquí cuando sean publicados en Luma
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {Object.entries(eventsByDate).map(([date, dateEvents], dateIndex) => {
              // Extraer día y mes de la fecha
              const eventDate = new Date(dateEvents[0].start_date);
              const day = eventDate.getDate();
              const month = eventDate.toLocaleDateString('es-ES', { month: 'short' });
              const weekday = eventDate.toLocaleDateString('es-ES', { weekday: 'long' });
              return (
                <div key={date} className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10">
                  {/* Columna de fecha fija (sticky) */}
                  <div className="flex-shrink-0 w-full md:w-28 text-center md:sticky md:top-20 z-10">
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-md py-2 px-0 md:px-2 mb-2 md:mb-0">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white">
                        {day}
                      </div>
                      <div className="text-base text-gray-500 uppercase tracking-wide">
                        {month}
                      </div>
                      <div className="text-xs text-gray-400 capitalize mt-1">
                        {weekday}
                      </div>
                    </div>
                  </div>
                  {/* Eventos en fila horizontal */}
                  <div className="flex-1 w-full">
                    <div className="flex flex-row gap-6 md:gap-8 pb-4 md:pb-0 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 snap-x snap-mandatory w-full">
                      {dateEvents.map((event, eventIndex) => (
                        <div
                          key={`${event.id}-${eventIndex}`}
                          className="min-w-[280px] w-[85vw] sm:w-[340px] md:w-[400px] max-w-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow overflow-hidden flex flex-col snap-center"
                          style={{ flex: '0 0 auto' }}
                        >
                          {/* Imagen del evento */}
                          <div className="h-40 w-full relative">
                            {event.media_url && event.media_url !== '/images/default-event.png' ? (
                              <img 
                                src={event.media_url} 
                                alt={event.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-2xl">
                                  {event.event_type === 'online' ? '🌐' : 
                                   event.event_type === 'hybrid' ? '🔗' : '📅'}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Contenido del evento */}
                          <div className="flex-1 flex flex-col p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {formatTime(event.start_date)}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200">
                                {event.event_type === 'online' ? '🌐 Virtual' : 
                                 event.event_type === 'hybrid' ? '🔗 Híbrido' : '📍 Presencial'}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                              {event.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">
                              {event.description}
                            </p>
                            <div className="flex flex-wrap gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                              <span className="flex items-center gap-1">
                                <span>📍</span>
                                {event.location}
                              </span>
                              {/* No mostrar capacidad si es 'Sin límite' */}
                              {event.capacity ? (
                                <span className="flex items-center gap-1">
                                  <span>👥</span>
                                  {`${event.capacity} personas`}
                                </span>
                              ) : null}
                            </div>
                            <div className="flex gap-2 mb-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                event.cost === 'Evento Gratuito' 
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                                  : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              }`}>
                                {event.cost}
                              </span>
                            </div>
                            <div className="mt-auto flex justify-end">
                              <a 
                                href={event.register_link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 text-sm font-medium transition-colors"
                              >
                                Ver evento →
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default EventsLuma;
