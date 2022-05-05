import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.brand,

    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 32,
    bottom: getBottomSpace() + 32,
  },
  modal: {
    backgroundColor: theme.colors.surface_primary,
    paddingBottom: getBottomSpace() + 32,
  },
  indicator: {
    backgroundColor: theme.colors.text_primary,
    width: 56,
  },
});
