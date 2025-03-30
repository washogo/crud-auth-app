'use client';

import Button from '../../components/Button';
import Input from '../../components/Input';
import { useActionState } from 'react';
import { signup } from '@/app/auth/signup/actions';

/** サインアップ機能用フォーム */
export default function Form() {
  const [state, formAction, pending] = useActionState(signup, { status: undefined, message: '' });
  return (
    <form className="flex flex-col gap-3" action={formAction}>
      {state.status && state.message && (
        <p className="text-red-500">{`ステータス：${state.status}、メッセージ：${state.message}`}</p>
      )}
      <Input label="メールアドレス" type="email" name="email" placeholder="example@gmail.com" required />
      <Input label="パスワード" type="password" name="password" placeholder="Password1234" required />
      <Button type="submit" isDisabled={pending}>
        サインアップ
      </Button>
    </form>
  );
}
