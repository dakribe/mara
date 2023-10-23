package com.dakribe.run.event;

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

    Optional<Event> read(UUID id) {
        return eventRepository.findById(id);
    }

}
