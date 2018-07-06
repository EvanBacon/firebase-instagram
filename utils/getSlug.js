/***********************
 * Module dependencies *
 ***********************/
import { Constants } from 'expo';

function getSlug() {
  const {
    manifest: { slug },
  } = Constants;
  return slug;
}
/**********************
 * Export getUserInfo *
 *********************/
export default getSlug;
