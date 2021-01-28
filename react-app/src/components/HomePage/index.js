import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEvents, fetchNearbyEvents } from "../../store/events";
import { fetchUserGroups } from "../../store/users";