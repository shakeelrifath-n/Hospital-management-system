import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmenthomeService } from './appointmenthome.service';
import {Root} from "./appointmenthome.model";

@Component({
  selector: 'app-appointmenthome',
  templateUrl: './appointmenthome.component.html',
  styleUrl: './appointmenthome.component.css'
})
export class AppointmenthomeComponent implements OnInit {
  departments: any[] = [];
  doctors: any[] = [];
  appointment: Root = new Root();
  selectedDoctorId?: string;
  selectedDepartmentId?: string;

  constructor(
    private appointmentService: AppointmenthomeService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.loadDepartments();
    this.loadDoctors();
  }

  loadDepartments(): void {
    this.appointmentService.getDepartments().subscribe(
      (data) => {
        this.departments = data;
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }

  loadDoctors(): void {
    this.appointmentService.getDoctors().subscribe(
      (data) => {
        this.doctors = data;
      },
      (error) => {
        console.error('Error fetching doctors', error);
      }
    );
  }

  onDepartmentChange(): void {
    if (!this.selectedDepartmentId) {
      this.loadDoctors();
      return;
    }

    this.appointmentService.getDoctorsByDepartment(this.selectedDepartmentId).subscribe(
      (data) => {
        this.doctors = data;
        this.selectedDoctorId = undefined;
      },
      (error) => {
        console.error('Error fetching doctors by department', error);
      }
    );
  }

  onSubmit(): void {
    if (this.selectedDoctorId && this.selectedDepartmentId) {
      // Find doctor and department from the lists
      const selectedDoctor = this.doctors.find(doc => String(doc.id) === String(this.selectedDoctorId));
      const selectedDepartment = this.departments.find(dep => String(dep.id) === String(this.selectedDepartmentId));
      const formattedTime = this.appointment.appointmentTime
        ? (this.appointment.appointmentTime.length === 5 ? `${this.appointment.appointmentTime}:00` : this.appointment.appointmentTime)
        : null;

      const appointmentPayload = {
        name: this.appointment.patientName,
        email: this.appointment.patientEmail,
        date: this.appointment.appointmentDate,
        time: formattedTime,
        doctor: selectedDoctor ? { id: selectedDoctor.id } : null,
        requestedBy: null,
        notes: selectedDepartment ? selectedDepartment.departmentName : null
      };

      this.appointmentService.createAppointment(appointmentPayload)
        .subscribe({
          next: res => {
            this.router.navigate(['/lastappointment'], { state: { appointment: res?.data?.appointment ?? appointmentPayload } });
          },
          error: error => {
            console.error('Error creating appointment:', error);
          }
        });
    } else {
      alert('Please select both doctor and department.');
    }
  }

}
