package com.SuiviAlimentaire.OCRIngestion.kafka;

import com.SuiviAlimentaire.OCRIngestion.dto.OcrResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OcrProducer {

    private final KafkaTemplate<String, OcrResultDTO> kafkaTemplate;

    public void sendOcrResult(OcrResultDTO dto) {
        kafkaTemplate.send("OCR_RESULT", dto);
        System.out.println("📤 Message OCR envoyé au topic OCR_RESULT : " + dto.getMealName());
    }
}