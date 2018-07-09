import { Constants } from 'expo';

function getUserInfo() {
  const { deviceId, deviceName, platform } = Constants;
  return {
    deviceId,
    deviceName,
    platform,
  };
}
export default getUserInfo;
