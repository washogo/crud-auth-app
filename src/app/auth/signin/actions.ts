'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

/** サインイン処理 */
export async function signin(_: { status?: number; message: string }, formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  console.error(error);

  if (error) {
    return { status: error.status, message: error.message };
  }

  revalidatePath('/', 'layout');
  redirect('/task');
}
