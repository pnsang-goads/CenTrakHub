/**
 * Format utilities for consistent data display
 */

export const formatDate = (date?: string | Date): string => {
  if (!date) return '-';
  return new Date(date).toLocaleDateString();
};

export const formatDateTime = (date?: string | Date): string => {
  if (!date) return '-';
  return new Date(date).toLocaleString();
};

export const formatMoney = (amount?: number, decimals: number = 2): string => {
  if (amount === undefined || amount === null) return '-';
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatDistance = (distance?: number, unit: string = 'km'): string => {
  if (!distance) return '-';
  return `${distance.toLocaleString()} ${unit}`;
};

export const formatNumber = (num?: number, decimals: number = 0): string => {
  if (num === undefined || num === null) return '-';
  return num.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

export const formatCoordinates = (lat?: number, lng?: number, decimals: number = 6): string => {
  if (!lat || !lng) return '-';
  return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
};

export const formatBoolean = (value?: boolean): string => {
  return value ? 'Yes' : 'No';
};

export const truncateText = (text?: string, maxLength: number = 50): string => {
  if (!text) return '-';
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

