// hooks/useAuth.js
import { useEffect } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const useAuth = (redirectUrl = '/login') => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      // Redirect to the login page if not authenticated
      signIn(null, { callbackUrl: redirectUrl });
    }
  }, [session, status, router, redirectUrl]);

  return { session, status };
};

export default useAuth;
