package com.SuiviAlimentaire.OCRIngestion.controller;

import com.SuiviAlimentaire.OCRIngestion.dto.OcrResultDTO;
import com.SuiviAlimentaire.OCRIngestion.service.OcrImageService;
import com.SuiviAlimentaire.OCRIngestion.service.OcrService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ocr")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class OcrController {

    private final OcrService ocrService;
    private final OcrImageService ocrImageService;

    @PostMapping("/send")
    public String sendOcr(@RequestBody OcrResultDTO dto) {
        ocrService.processOcr(dto.getMealName(), dto.getOcrText());
        return "OCR envoyé dans Kafka ✔️";
    }

    @PostMapping("/upload")
    public OcrResultDTO uploadImage(@RequestParam("image") MultipartFile image) {
        System.out.println("Image reçue : " + image.getOriginalFilename() + ", taille : " + image.getSize() + " bytes");

        String extractedText = ocrImageService.extractText(image);

        OcrResultDTO dto = new OcrResultDTO();
        dto.setMealName("Repas détecté");
        dto.setOcrText(extractedText);

        ocrService.processOcr(dto.getMealName(), dto.getOcrText());

        System.out.println("OCR terminé : " + extractedText);

        return dto;
    }
    @PostMapping("/test")
    public String testUpload(@RequestParam("image") MultipartFile image) {
        System.out.println("Nom fichier : " + image.getOriginalFilename());
        return "Fichier reçu : " + image.getOriginalFilename();
    }

}
