package com.dakribe.run.event;

import org.springframework.web.bind.annotation.*;


@RestController()
@RequestMapping("/api/events")
public class EventController {
    EventService eventService;

    public EventController(EventService eventService) {
       this.eventService = eventService;
    }

    @PostMapping("/")
    Event create(@RequestBody Event event) {
       return this.eventService.createEvent(event);
    }

}
