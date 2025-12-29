package com.SuiviAlimentaire.HistoriqueNutritionnel.service;

import com.SuiviAlimentaire.HistoriqueNutritionnel.dto.CaloriesRecordDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CaloriesRecordService {

    private final WebClient webClient = WebClient.builder()
            .baseUrl("http://localhost:8084/api/calories") // ton microservice IA
            .build();

    public List<CaloriesRecordDTO> getAllRecords() {
        CaloriesRecordDTO[] records = webClient.get()
                .uri("/history")
                .retrieve()
                .bodyToMono(CaloriesRecordDTO[].class)
                .block();

        return records != null ? Arrays.asList(records) : List.of();
    }
}
