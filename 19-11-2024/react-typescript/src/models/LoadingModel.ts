export interface LoadingContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export interface LoadingProviderProps {
  children: React.ReactNode;
}

export interface LoadingProviderState {
  loading: boolean;
}
