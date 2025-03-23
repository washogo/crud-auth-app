import Button from '@/components/Button';
import Input from '@/components/Input';
import PageTitle from '@/components/PageTitle';
import { signup } from '../actions';

// サインアップ画面
export default function SignupPage() {
  return (
    <>
      <PageTitle title="サインアップ" />
      <form className="flex flex-col gap-3" action={signup}>
        <Input label="メールアドレス" type="email" name="email" placeholder="example@gmail.com" required />
        <Input label="パスワード" type="password" name="password" placeholder="Password1234" required />
        <Button type="submit">サインアップ</Button>
      </form>
    </>
  );
}
