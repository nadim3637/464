import { useState, useEffect, useCallback } from 'react';
import { storage } from '../utils/storage';

export function usePersistentState<T>(key: string, initialValue: T): [T, (value: T) => void, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    const load = async () => {
        try {
            const stored = await storage.getItem<T>(key);
            if (mounted) {
                if (stored !== null) {
                    setValue(stored);
                }
                setLoading(false);
            }
        } catch (e) {
            console.error("Failed to load persistent state:", e);
            if (mounted) setLoading(false);
        }
    };

    load();
    return () => { mounted = false; };
  }, [key]);

  const setPersistentValue = useCallback((newValue: T) => {
    setValue(newValue);
    storage.setItem(key, newValue);
  }, [key]);

  return [value, setPersistentValue, loading];
}
