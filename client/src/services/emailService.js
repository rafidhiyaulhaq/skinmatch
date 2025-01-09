import axios from 'axios';
import { fintrackService } from './fintrackService';
import { toast } from 'react-toastify';

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
      if (error.response?.status === 401) {
        // Token expired, clear it and retry once
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
          toast.error('Gagal mengirim email setelah refresh token');
          throw new Error('Failed to send email after token refresh');
        }
      }

      if (error.response?.status === 429) {
        toast.warn('Batas rate limit tercapai, mencoba kembali dalam beberapa saat...');
        await fintrackService.handleRateLimit();
        return this.sendEmail({ recipientEmail, subject, body });
      }

      console.error('Error sending email:', error);
      toast.error('Gagal mengirim email');
      throw new Error(error.response?.data?.message || 'Failed to send email');
    }
  }

  async testEmailService(testEmail) {
    try {
      const result = await this.sendEmail({
        recipientEmail: testEmail,
        subject: 'Test Email dari SkinMatch',
        body: '<h1>Test Email</h1><p>Ini adalah email test dari integrasi SkinMatch.</p>'
      });
      
      console.log('Test email berhasil dikirim:', result);
      toast.success('Email test berhasil dikirim');
      return true;
    } catch (error) {
      console.error('Test email gagal:', error);
      toast.error('Gagal mengirim email test');
      return false;
    }
  }

  async sendResultEmail(userData, quizResult) {
    try {
      const emailTemplate = generateQuizResultEmail(userData, quizResult);
      await this.sendEmail({
        recipientEmail: userData.email,
        subject: 'Hasil Analisis Kulit SkinMatch Anda',
        body: emailTemplate
      });
      
      toast.success('Hasil analisis telah dikirim ke email Anda');
      return true;
    } catch (error) {
      console.error('Failed to send result email:', error);
      toast.error('Gagal mengirim hasil ke email');
      return false;
    }
  }
}

export const emailService = new EmailService();