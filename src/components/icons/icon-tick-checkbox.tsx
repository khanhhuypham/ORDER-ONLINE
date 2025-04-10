
import { FC } from 'react';


interface IconTickCheckboxProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconTickCheckbox: FC<IconTickCheckboxProps> = ({ className, fill = false, duotone = true }) => {
    return (
        <div className={className}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="3" fill="#0071BB" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0385 7.42926C12.3926 6.96204 13.0718 6.86049 13.5555 7.20244C14.0393 7.54439 14.1444 8.20035 13.7904 8.66757L10.4312 13.1005C10.0688 13.5787 9.36974 13.6323 8.93862 13.215L6.31701 10.677C5.89362 10.2671 5.89443 9.6033 6.31884 9.19438C6.74324 8.78546 7.43052 8.78625 7.85391 9.19614L9.49539 10.7853L12.0385 7.42926Z" fill="white" />
            </svg>

        </div>
    );
};
export default IconTickCheckbox;

