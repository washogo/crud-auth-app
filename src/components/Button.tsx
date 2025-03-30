import { tv } from 'tailwind-variants';

const button = tv({
  base: 'w-fit bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    color: {
      primary: 'bg-blue-500 hover:bg-blue-700',
      secondary: 'bg-sky-500 hover:bg-sky-700',
      danger: 'bg-red-500 hover:bg-red-700',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  isDisabled?: boolean;
};

/** ボタン */
export default function Button({ children, type = 'button', color, onClick, isDisabled = false }: ButtonProps) {
  return (
    <button className={button({ color })} type={type} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
}
