import Button from '@/components/Button';
import Input from '@/components/Input';
import PageTitle from '@/components/PageTitle';
import { signin } from '../actions';

export default function SigninPage() {
  return (
    <>
      <PageTitle title="サインイン" />
      <form className="flex flex-col gap-3" action={signin}>
        <Input label="メールアドレス" type="email" name="email" placeholder="example@gmail.com" required />
        <Input label="パスワード" type="password" name="password" placeholder="Password1234" required />
        <Button type="submit">サインイン</Button>
      </form>
    </>
  );
}
