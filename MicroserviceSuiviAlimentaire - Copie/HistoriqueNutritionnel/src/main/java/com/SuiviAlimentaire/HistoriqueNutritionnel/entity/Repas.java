package com.SuiviAlimentaire.HistoriqueNutritionnel.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
@Table(name = "repas")
public class Repas {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Long userId;  // Référence à l'utilisateur (géré par le service Authentification)

    @NotNull
    private String type;  // ex: "petit-déjeuner", "déjeuner", etc.

    @NotNull
    private LocalDateTime date;

    private double calories;

    private String nutriments;  // JSON string ou mappez à une entité séparée pour nutriments détaillés

    // Getters et Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public double getCalories() {
        return calories;
    }

    public void setCalories(double calories) {
        this.calories = calories;
    }

    public String getNutriments() {
        return nutriments;
    }

    public void setNutriments(String nutriments) {
        this.nutriments = nutriments;
    }
}