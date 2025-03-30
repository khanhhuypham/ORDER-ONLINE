import { FC } from 'react';

interface IconCheckboxProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconCheckbox: FC<IconCheckboxProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div className={className}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="19" height="19" rx="2.5" fill="#CCE3F1" stroke="#0071BB" />
            </svg>

        </div>
    );
};
export default IconCheckbox;
