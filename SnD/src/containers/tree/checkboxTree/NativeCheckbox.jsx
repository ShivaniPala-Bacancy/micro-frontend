import React from 'react';

const defaultProps = {
    indeterminate: false
};

class NativeCheckbox extends React.PureComponent {
    componentDidMount() {
        this.updateDeterminateProperty();
    }

    componentDidUpdate() {
        this.updateDeterminateProperty();
    }

    updateDeterminateProperty() {
        const {indeterminate} = this.props;

        this.checkbox.indeterminate = indeterminate;
    }

    render() {
        const props = {...this.props};

        // Remove property that does not exist in HTML
        delete props.indeterminate;

        return (
            <input
                {...props}
                ref={(c) => {
                    this.checkbox = c;
                }}
                type="checkbox"
            />
        );
    }
}

export default NativeCheckbox;
