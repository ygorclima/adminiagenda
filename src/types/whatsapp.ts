export interface WhatsAppInstance {
  instanceName: string;
  status: 'connected' | 'disconnected' | 'connecting';
  qrcode?: string;
}

export interface CreateInstanceResponse {
  instance: {
    instanceName: string;
    status: string;
    qrcode?: string;
  };
}

export interface InstanceStatus {
  instance: {
    instanceName: string;
    status: string;
    owner: string;
    profileName?: string;
    profilePictureUrl?: string;
  };
} 