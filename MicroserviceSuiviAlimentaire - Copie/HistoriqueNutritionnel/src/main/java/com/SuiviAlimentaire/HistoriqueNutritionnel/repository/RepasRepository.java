package com.SuiviAlimentaire.HistoriqueNutritionnel.repository;



import com.SuiviAlimentaire.HistoriqueNutritionnel.entity.Repas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RepasRepository extends JpaRepository<Repas, Long> {
    List<Repas> findByUserId(Long userId);
}