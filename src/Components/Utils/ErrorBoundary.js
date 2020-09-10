import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(erro) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Loading Failed! Try and reload the page.</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
