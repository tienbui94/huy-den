import React from 'react';
import { Helmet } from 'react-helmet';
const HelmetMeta = ({ title, description, keywords }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>
    );
};

HelmetMeta.defaultProps = {
    title: 'Welcome to Huy Shop',
    description: 'We sell best items',
    keywords: 'Huy Den'
};

export default HelmetMeta;
