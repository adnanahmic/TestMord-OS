import { GiMorphBall } from 'react-icons/gi';

import BootLogo from '../../components/BootLogo/BootLogo';
import './BootScreen.scss';

const BootScreen = () => (
    <div className="BootScreen">
        <div className="brandlogo">
            <GiMorphBall />
        </div>
        <div className="bootlogo">
            <BootLogo />
        </div>
    </div>
);

export default BootScreen;
