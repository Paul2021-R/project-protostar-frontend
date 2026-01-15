import { api, AuthResponse } from './api';

// Defining interface locally if not available effectively involved with DTO sharing
export interface SigninPayload {
  email: string;
  password: string;
}

export const authService = {
  async signin(payload: SigninPayload): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(
      '/api/v1/auth/signin',
      payload,
    );
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
    }
    return response.data;
  },

  async signout() {
    localStorage.removeItem('accessToken');
    // window.location.href = '/login'; // Optional: Redirect logic can be handled in component
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('accessToken');
  },
};
