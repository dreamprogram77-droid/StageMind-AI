// Added React import to resolve the missing namespace 'React' when using React.ReactNode
import React from 'react';

export interface KPI {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export interface PainPoint {
  title: string;
  description: string;
  icon: string;
}

export interface Feature {
  name: string;
  benefit: string;
  icon: React.ReactNode;
}

export interface Seat {
  id: string;
  status: 'available' | 'booked' | 'premium';
  heat: number; // 0 to 1 for heatmap
}