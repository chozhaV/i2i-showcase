import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-send-sms',
  imports: [],
  templateUrl: './send-sms.html',
  styleUrl: './send-sms.css'
})
export class SendSmsComponent {
  sms = {
    phoneNumber: '',
    message: ''
  };
  status = '';

  constructor(private http: HttpClient) {}

  sendSMS() {
    this.http.post('http://localhost:3000/send-sms', this.sms)
      .subscribe({
        next: () => this.status = 'SMS sent successfully!',
        error: () => this.status = 'Failed to send SMS.'
      });
  }
}
