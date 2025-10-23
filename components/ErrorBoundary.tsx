import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Replaced the constructor with direct state initialization as a class property.
  // This is more concise and corrects a type error where re-declaring the `state` property
  // was preventing TypeScript from correctly inferring the component's props,
  // leading to an error that `this.props` did not exist.
  state: State = { hasError: false };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Renderiza nada se ocorrer um erro, degradando graciosamente o recurso.
      return null;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
