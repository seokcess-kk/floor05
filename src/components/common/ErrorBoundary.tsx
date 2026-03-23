"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-brand-paper rounded-xl p-8 text-center space-y-4">
          <p className="text-brand-black text-lg font-medium">
            {this.props.fallbackMessage || "도구 실행 중 문제가 발생했습니다."}
          </p>
          <p className="text-brand-mid text-sm">
            페이지를 새로고침하거나 아래 버튼을 눌러 다시 시도해주세요.
          </p>
          <button
            onClick={this.handleReset}
            className="px-6 py-3 bg-brand-accent text-white rounded-lg hover:bg-brand-accent-light transition-colors"
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
