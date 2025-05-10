import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../api/loginApi";
import { UseLoginMutationReturn } from "../types/login";

/**
 * 로그인 기능을 위한 React Query 커스텀 훅
 * @returns 로그인 관련 상태와 함수들
 */
export const useLoginMutation = (): UseLoginMutationReturn => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, isError, error, isSuccess, data } =
    useMutation({
      mutationFn: login,
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name);
        localStorage.setItem("userId", String(data.userId));

        queryClient.setQueryData(["user"], {
          isAuthenticated: true,
          userId: data.userId,
          userName: data.name,
        });
      },
      onError: (error) => {
        console.error("Login failed:", error);
      },
    });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    queryClient.setQueryData(["user"], {
      isAuthenticated: false,
      userId: null,
      userName: null,
    });

    queryClient.invalidateQueries({
      predicate: (query) =>
        query.queryKey[0] === "comments" || query.queryKey[0] === "user",
    });
  };

  return {
    login: mutateAsync,
    isLoading: isPending,
    isError,
    error: error as Error | null,
    isSuccess,
    data,
    logout,
  };
};
