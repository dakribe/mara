package com.dakribe.run.event;

import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/")
    Event create(@RequestBody Event event) {
        return this.eventService.createEvent(event);
    }

    @DeleteMapping("/{id}")
    void delete(@PathVariable UUID id) {
       this.eventService.deleteById(id);
    }

}
