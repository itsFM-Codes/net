package tpa.network.eventservice.application.query.handler;

import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import tpa.network.eventservice.application.mapper.EventMapper;
import tpa.network.eventservice.domain.port.in.query.SearchEventByTitleQuery;
import tpa.network.eventservice.domain.port.out.query.EventQueryRepositoryPort;
import tpa.network.eventservice.domain.readmodel.EventReadModel;

@Slf4j
@Service
@RequiredArgsConstructor
public class SearchEventByTitleQueryHandler implements SearchEventByTitleQuery {
    private final EventQueryRepositoryPort queryRepository;
    private final EventMapper mapper;

    private static final double MINIMUM_SIMILARITY_THRESHOLD = 0.3;

    @Override
    public SearchEventByTitleResponse execute(SearchEventByTitleRequest request) {
        log.info("Executing SearchEventByTitleQuery for title: {}", request.searchTitle());

        var allEvents = queryRepository.findAll()
                .stream()
                .map(mapper::toReadModel)
                .toList();

        if (allEvents.isEmpty()) {
            log.warn("No events found in the system");
            return new SearchEventByTitleResponse(null, 0.0, List.of());
        }

        var searchTitleLower = request.searchTitle().toLowerCase().trim();

        var scoredEvents = allEvents.stream()
                .map(event -> new ScoredEvent(event, calculateSimilarity(searchTitleLower, event.getTitle().toLowerCase())))
                .sorted(Comparator.comparingDouble(ScoredEvent::score).reversed())
                .collect(Collectors.toList());

        var bestMatch = scoredEvents.get(0);
        
        log.info("Best match for '{}': '{}' with similarity score: {}", 
                request.searchTitle(), bestMatch.event().getTitle(), bestMatch.score());

        var alternatives = scoredEvents.stream()
                .skip(1)
                .filter(se -> se.score() >= MINIMUM_SIMILARITY_THRESHOLD)
                .limit(3)
                .map(ScoredEvent::event)
                .collect(Collectors.toList());

        return new SearchEventByTitleResponse(
                bestMatch.event(),
                bestMatch.score(),
                alternatives
        );
    }

    private record ScoredEvent(EventReadModel event, double score) { }

    private double calculateSimilarity(String search, String target) {
        if (search.equals(target)) {
            return 1.0;
        }

        if (target.contains(search) || search.contains(target)) {
            var lengthRatio = (double) Math.min(search.length(), target.length()) 
                    / Math.max(search.length(), target.length());
            return 0.8 + (0.2 * lengthRatio);
        }

        var levenshteinSimilarity = calculateLevenshteinSimilarity(search, target);
        var wordSimilarity = calculateWordSimilarity(search, target);

        return (0.6 * levenshteinSimilarity) + (0.4 * wordSimilarity);
    }

    private double calculateLevenshteinSimilarity(String s1, String s2) {
        var distance = levenshteinDistance(s1, s2);
        var maxLength = Math.max(s1.length(), s2.length());
        if (maxLength == 0) return 1.0;
        return 1.0 - ((double) distance / maxLength);
    }

    private int levenshteinDistance(String s1, String s2) {
        var dp = new int[s1.length() + 1][s2.length() + 1];

        for (var i = 0; i <= s1.length(); i++) {
            dp[i][0] = i;
        }
        for (var j = 0; j <= s2.length(); j++) {
            dp[0][j] = j;
        }

        for (var i = 1; i <= s1.length(); i++) {
            for (var j = 1; j <= s2.length(); j++) {
                var cost = (s1.charAt(i - 1) == s2.charAt(j - 1)) ? 0 : 1;
                dp[i][j] = Math.min(
                        Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1),
                        dp[i - 1][j - 1] + cost
                );
            }
        }

        return dp[s1.length()][s2.length()];
    }

    private double calculateWordSimilarity(String s1, String s2) {
        var words1 = Arrays.stream(s1.split("\\s+")).collect(Collectors.toSet());
        var words2 = Arrays.stream(s2.split("\\s+")).collect(Collectors.toSet());

        var commonWords = words1.stream().filter(words2::contains).count();
        var totalUniqueWords = (int) Stream.concat(words1.stream(), words2.stream())
                .distinct()
                .count();

        if (totalUniqueWords == 0) return 0.0;
        return (double) commonWords / totalUniqueWords;
    }
}
