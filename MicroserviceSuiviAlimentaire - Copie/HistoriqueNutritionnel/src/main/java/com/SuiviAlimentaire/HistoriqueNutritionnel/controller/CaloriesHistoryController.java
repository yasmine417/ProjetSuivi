package com.SuiviAlimentaire.HistoriqueNutritionnel.controller;

import com.SuiviAlimentaire.HistoriqueNutritionnel.dto.CaloriesRecordDTO;
import com.SuiviAlimentaire.HistoriqueNutritionnel.service.CaloriesRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calories-history")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class CaloriesHistoryController {

    private final CaloriesRecordService caloriesRecordService;

    @GetMapping
    public ResponseEntity<List<CaloriesRecordDTO>> getAllHistory() {
        return ResponseEntity.ok(caloriesRecordService.getAllRecords());
    }
}
