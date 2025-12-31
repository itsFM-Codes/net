package tpa.network.eventservice.domain.port.in.query;

import tpa.network.eventservice.domain.readmodel.EventReadModel;

import java.util.List;

public interface GetAllEventsQuery {
    List<EventReadModel> execute();
}
