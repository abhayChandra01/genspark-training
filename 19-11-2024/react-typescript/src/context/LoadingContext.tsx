import React, { createContext, Component } from "react";
import {
  LoadingContextType,
  LoadingProviderProps,
  LoadingProviderState,
} from "../models/LoadingModel";

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
});

export class LoadingProvider extends Component<
  LoadingProviderProps,
  LoadingProviderState
> {
  state: LoadingProviderState = {
    loading: false,
  };

  setLoading = (loading: boolean) => {
    this.setState({ loading });
  };

  render() {
    return (
      <LoadingContext.Provider
        value={{
          loading: this.state.loading,
          setLoading: this.setLoading,
        }}
      >
        {this.props.children}
      </LoadingContext.Provider>
    );
  }
}
