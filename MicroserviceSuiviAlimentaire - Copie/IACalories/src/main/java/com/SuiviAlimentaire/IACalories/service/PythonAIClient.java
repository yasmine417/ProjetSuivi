package com.SuiviAlimentaire.IACalories.service;

import lombok.Data;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PythonAIClient {

    private final WebClient webClient;

    public PythonAIClient() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:5000") // ton FastAPI
                .build();
    }

    public NutritionPrediction predictNutrition(String mealName, String ocrText) {
        try {
            Map<String, String> request = new HashMap<>();
            // ⚠️ Clés correctes attendues par FastAPI : text et mealName
            request.put("text", ocrText != null ? ocrText : "");
            request.put("mealName", mealName != null ? mealName : "");

            NutritionPrediction prediction = webClient.post()
                    .uri("/predict")
                    .bodyValue(request)
                    .retrieve()
                    .bodyToMono(NutritionPrediction.class)
                    .block();

            return prediction != null ? prediction : getDefaultPrediction();
        } catch (Exception e) {
            System.err.println("⚠️ Erreur lors de l'appel à l'API Python: " + e.getMessage());
            return getDefaultPrediction();
        }
    }


    private NutritionPrediction getDefaultPrediction() {
        NutritionPrediction prediction = new NutritionPrediction();
        prediction.setCalories(200.0);
        prediction.setProteins(10.0);
        prediction.setCarbs(25.0);
        prediction.setFat(8.0);
        return prediction;
    }

    @Data
    public static class NutritionPrediction {
        private Double calories;
        private Double proteins;
        private Double carbs;
        private Double fat;
        private List<String> recommendations;           // depuis FastAPI
        private List<Map<String, Object>> meal_suggestions; // depuis FastAPI
    }


}
