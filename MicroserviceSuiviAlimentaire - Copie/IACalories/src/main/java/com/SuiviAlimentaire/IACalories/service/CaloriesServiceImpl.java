package com.SuiviAlimentaire.IACalories.service;

import com.SuiviAlimentaire.IACalories.dto.OcrResultDTO;
import com.SuiviAlimentaire.IACalories.entities.CaloriesRecord;
import com.SuiviAlimentaire.IACalories.repository.CaloriesRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CaloriesServiceImpl implements CaloriesService {

    private final PythonAIClient pythonAIClient; // Appel à FastAPI
    private final CaloriesRecordRepository caloriesRepo; // ⚡ Ajout du repository




    @Override
    public CaloriesRecord processAndSave(OcrResultDTO dto) {

        PythonAIClient.NutritionPrediction prediction = pythonAIClient.predictNutrition(
                dto.getMealName(),
                dto.getOcrText()
        );

        // Convertir la liste de recommandations en JSON
        String recommendationsJson = "";
        try {
            ObjectMapper mapper = new ObjectMapper();
            recommendationsJson = mapper.writeValueAsString(prediction.getRecommendations());
        } catch (Exception e) {
            e.printStackTrace();
            recommendationsJson = "[]";
        }

        // Créer un objet CaloriesRecord et le sauvegarder
        CaloriesRecord record = CaloriesRecord.builder()
                .mealName(dto.getMealName())
                .calories(prediction.getCalories())
                .proteins(prediction.getProteins())
                .carbs(prediction.getCarbs())
                .fat(prediction.getFat())
                .ocrText(dto.getOcrText())
                .createdAt(LocalDateTime.now())
                .recommendations(prediction.getRecommendations() != null ? prediction.getRecommendations().toString() : "")
                .build();

        return caloriesRepo.save(record);

    }


    @Override
    public List<CaloriesRecord> getAll() {
        return caloriesRepo.findAll();
    }
}
