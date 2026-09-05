'use client';

import { useState, useEffect } from 'react';
import CallbackModal from './CallbackModal';

export default function AutoCallbackModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 10000);
    return () => clearTimeout(t);
  }, []);

  return <CallbackModal open={open} onClose={() => setOpen(false)} />;
}
