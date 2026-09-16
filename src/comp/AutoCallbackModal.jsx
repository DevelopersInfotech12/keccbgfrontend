'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import CallbackModal from './CallbackModal';

export default function AutoCallbackModal() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (pathname?.startsWith('/admin')) return;
        const t = setTimeout(() => setOpen(true), 10000);
        return () => clearTimeout(t);
    }, [pathname]);

    if (pathname?.startsWith('/admin')) return null;
    return <CallbackModal open={open} onClose={() => setOpen(false)} />;
}