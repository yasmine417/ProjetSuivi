package com.SuiviAlimentaire.IACalories.controller;

import com.SuiviAlimentaire.IACalories.dto.OcrResultDTO;
import com.SuiviAlimentaire.IACalories.entities.CaloriesRecord;
import com.SuiviAlimentaire.IACalories.service.CaloriesService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calories")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class CaloriesController {

    private final CaloriesService caloriesService;

    @GetMapping
    public List<CaloriesRecord> getAll() {
        return caloriesService.getAll();
    }
    @GetMapping("/")
    public List<CaloriesRecord> root() {
        return caloriesService.getAll();
    }
    @GetMapping("/history")
    public List<CaloriesRecord> getHistory() {
        return caloriesService.getAll();
    }
    @PostMapping("/calculate")
    public CaloriesRecord calculate(@RequestBody OcrResultDTO dto) {
        // Simule le même traitement que le Kafka consumer
        return caloriesService.processAndSave(dto);
    }

}
