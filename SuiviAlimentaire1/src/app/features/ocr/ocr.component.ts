import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OcrIaService } from '../../core/services/ocr-ia.service';
import { OcrService } from '../../core/services/ocr.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-ocr',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.scss']
})
export class OcrComponent {

  selectedFile: File | null = null;
  mealName = '';
  ocrText = '';
  loading = false;
  error = '';

  constructor(
    private ocrIaService: OcrIaService,
    private ocrService: OcrService,
    private router: Router
  ) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  sendOcr() {

    if (!this.selectedFile && (!this.mealName || !this.ocrText)) {
      this.error = 'Veuillez sélectionner une image ou remplir le repas et le texte OCR.';
      return;
    }

    this.loading = true;
    this.error = '';

    if (this.selectedFile) {

      this.ocrIaService.uploadImage(this.selectedFile).subscribe({
        next: res => {
          this.mealName = res.mealName;
          this.ocrText = res.ocrText;


          this.router.navigate(['/user/ia-calories'], { state: { mealName: this.mealName, ocrText: this.ocrText } });
          this.loading = false;
        },
        error: err => {
          this.error = 'Erreur lors de l’OCR';
          console.error(err);
          this.loading = false;
        }
      });
    } else {

      this.ocrService.sendOcr({
        mealName: this.mealName,
        ocrText: this.ocrText
      }).subscribe({
        next: () => {


          this.router.navigate(
            ['/user/ia-calories'],
            { state: { mealName: this.mealName, ocrText: this.ocrText } }
          );

          this.loading = false;
        },
        error: err => {
          console.error(err);
          this.error = 'Erreur lors de l’envoi des données OCR vers Kafka.';
          this.loading = false;
        }
      });

    }

  }

}
