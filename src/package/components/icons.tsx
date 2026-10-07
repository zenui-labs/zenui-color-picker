import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };

const Svg = ({size = 16, children, ...rest}: IconProps) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...rest}
    >
        {children}
    </svg>
);

/** Two paint chips, one lifted off the other. */
export const CopyIcon = (props: IconProps) => (
    <Svg {...props}>
        <rect x="3" y="6.5" width="9" height="10.5" rx="2"/>
        <path d="M7 6.5V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"/>
        <path d="M3 13.5h9" opacity=".55"/>
    </Svg>
);

export const CheckIcon = (props: IconProps) => (
    <Svg {...props}>
        <path className="zcp-draw" pathLength={1} d="M4 10.5l3.6 3.5L16 5.5"/>
    </Svg>
);

/** A die showing three, for "roll a random color". */
export const DiceIcon = (props: IconProps) => (
    <Svg {...props}>
        <rect x="3" y="3" width="14" height="14" rx="3.5"/>
        <circle cx="7" cy="7" r=".9" fill="currentColor" stroke="none"/>
        <circle cx="10" cy="10" r=".9" fill="currentColor" stroke="none"/>
        <circle cx="13" cy="13" r=".9" fill="currentColor" stroke="none"/>
    </Svg>
);

export const HeartIcon = ({filled, ...props}: IconProps & { filled?: boolean }) => (
    <Svg {...props}>
        <path
            d="M10 16.2s-6-3.6-6-8.1A3.3 3.3 0 0 1 10 6.3a3.3 3.3 0 0 1 6 1.8c0 4.5-6 8.1-6 8.1z"
            fill={filled ? 'currentColor' : 'none'}
        />
    </Svg>
);

/** Eyedropper with a drop at the tip. */
export const PipetteIcon = (props: IconProps) => (
    <Svg {...props}>
        <path d="M12.3 4.3l3.4 3.4"/>
        <path d="M14 2.6a1.7 1.7 0 0 1 2.4 2.4l-1.2 1.2-2.4-2.4z"/>
        <path d="M13.4 6.6L6 14l-2.5.6.6-2.5 7.4-7.4"/>
        <path d="M4.2 17.4c-.6 0-1-.4-1-1 0-.5 1-1.6 1-1.6s1 1.1 1 1.6c0 .6-.4 1-1 1z" fill="currentColor"
              stroke="none"/>
    </Svg>
);
