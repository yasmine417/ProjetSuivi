package com.SuiviAlimentaire.IACalories.kafka;


import com.SuiviAlimentaire.IACalories.dto.OcrResultDTO;
import com.SuiviAlimentaire.IACalories.service.CaloriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OcrResultConsumer {

    private final CaloriesService caloriesService;

    @KafkaListener(topics = "OCR_RESULT", groupId = "calories-group")
    public void consume(OcrResultDTO message) {
        caloriesService.processAndSave(message);
        System.out.println("📥 Message traité : " + message.getMealName());
    }
}
