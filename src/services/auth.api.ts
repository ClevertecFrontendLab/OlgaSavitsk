import { apiService } from ".";

export function signUp<T>(data: T): Promise<void> {
   return apiService.post('/auth/registration', data)
} 