package com.SuiviAlimentaire.OCRIngestion.service;

import net.sourceforge.tess4j.ITesseract;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@Service
public class OcrImageService {

    public String extractText(MultipartFile image) {
        try {
            File tempFile = File.createTempFile("ocr-", image.getOriginalFilename());
            image.transferTo(tempFile);

            ITesseract tesseract = new Tesseract();
            tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata");
            tesseract.setLanguage("fra+eng");
            tesseract.setOcrEngineMode(1);


            tesseract.setPageSegMode(3);

            return tesseract.doOCR(tempFile);

        } catch (Exception e) {
            throw new RuntimeException("Erreur OCR", e);
        }
    }
}
