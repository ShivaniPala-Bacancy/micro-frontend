import React from 'react';
class Button extends React.PureComponent {
    render() {
        const {children, title, ...props} = this.props;

        return (
            <button aria-label={title} title={title} type="button" {...props}>
                {children}
            </button>
        );
    }
}

export default Button;
