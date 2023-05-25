import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

function RoundButton(props: any) {
    const splitIcon = (icon: string) => {
        if (!icon) return null;
        return icon
            .match(/^([fab|fas|far]*)-?(.+)/)
            ?.splice(1, 2)
            .filter((p) => p.length > 0);
    };
    const {
        size,
        type,
        block,
        icon,
        color,
        flat,
        text,
        alignRight,
        disabled,
        margin,
        pullRight = alignRight,
        pullLeft,
        app,
        onClick,
        outline,
        className
    } = props;
    let {btnType} = props;
    const hasIcon = !!icon;
    const localIcon: any = hasIcon ? splitIcon(icon) : null;
    const buttonClasses = [
        'btn',
        block ? 'btn-block' : '',
        `btn-${type}`,
        flat ? 'btn-flat' : '',
        className,
        color ? `bg-${color}` : '',
        size ? `btn-${size}` : '',
        pullRight ? 'pull-right' : '',
        pullLeft ? 'pull-left' : '',
        disabled ? 'disabled' : '',
        margin ? 'margin' : '',
        flat ? 'btn-flat' : '',
        app ? 'btn-app' : '',
        outline ? 'btn-outline' : ''
    ]
        .filter((p) => p)
        .join(' ');

    return (
        <div className="btn-round">
            <button
                type={btnType && !disabled ? btnType : 'button'}
                className={`${buttonClasses} dropdown-toggle`}
                onClick={!disabled && onClick}
            >
                {`${text} `}
                <FontAwesomeIcon icon={localIcon} />
            </button>
        </div>
    );
}

export default RoundButton;
