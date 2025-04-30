
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import toast from 'react-hot-toast';

export const Success = (label) => toast.success(`${label}`);

export const Error = (label) => toast.error(`${label}`);

export const Warning = (label) => toast(
    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <FontAwesomeIcon icon={faCircleExclamation} style={{ color: '#ff6600', width: "20px", height: "20px", marginRight: '8px' }} />
        <p style={{ margin: 0, paddingBottom: '1px' }}>{label}</p>
    </div>
);


