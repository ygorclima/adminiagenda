import axios from 'axios';
import { CreateInstanceResponse, InstanceStatus } from '@/types/whatsapp';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EVOLUTION_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'apikey': process.env.EVOLUTION_API_KEY,
  },
});

export const whatsappService = {
  async createInstance(instanceName: string) {
    const response = await api.post<CreateInstanceResponse>('/instance/create', {
      instanceName,
      token: process.env.EVOLUTION_API_KEY,
    });
    return response.data;
  },

  async getInstanceStatus(instanceName: string) {
    const response = await api.get<InstanceStatus>(`/instance/connectionState/${instanceName}`);
    return response.data;
  },

  async deleteInstance(instanceName: string) {
    const response = await api.delete(`/instance/delete/${instanceName}`);
    return response.data;
  },

  async disconnectInstance(instanceName: string) {
    const response = await api.delete(`/instance/logout/${instanceName}`);
    return response.data;
  },
}; 