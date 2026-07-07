import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrescriptionService } from '../prescription.service';
import { Prescription } from '../prescription.model';
import { ApiResponse } from '../../../../util/api.response.model';

@Component({
  selector: 'app-prescription-view',
  templateUrl: './prescription-view.component.html',
  styleUrls: ['./prescription-view.component.css']
})
export class PrescriptionViewComponent implements OnInit {
  prescription: Prescription | null = null;

  constructor(
    private route: ActivatedRoute,
    private prescriptionService: PrescriptionService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.fetchPrescription(id);
  }

  fetchPrescription(id: number): void {
    this.prescriptionService.getPrescriptionById(id).subscribe({
      next: (response: ApiResponse) => {
        this.prescription = response?.data?.['prescription'] || null;
      },
      error: (error) => {
        console.error('Error fetching prescription:', error);
      }
    });
  }

  getMedicineItems(): any[] {
    if (!this.prescription) {
      return [];
    }

    if (Array.isArray(this.prescription.medicines) && this.prescription.medicines.length) {
      return this.prescription.medicines;
    }

    if (Array.isArray(this.prescription.medicine)) {
      return this.prescription.medicine;
    }

    return [];
  }

  getMedicineText(): string {
    return this.getMedicineItems()
      .map((medicine: any) => `${medicine.medicineName} (${medicine.medicineStrength})`)
      .join(', ');
  }

  getTestItems(): any[] {
    if (!this.prescription) {
      return [];
    }

    if (Array.isArray(this.prescription.TestEntityList) && this.prescription.TestEntityList.length) {
      return this.prescription.TestEntityList;
    }

    if (Array.isArray(this.prescription.test)) {
      return this.prescription.test;
    }

    if (this.prescription.test) {
      return [this.prescription.test];
    }

    return [];
  }

  getTestText(): string {
    return this.getTestItems()
      .map((test: any) => test.testName)
      .join(', ');
  }
}
