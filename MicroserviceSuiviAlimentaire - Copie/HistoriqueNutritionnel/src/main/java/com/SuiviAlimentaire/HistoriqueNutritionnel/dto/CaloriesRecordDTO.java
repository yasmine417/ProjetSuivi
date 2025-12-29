package com.SuiviAlimentaire.HistoriqueNutritionnel.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CaloriesRecordDTO {
    private Long id;
    private String mealName;
    private Double calories;
    private Double proteins;
    private Double carbs;
    private Double fat;
    private String ocrText;
    private LocalDateTime createdAt;
    private String recommendations;
}
