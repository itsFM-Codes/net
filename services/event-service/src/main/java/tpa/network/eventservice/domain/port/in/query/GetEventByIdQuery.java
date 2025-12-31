package tpa.network.eventservice.domain.port.in.query;

import tpa.network.eventservice.domain.readmodel.EventReadModel;

public interface GetEventByIdQuery {
    EventReadModel execute(GetEventByIdRequest request);

    record GetEventByIdRequest(String eventId) { }
}
