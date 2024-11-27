'use client'
import { useEffect } from 'react';

import Cookies from 'js-cookie';
import useCookieStore from '@/store/useCookieStore';

const CookieMonitor = () => {
  const cookies = useCookieStore((state) => state.cookies);
  const setCookie = useCookieStore((state) => state.setCookie);

  

  return (
    <div>
      <h1>Cookie Monitor</h1>
      <p>
        {cookies.token
          ? `Cookie Value: ${cookies.token}`
          : 'Cookie has been deleted or not set.'}
      </p>
    </div>
  );
};

export default CookieMonitor;
