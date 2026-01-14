import { api } from './api';

export interface KnowledgeDoc {
  id: string;
  title: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedDetails: any; // Using any for now as Prisma Json type might vary
  status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED'; // Adjust based on actual status enum if known
  createdAt: string;
  updatedAt: string;
}

export const knowledgeService = {
  async getDocs(): Promise<KnowledgeDoc[]> {
    const response = await api.get<{ uploadedData: KnowledgeDoc[], meta: any }>('/api/v1/upload/knowledge-docs');
    return response.data.uploadedData || [];
  },

  async uploadDocs(files: File[]): Promise<KnowledgeDoc[]> {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await api.post<{ uploadedData: KnowledgeDoc[] }>('/api/v1/upload/knowledge-docs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.uploadedData || [];
  },

  async deleteDoc(id: string): Promise<void> {
    await api.delete(`/api/v1/upload/knowledge-docs/${id}`);
  },
};
