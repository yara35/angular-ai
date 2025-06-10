import { Component } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { getDocument } from 'pdfjs-dist';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import { environment } from '../../environments/environment';
import { Auth } from '../AuthService/auth';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UpgradeDialogComponent } from '../upgrade-dialog-component/upgrade-dialog-component';



(pdfjsLib as any).GlobalWorkerOptions.workerSrc = 
  `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js`;

@Component({
  selector: 'app-aiform',
  standalone: true,
  templateUrl: './aiform.html',
  styleUrl: './aiform.css',
  imports:[CommonModule]
})
export class Aiform {
  extractedText: string = '';
  summaryText: string = '';
  loading: boolean = false;

constructor(private authservice: Auth, private router: Router,private dialog: MatDialog){}

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;

    this.loading = true;
    this.summaryText = '';

    try {
      this.extractedText = await this.extractTextFromPDF(file);
    } catch (error) {
      console.error('Error processing PDF:', error);
      this.summaryText = 'Error processing PDF.';
    }

    this.loading = false;
  }

  async extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  let fullText = '';

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(' ');
    fullText += pageText + '\n';
  }
console.log('Extracted Text:', fullText); 
  return fullText;
}


  async onSummarizeClicked() {
    if (!this.extractedText) {
      alert('Please upload a PDF first.');
      return;
    }
    const currentEmail = this.authservice.getcurrentuseremail();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === currentEmail);    
    if (user && user.history.length >= 3 && !user.subscribed) { 
   
      const dialogRef = this.dialog.open(UpgradeDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'upgrade') {
        this.router.navigate(['/packages']);
      }
    });
    return;
    }
   
    this.loading = true;
    this.summaryText = '';

    try {
      this.summaryText = await this.summarizeText(this.extractedText);
      this.saveToHistory(this.extractedText, this.summaryText);
    } catch (error) {
      console.error('Error summarizing text:', error);
      this.summaryText = 'Error summarizing text.';
    }

    this.loading = false;
  }
  
  
  

async summarizeText(text: string): Promise<string> {
  const response = await fetch('https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.huggingfaceToken}`

  },
  body: JSON.stringify({
    inputs: text
  })
});
  const data = await response.json();

  console.log('HuggingFace response:', data);

  if (data.error) {
    throw new Error(`HuggingFace API error: ${data.error}`);
  }

  if (Array.isArray(data) && data.length > 0 && data[0].summary_text) {
    return data[0].summary_text.trim();
  }

  if (data.summary_text) {
    return data.summary_text.trim();
  }

  throw new Error(`Unexpected HuggingFace API response: ${JSON.stringify(data)}`);
}

saveToHistory(originalText: string, summaryText: string) {
  const currentEmail = this.authservice.getcurrentuseremail(); 

  if (!currentEmail) return;

  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const userIndex = users.findIndex((u: any) => u.email === currentEmail);

  if (userIndex === -1) return;

  const newEntry = {
    date: new Date().toISOString(),
    original: originalText.slice(0, 200),
    summary: summaryText
  };

  users[userIndex].history = users[userIndex].history || [];
  users[userIndex].history.push(newEntry);

  localStorage.setItem('users', JSON.stringify(users));
  
}
 


downloadSummaryAsPDF() {
  const doc = new jsPDF();

  const lines = doc.splitTextToSize(this.summaryText, 220); 
  doc.setFontSize(14);
  doc.text(lines, 10, 10);

  doc.save('summary.pdf');
}

goToPackages() {
  this.router.navigate(['/packages']);
}

}
