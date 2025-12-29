package com.SuiviAlimentaire.GestionAliments.repository;



import com.SuiviAlimentaire.GestionAliments.entity.Aliment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlimentRepository extends JpaRepository<Aliment, Long> {
}