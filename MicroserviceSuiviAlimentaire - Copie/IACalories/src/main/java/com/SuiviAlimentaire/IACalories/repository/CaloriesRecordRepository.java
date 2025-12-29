package com.SuiviAlimentaire.IACalories.repository;

import com.SuiviAlimentaire.IACalories.entities.CaloriesRecord;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaloriesRecordRepository extends JpaRepository<CaloriesRecord, Long> {
}
