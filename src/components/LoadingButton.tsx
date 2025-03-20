import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { ButtonProps } from '@/components/ui/button';

type LoadingButtonProps = {
  text?: string;
  isLoading?: boolean;
} & ButtonProps;

export default function LoadingButton({
  text = "Loading...",
  isLoading = true,
  disabled,
  children,
  ...props
}: LoadingButtonProps) {
  return (
    <Button 
      disabled={disabled || isLoading} 
      className="flex items-center justify-center"
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {text}
        </>
      ) : (
        children
      )}
    </Button>
  );
}