import React from 'react';
import { bool, shape } from 'prop-types';

const LoadingContainer = (Component) => {
  const Renderer = ({ data }) => {
    const { loading, ...rest } = data;

    if (loading) {
      return <p>Loading...</p>;
    }

    return <Component {...rest} />;
  };

  Renderer.propTypes = {
    data: shape({
      loading: bool.isRequired,
    }).isRequired,
  };

  return Renderer;
};


export default LoadingContainer;
