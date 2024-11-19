import React, { Component } from "react";
import axios from "axios";

interface WithGridProps {
  url: string;
  dataProperties: string[];
}

interface WithGridState {
  data: any[];
  loading: boolean;
  error: string | null;
}

const withGrid = (
  WrappedComponent: React.ComponentType<{
    data: any[];
    dataProperties: string[];
  }>
) => {
  return class WithGrid extends Component<WithGridProps, WithGridState> {
    state: WithGridState = {
      data: [],
      loading: true,
      error: null,
    };

    async componentDidMount() {
      const { url } = this.props;
      try {
        const response = await axios.get(url);
        this.setState({ data: response.data, loading: false });
      } catch (error) {
        this.setState({ error: "Failed to fetch data", loading: false });
      }
    }

    render() {
      const { data, loading, error } = this.state;
      const { dataProperties } = this.props;

      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p className="text-red-500">{error}</p>;
      }

      return <WrappedComponent data={data} dataProperties={dataProperties} />;
    }
  };
};

export default withGrid;
