/**
 * @author Alexis DEVLEESCHAUWER <alexis@devleeschauwer.fr>
 */
import React from 'react';
import FR_Flag from './3x2/FR.svg';
import CA_Flag from './3x2/CA.svg';
import EN_Flag from './3x2/EN.svg';

import { Language } from '../../i18n/Language';

export const FR: React.FC = () => {
    return (
        <div>
            <img title="Français" className="CountryFlag" src={FR_Flag} alt={'Français'} width={45} height={30} />
        </div>
    );
};

export const CA: React.FC = () => {
    return (
        <div>
            <img title="Català" className="CountryFlag" src={CA_Flag} alt={'Català'} width={45} height={30} />
        </div>
    );
};

export const EN: React.FC = () => {
    return (
        <div>
            <img title="English" className="CountryFlag" src={EN_Flag} alt={'English'} width={45} height={30} />
        </div>
    );
};

export const CodeToFlag: React.FC<{ code: string }> = ({ code }) => {
    return code === Language.FR ? <FR /> : code === Language.EN ? <EN /> : code === Language.CA ? <CA /> : <FR />;
};

export default { FR, CA, EN };
