import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/theme';

export function useTheme() {
  const scheme = useColorScheme();
  
  // This explicitly forces the variable to be strictly 'dark' or 'light', satisfying TypeScript
  const theme = scheme === 'dark' ? 'dark' : 'light';

  return Colors[theme];
}