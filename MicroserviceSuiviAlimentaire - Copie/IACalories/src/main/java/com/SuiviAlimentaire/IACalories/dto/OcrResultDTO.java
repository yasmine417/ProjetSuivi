package com.SuiviAlimentaire.IACalories.dto;

import lombok.Data;

@Data
public class OcrResultDTO {
    private String mealName;   // ex : "sandwich thon"
    private String ocrText;    // texte OCR complet
}
