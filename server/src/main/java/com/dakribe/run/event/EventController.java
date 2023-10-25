package com.dakribe.run.event;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;


@RestController()
@RequestMapping("/api/events")
public class EventController {
    EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("/")
    Iterable<Event> all() {
        return this.eventService.list();
    }

    @GetMapping("/{id}")
    Optional<Event> byId(@PathVariable UUID id) {
        return this.eventService.findEventById(id);
    }

    @PostMapping("/")
    Event create(@RequestBody Event event) {
        return this.eventService.createEvent(event);
    }

    @DeleteMapping("/{id}")
    ResponseEntity<String> delete(@PathVariable UUID id) {
       this.eventService.deleteEvent(id);
       return ResponseEntity.ok("Event deleted");
    }

}
