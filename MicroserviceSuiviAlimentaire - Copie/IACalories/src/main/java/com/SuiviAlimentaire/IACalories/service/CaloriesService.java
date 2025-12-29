package com.SuiviAlimentaire.IACalories.service;

import com.SuiviAlimentaire.IACalories.dto.OcrResultDTO;
import com.SuiviAlimentaire.IACalories.entities.CaloriesRecord;

import java.util.List;

public interface CaloriesService {

    CaloriesRecord processAndSave(OcrResultDTO dto);

    List<CaloriesRecord> getAll();
}
