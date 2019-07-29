import Constants from 'expo-constants';

function getUserInfo() {
  const { deviceId, deviceName, platform } = Constants;
  return {
    deviceId,
    deviceName,
    platform,
  };
}
export default getUserInfo;
