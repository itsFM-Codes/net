package tpa.network.eventservice.domain.port.in.query;

import java.util.List;

import tpa.network.eventservice.domain.readmodel.EventReadModel;

public interface SearchEventByTitleQuery {
    SearchEventByTitleResponse execute(SearchEventByTitleRequest request);

    record SearchEventByTitleRequest(String searchTitle) { }
    
    record SearchEventByTitleResponse(
            EventReadModel bestMatch,
            double similarityScore,
            List<EventReadModel> alternatives
    ) { }
}
