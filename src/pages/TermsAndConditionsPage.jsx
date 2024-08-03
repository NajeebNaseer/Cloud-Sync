import React from 'react';

function TermsAndConditionsPage() {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4 py-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-purple-600">Terms and Conditions</h2>
        <div className="prose prose-gray">
          <h3 className="font-bold text-xl">1. Introduction</h3>
          <p>Welcome to Cloud Sync. These Terms and Conditions ("Terms") govern your access to and use of our cloud services platform ("Service"). By accessing or using our Service, you agree to comply with and be bound by these Terms.</p>

          <h3 className="font-bold text-xl">2. Use of the Service</h3>
          <p>You must be at least 18 years old to use our Service. By using our Service, you represent and warrant that you meet this age requirement.</p>
          <p>You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. Notify us immediately of any unauthorized use of your account.</p>
          <p>You agree not to use our Service for any unlawful purpose, including but not limited to:</p>
          <ul>
            <li>Violating any local, state, or national laws.</li>
            <li>Attempting to gain unauthorized access to our systems or networks.</li>
            <li>Distributing or transmitting any malicious software or content.</li>
          </ul>

          <h3 className="font-bold text-xl">3. Intellectual Property Rights</h3>
          <p>All content, trademarks, and other intellectual property rights associated with our Service are owned by Cloud Sync or our licensors. You are granted a limited, non-exclusive, non-transferable license to use our Service for personal or business purposes.</p>
          <p>You may not copy, modify, distribute, or create derivative works of our Service without prior written permission from us.</p>

          <h3 className="font-bold text-xl">4. Service Availability</h3>
          <p>We strive to provide continuous and reliable access to our Service. However, we do not guarantee that the Service will be uninterrupted or error-free.</p>
          <p>We may perform maintenance or updates to our Service, which may temporarily affect availability. We will make reasonable efforts to notify you of any planned maintenance.</p>

          <h3 className="font-bold text-xl">5. Data Privacy and Security</h3>
          <p>We collect personal information as described in our Privacy Policy. By using our Service, you consent to the collection and use of your data as outlined in the Privacy Policy.</p>
          <p>We implement security measures to protect your data. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>

          <h3 className="font-bold text-xl">6. Fees and Payments</h3>
          <p>Our Service fees are outlined on our website. We may update our pricing and fees from time to time. Any changes will be communicated to you in advance.</p>
          <p>Payments are due as specified in your subscription plan. You are responsible for ensuring that payment information is accurate and up-to-date.</p>

          <h3 className="font-bold text-xl">7. Termination</h3>
          <p>You may terminate your account at any time by following the process outlined in your account settings.</p>
          <p>We reserve the right to suspend or terminate your access to our Service if you violate these Terms or engage in activities that harm our Service or other users.</p>

          <h3 className="font-bold text-xl">8. Limitation of Liability</h3>
          <p>To the fullest extent permitted by law, Cloud Sync shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from or related to your use of our Service, even if we have been advised of the possibility of such damages.</p>

          <h3 className="font-bold text-xl">9. Changes to Terms and Conditions</h3>
          <p>We may update these Terms from time to time. The updated Terms will be posted on our website. Your continued use of our Service after any changes signifies your acceptance of the revised Terms.</p>

          <h3 className="font-bold text-xl">10. Governing Law</h3>
          <p>These Terms are governed by and construed in accordance with the laws of the State of Punjab, Pakistan. Any disputes arising from or related to these Terms shall be resolved in the courts located in Lahore, Punjab, Pakistan.</p>

          <h3 className="font-bold text-xl">11. Contact Information</h3>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <ul>
            <li><strong>Email:</strong> support@cloudsync.com</li>
            <li><strong>Phone:</strong> +92 42 123-4567</li>
            <li><strong>Address:</strong>123 Cloud Sync, Main Boulevard Gulberg, Lahore, Punjab, Pakistan</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditionsPage;
