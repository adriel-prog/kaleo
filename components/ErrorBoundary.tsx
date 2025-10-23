import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Initialized state using class property syntax. The previous constructor-based
  // initialization was causing issues with the build toolchain, leading to errors
  // where `this.state` and `this.props` were not found.
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