/***********************
 * Module dependencies *
 ***********************/
import { Constants } from 'expo';
import getSlug from './getSlug';

function getUserInfo() {
  const {
    appOwnership,
    expoVersion,
    deviceId,
    deviceName,
    deviceYearClass,
    isDevice,
    platform,
  } = Constants;
  return {
    slug: getSlug(),
    deviceId,
    deviceName,
    platform,
  };
}
/**********************
 * Export getUserInfo *
 *********************/
export default getUserInfo;
