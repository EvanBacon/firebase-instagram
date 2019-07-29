import * as Permissions from 'expo-permissions';
import { Linking } from 'react-native';

export default async function getPermission(permission) {
  let { status } = await Permissions.askAsync(permission);
  if (status !== 'granted') {
    Linking.openURL('app-settings:');
    return false;
  }
  return true;
}


