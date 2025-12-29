package com.SuiviAlimentaire.HistoriqueNutritionnel.dto;

public class RepasStat {
    private int totalMeals;
    private double totalCalories;
    private double avgCalories;

    public int getTotalMeals() { return totalMeals; }
    public void setTotalMeals(int totalMeals) { this.totalMeals = totalMeals; }

    public double getTotalCalories() { return totalCalories; }
    public void setTotalCalories(double totalCalories) { this.totalCalories = totalCalories; }

    public double getAvgCalories() { return avgCalories; }
    public void setAvgCalories(double avgCalories) { this.avgCalories = avgCalories; }
}