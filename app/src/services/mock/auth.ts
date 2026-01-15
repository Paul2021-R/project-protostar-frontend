import { AuthResponse, User } from '../api';

const MOCK_USER: User = {
  id: 'user-1',
  email: 'demo@protostar.com',
  name: 'Demo User',
  role: 'stargazer',
  avatar: 'https://github.com/shadcn.png',
};

export const mockAuthService = {
  login: async (email: string): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
    return {
      user: MOCK_USER,
      accessToken: 'mock-jwt-token',
    };
  },

  getMe: async (): Promise<User> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return MOCK_USER;
  },
};
