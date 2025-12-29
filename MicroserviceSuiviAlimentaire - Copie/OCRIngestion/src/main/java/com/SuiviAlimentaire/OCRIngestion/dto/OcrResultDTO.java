package com.SuiviAlimentaire.OCRIngestion.dto;

import lombok.Data;

@Data
public class OcrResultDTO {
    private String mealName;   // Exemple: "pizza fromage"
    private String ocrText;    // Texte complet OCR
}
