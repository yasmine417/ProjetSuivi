package com.SuiviAlimentaire.OCRIngestion.service;

import com.SuiviAlimentaire.OCRIngestion.dto.OcrResultDTO;
import com.SuiviAlimentaire.OCRIngestion.kafka.OcrProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OcrService {

    private final OcrProducer producer;

    public void processOcr(String mealName, String ocrText) {

        OcrResultDTO dto = new OcrResultDTO();
        dto.setMealName(mealName);
        dto.setOcrText(ocrText);

        // envoyer vers Kafka
        producer.sendOcrResult(dto);
    }

}