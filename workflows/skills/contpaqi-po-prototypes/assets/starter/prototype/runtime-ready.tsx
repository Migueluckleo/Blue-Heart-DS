'use client';
import {useEffect} from 'react';
export function RuntimeReady(){useEffect(()=>{document.documentElement.dataset.prototypeHydrated='true';},[]);return null;}
