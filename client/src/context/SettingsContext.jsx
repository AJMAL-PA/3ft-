import React, { createContext, useContext, useState, useEffect } from 'react';
import { settingsService } from '../services/settingsService';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({ whatsappNumber: '9846417073', storeName: '3FT Archives' });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await settingsService.get();
        if (res.data.success) {
          setSettings(res.data.data);
        }
      } catch {
        // Use defaults silently if server is unavailable
      } finally {
        setIsLoaded(true);
      }
    };
    fetchSettings();
  }, []);

  const getWhatsAppUrl = (productTitle = '') => {
    const num = settings.whatsappNumber.replace(/[^\d]/g, '');
    const text = productTitle
      ? `I want to buy this product: ${productTitle}`
      : 'I want to buy a product';
    return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, isLoaded, getWhatsAppUrl }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};

export default SettingsContext;
