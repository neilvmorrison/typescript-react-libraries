import { toast as sonner_toast } from 'sonner';

export type IToastVariant = 'success' | 'error' | 'info' | 'warning';

export interface IToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export const Toast = {
  success: (message: string, options?: IToastOptions) =>
    sonner_toast.success(message, {
      duration: options?.duration ?? 3000,
      position: options?.position ?? 'bottom-right',
    }),
  error: (message: string, options?: IToastOptions) =>
    sonner_toast.error(message, {
      duration: options?.duration ?? 3000,
      position: options?.position ?? 'bottom-right',
    }),
  info: (message: string, options?: IToastOptions) =>
    sonner_toast(message, {
      duration: options?.duration ?? 3000,
      position: options?.position ?? 'bottom-right',
    }),
  warning: (message: string, options?: IToastOptions) =>
    sonner_toast.error(message, {
      duration: options?.duration ?? 3000,
      position: options?.position ?? 'bottom-right',
    }),
  promise: <T,>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
    _options?: IToastOptions
  ) =>
    sonner_toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    }),
};

export function useToast() {
  return {
    success: (message: string, options?: IToastOptions) =>
      Toast.success(message, options),
    error: (message: string, options?: IToastOptions) =>
      Toast.error(message, options),
    info: (message: string, options?: IToastOptions) =>
      Toast.info(message, options),
    warning: (message: string, options?: IToastOptions) =>
      Toast.warning(message, options),
    promise: <T,>(
      promise: Promise<T>,
      messages: {
        loading: string;
        success: string;
        error: string;
      },
      options?: IToastOptions
    ) => Toast.promise(promise, messages, options),
  };
}
