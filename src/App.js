import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './404';
import ClientDashboard from './pages/ClientDashboard';
import AdminDashboard from './pages/AdminDashboard';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUpPage';
import UserProfile from './pages/UserProfile';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import TermsAndConditionsPage from './pages/TermsAndConditionsPage';
import VPSBasic from './pages/packages/VPS/VPSBasic';
import VPSStandard from './pages/packages/VPS/VPSStandard';
import VPSPremium from './pages/packages/VPS/VPSPremium';
import CSBasic from './pages/packages/CS/CSBasic';
import CSStandard from './pages/packages/CS/CSStandard';
import CSPremium from './pages/packages/CS/CSPremium';
import WHBasic from './pages/packages/WH/WHBasic';
import WHStandard from './pages/packages/WH/WHStandard';
import WHPremium from './pages/packages/WH/WHPremium';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <div>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
              <Route path="/TermsAndConditions" element={<TermsAndConditionsPage />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/client/dashboard" element={<ClientDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/VPSBasic" element={<VPSBasic />} />
              <Route path="/VPSStandard" element={<VPSStandard />} />
              <Route path="/VPSPremium" element={<VPSPremium />} />
              <Route path="/WHBasic" element={<WHBasic />} />
              <Route path="/WHStandard" element={<WHStandard />} />
              <Route path="/WHPremium" element={<WHPremium />} />
              <Route path="/CSBasic" element={<CSBasic />} />
              <Route path="/CSStandard" element={<CSStandard />} />
              <Route path="/CSPremium" element={<CSPremium />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
};

export default App;
