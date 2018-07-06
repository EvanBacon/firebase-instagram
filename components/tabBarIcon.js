/***********************
 * Module dependencies *
 ***********************/
import { MaterialIcons } from '@expo/vector-icons';
import * as React from 'react';

const tabBarIcon = name => ({ tintColor }) => (
  <MaterialIcons
    style={{ backgroundColor: 'transparent' }}
    name={name}
    color={tintColor}
    size={24}
  />
);

/*********************
 * Export tabBarIcon *
 ********************/
export default tabBarIcon;
