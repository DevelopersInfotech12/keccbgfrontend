'use client';

import { useState } from 'react';
import RoiForm from '@/comp/roi/RoiForm';
import KecBioPulseAI from '@/comp/roi/CbgRoiCalculator';

export default function RoiPage() {
  const [showRoi, setShowRoi] = useState(false);
  return showRoi
    ? <KecBioPulseAI />
    : <RoiForm onSuccess={() => setShowRoi(true)} />;
}
