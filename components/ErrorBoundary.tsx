import React, { ReactNode, ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  // FIX: Replaced class property state initialization with a standard constructor.
  // The error "Property 'props' does not exist on type 'ErrorBoundary'" suggests a potential issue with how class properties are being handled by the build toolchain for this project.
  // Using a standard constructor with `super(props)` is the most robust way to ensure the component's `props` and `state` are correctly initialized and typed.
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

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
