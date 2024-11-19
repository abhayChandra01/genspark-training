import React, { Component } from "react";
import { LoadingContext } from "../../context/LoadingContext";
import { LoadingContextType } from "../../models/LoadingModel";

class ContextApiPage extends Component {
  static contextType = LoadingContext;

  context!: LoadingContextType;
  hasLoaded = false;

  componentDidMount() {
    // Prevent setting loading more than once
    if (!this.hasLoaded) {
      this.hasLoaded = true;
      this.setLoadingState();
    }
  }

  setLoadingState = () => {
    this.context.setLoading(true);
    setTimeout(() => {
      this.context.setLoading(false);
    }, 2000);
  };

  render() {
    return (
      <LoadingContext.Consumer>
        {({ loading, setLoading }) => {
          return (
            <div className="rounded-lg p-4 bg-white border border-gray-200 h-full flex items-center justify-center">
              {loading ? (
                <p className="text-lg font-bold">Loading content...</p>
              ) : (
                <p className="text-lg font-bold text-green-500">
                  Content loaded successfully!
                </p>
              )}
            </div>
          );
        }}
      </LoadingContext.Consumer>
    );
  }
}

export default ContextApiPage;
