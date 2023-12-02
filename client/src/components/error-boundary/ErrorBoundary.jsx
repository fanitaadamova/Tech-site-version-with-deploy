import { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor() {
        super()

        this.state = {
            hasError: false,
        };
    }
    
    static getDerivedStateFromError(err) {
        return {
            hasError: true,
        };
    }

    componentDidCatch(error, errorInfo) {
        console.log(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <p >Нещо се обърка :( </p>;
        }

        return this.props.children;
    }
}
