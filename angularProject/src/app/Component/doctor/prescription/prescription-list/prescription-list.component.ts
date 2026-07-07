import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from '../prescription.service';
import { Prescription } from '../prescription.model';
import { Router } from '@angular/router';
import { ApiResponse } from '../../../../util/api.response.model';

@Component({
  selector: 'app-prescription-list',
  templateUrl: './prescription-list.component.html',
  styleUrls: ['./prescription-list.component.css']
})
export class PrescriptionListComponent implements OnInit {

  prescriptions: Prescription[] = [];

  constructor(
    private prescriptionService: PrescriptionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchPrescriptions();
  }

  fetchPrescriptions(): void {
    this.prescriptionService.getAllPrescriptions().subscribe({
      next: (response: ApiResponse) => {
        const prescriptions = response?.data?.['prescriptions'];
        this.prescriptions = Array.isArray(prescriptions) ? prescriptions : [];
      },
      error: (error: any) => {
        console.error('Error fetching prescriptions:', error);
      }
    });
  }

  getMedicineItems(prescription: Prescription): any[] {
    if (Array.isArray(prescription.medicines) && prescription.medicines.length) {
      return prescription.medicines;
    }

    if (Array.isArray(prescription.medicine)) {
      return prescription.medicine;
    }

    return [];
  }

  getMedicineText(prescription: Prescription): string {
    return this.getMedicineItems(prescription)
      .map((medicine: any) => `${medicine.medicineName} (${medicine.medicineStrength})`)
      .join(', ');
  }

  getTestItems(prescription: Prescription): any[] {
    if (Array.isArray(prescription.TestEntityList) && prescription.TestEntityList.length) {
      return prescription.TestEntityList;
    }

    if (Array.isArray(prescription.test)) {
      return prescription.test;
    }

    if (prescription.test) {
      return [prescription.test];
    }

    return [];
  }

  getTestText(prescription: Prescription): string {
    return this.getTestItems(prescription)
      .map((test: any) => test.testName)
      .join(', ');
  }

  viewPrescription(id: number): void {
    // Navigates to the prescription view page
    this.router.navigate([`/prescriptions/${id}`]);
  }

  printPrescription(prescription: Prescription): void {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Prescription</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h2 { text-align: center; }
              table { width: 100%; border-collapse: collapse; }
              th, td { border: 1px solid #000; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h2>Prescription ID: ${prescription.id}</h2>
            <h4>Patient: ${prescription.patient?.name || prescription.user?.name || 'N/A'}</h4>
            <h4>Medicines:</h4>
            <p>${this.getMedicineText(prescription) || 'None'}</p>
            <h4>Tests:</h4>
            <p>${this.getTestText(prescription) || 'None'}</p>
            <h4>Notes:</h4>
            <p>${prescription.notes}</p>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  }
}
