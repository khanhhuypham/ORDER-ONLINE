import { FC } from 'react';

interface IconEditProps {
    className?: string;
    duotone?: boolean;
    color?: string;
}

const IconEdit: FC<IconEditProps> = ({ className, duotone = false, color = '#ffffff' }) => {
    return (
        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_960_4572)">
                <path d="M5.26959 14.5L4.95044 14.9596M5.26959 14.5L4.27857 15.4357C4.14236 15.2945 4.03577 15.1262 3.96642 14.9406L4.40521 14.7767L4.45677 14.7574L4.66898 14.6781L4.95044 14.9596M5.26959 14.5L4.95044 14.9596M4.95044 14.9596L5.00898 15.0181M9.28782 17.25L9.04896 17.4888L8.40969 17.25H8.74998H9.15285H9.28782ZM5.24998 13.75V14.0903L5.01113 13.451L5.24998 13.2122V13.3471V13.75Z" fill="#374151" stroke="#374151" stroke-width="1.5" />
            </g>
            <defs>
                <clipPath id="clip0_960_4572">
                    <rect width="22" height="22" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>

    );
};

export default IconEdit;
