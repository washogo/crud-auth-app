'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

/** ヘッダー */
export default function Header() {
  const supabase = createClient();
  const router = useRouter();

  // サインアウト処理
  const signoutHandler = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    router.push('/auth/signin');
  };

  // useEffect(() => {
  //   const { data: listener } = supabase.auth.onAuthStateChange((event) => {
  //     if (event === 'SIGNED_OUT') {
  //       router.push('/auth/signin');
  //     }
  //   });
  //   return () => listener.subscription.unsubscribe();
  // }, [router, supabase.auth]);

  return (
    <header className="mb-5 bg-blue-400 py-3 px-10 font-bold flex justify-between items-center">
      TASK APP
      <button className="bg-white p-0.5 rounded-2xl hover:bg-gray-200 hover:cursor-pointer" onClick={signoutHandler}>
        Sign Out
      </button>
    </header>
  );
}
