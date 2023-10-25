package com.dakribe.run.event;

import com.dakribe.run.event.exception.EventNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
       this.eventRepository = eventRepository;
    }

    public Event createEvent(Event event) {
      return eventRepository.save(event);
    }

    public Iterable<Event> list() {
        return eventRepository.findAll();
    }

    Optional<Event> findEventById(UUID id) {
        return eventRepository.findById(id);
    }

    public void deleteEvent(UUID id) {
        Event event = eventRepository.findById(id).orElse(null);
        if (event == null) {
            throw new EventNotFoundException("Event with id " + id + " not found");
        }

        eventRepository.deleteById(id);
    }

}
