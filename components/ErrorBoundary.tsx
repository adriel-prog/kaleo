import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Replaced the constructor with a class property for state initialization. The constructor was causing TypeScript errors where 'this.state' and 'this.props' were not being recognized. Class property initialization is a modern and valid alternative.
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