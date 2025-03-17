'use client';

import { Toaster } from 'react-hot-toast';
import WhatsAppConnection from '@/components/WhatsAppConnection';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">IAgenda Dashboard</h1>
        <WhatsAppConnection />
      </div>
    </div>
  );
} 