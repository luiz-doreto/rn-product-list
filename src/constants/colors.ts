export const colors = {
  // Primary colors
  primary: '#007AFF',
  
  // Background colors
  white: '#fff',
  lightGray: '#f8f8f8',
  cardBackground: '#e3e3e3',
  
  // Text colors
  black: 'black',
  darkGray: '#333',
  mediumGray: '#666',
  lightBorder: '#f0f0f0',
  
  // Status colors
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FF9800',
  
  // UI element colors
  inactive: '#C7C7CC',
} as const;

// Type for color keys (useful for TypeScript)
export type ColorKey = keyof typeof colors;