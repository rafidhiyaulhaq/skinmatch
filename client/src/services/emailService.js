import axios from 'axios';
import { fintrackService } from './fintrackService';

const FINTRACKIT_API = 'https://api.fintrackit.my.id/v1';

class EmailService {
  async sendEmail({ recipientEmail, subject, body }) {
    try {
      const headers = await fintrackService.getAuthHeaders();
      
      const response = await axios.post(
        `${FINTRACKIT_API}/secure/send-email`,
        {
          recipient_email: recipientEmail,
          subject,
          body
        },
        { headers }
      );

      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      if (error.response?.status === 401) {
        // Token might be expired, clear it and retry once
        fintrackService.accessToken = null;
        fintrackService.tokenExpiry = null;
        
        try {
          const headers = await fintrackService.getAuthHeaders();
          const response = await axios.post(
            `${FINTRACKIT_API}/secure/send-email`,
            {
              recipient_email: recipientEmail,
              subject,
              body
            },
            { headers }
          );
          return response.data;
        } catch (retryError) {
          console.error('Failed to send email after token refresh:', retryError);
          throw new Error('Failed to send email after token refresh');
        }
      }
      throw new Error(error.response?.data?.message || 'Failed to send email');
    }
  }

  // Test method
  async testEmailService(testEmail) {
    try {
      const result = await this.sendEmail({
        recipientEmail: testEmail,
        subject: 'Test Email from SkinMatch',
        body: '<h1>Test Email</h1><p>This is a test email from SkinMatch integration.</p>'
      });
      console.log('Test email sent successfully:', result);
      return true;
    } catch (error) {
      console.error('Test email failed:', error);
      return false;
    }
  }
}

export const emailService = new EmailService();