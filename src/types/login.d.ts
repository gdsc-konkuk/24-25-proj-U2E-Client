export interface LoginReturn {
  userId: number;
  token: string;
  name: string;
}

interface UseLoginMutationReturn {
  login: (data: LoginRequest) => Promise<LoginReturn>;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  isSuccess: boolean;
  data: LoginReturn | undefined;
  logout: () => void;
}
