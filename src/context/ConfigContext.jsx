import { createContext, useContext, useState } from 'react';

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
    // Flag to enable/disable multivendor functionality
    // Set to false by default as requested
    const [isMultivendor] = useState(false);

    return (
        <ConfigContext.Provider value={{ isMultivendor }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (!context) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
