import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lastappointment',
  templateUrl: './lastappointment.component.html',
  styleUrls: ['./lastappointment.component.css']
})
export class LastappointmentComponent implements OnInit {
  appointment: any = history.state?.appointment ?? null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!this.appointment) {
      const state = this.router.getCurrentNavigation()?.extras.state as { appointment?: any } | undefined;
      this.appointment = state?.appointment ?? history.state?.appointment ?? null;
    }
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  bookAnother(): void {
    this.router.navigate(['/appointment']);
  }
}
