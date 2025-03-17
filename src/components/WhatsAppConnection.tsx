import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import toast from 'react-hot-toast';
import { whatsappService } from '@/services/whatsappService';
import { WhatsAppInstance } from '@/types/whatsapp';

export default function WhatsAppConnection() {
  const [instance, setInstance] = useState<WhatsAppInstance | null>(null);
  const [loading, setLoading] = useState(false);

  const createInstance = async () => {
    try {
      setLoading(true);
      const instanceName = `user_${Date.now()}`; // You might want to use a more meaningful name
      const response = await whatsappService.createInstance(instanceName);
      setInstance({
        instanceName: response.instance.instanceName,
        status: response.instance.status,
        qrcode: response.instance.qrcode,
      });
      toast.success('WhatsApp instance created successfully');
    } catch (error) {
      toast.error('Failed to create WhatsApp instance');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkInstanceStatus = async () => {
    if (!instance?.instanceName) return;

    try {
      const response = await whatsappService.getInstanceStatus(instance.instanceName);
      setInstance(prev => ({
        ...prev!,
        status: response.instance.status,
      }));
    } catch (error) {
      console.error('Failed to check instance status:', error);
    }
  };

  const disconnectInstance = async () => {
    if (!instance?.instanceName) return;

    try {
      setLoading(true);
      await whatsappService.disconnectInstance(instance.instanceName);
      setInstance(null);
      toast.success('WhatsApp disconnected successfully');
    } catch (error) {
      toast.error('Failed to disconnect WhatsApp');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const statusInterval = setInterval(checkInstanceStatus, 5000);
    return () => clearInterval(statusInterval);
  }, [instance?.instanceName]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">WhatsApp Connection</h2>
      
      {!instance && (
        <button
          onClick={createInstance}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Connect WhatsApp'}
        </button>
      )}

      {instance && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Status: {instance.status}</p>
              <p className="text-sm text-gray-600">Instance: {instance.instanceName}</p>
            </div>
            <button
              onClick={disconnectInstance}
              disabled={loading}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
            >
              Disconnect
            </button>
          </div>

          {instance.qrcode && instance.status !== 'connected' && (
            <div className="flex flex-col items-center space-y-4 p-4 border rounded">
              <p className="text-sm text-gray-600">Scan this QR code with your WhatsApp</p>
              <QRCodeSVG value={instance.qrcode} size={256} />
            </div>
          )}
        </div>
      )}
    </div>
  );
} 