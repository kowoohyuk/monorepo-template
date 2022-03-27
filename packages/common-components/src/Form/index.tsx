import {
  FormEvent,
  FormEventHandler,
  forwardRef,
  PropsWithChildren,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';

export interface FormProps {
  className?: string;
  autoComplete?: string;
  onSubmit?:
    | ((formData: { [key: string]: string | string[] | boolean }) => void)
    | (() => void);
  onReset?: (event: FormEvent<HTMLFormElement>) => void;
}

export type FormRef = {
  getValues: () => { [key: string]: string | string[] | boolean };
  reset: (values?: Record<string, string | boolean | string[]>) => void;
};

const Form = forwardRef<FormRef, PropsWithChildren<FormProps>>(
  ({ className, autoComplete, onSubmit, onReset, children }, ref) => {
    const formRef = useRef<HTMLFormElement>(null);

    const reset = useCallback(
      (values?: Record<string, string | boolean | string[]>) => {
        const formEl = formRef.current;
        if (formEl) {
          formEl.reset();
          if (values) {
            Object.keys(values).forEach(key => {
              const val = values[key];
              const els = formEl.querySelectorAll(`[name="${key}"]`);
              if (els) {
                els.forEach(el => {
                  /* eslint-disable no-param-reassign */
                  if (el.tagName === 'INPUT') {
                    const input = el as HTMLInputElement;
                    // eslint-disable-next-line @typescript-eslint/unbound-method
                    const setValue = Object.getOwnPropertyDescriptor(
                      window.HTMLInputElement.prototype,
                      'value'
                    )?.set;
                    if (setValue) {
                      setValue.call(input, val);

                      const event = new Event('input', { bubbles: true });
                      input.dispatchEvent(event);
                    }
                  }
                });
              }
            });
          }
        }
      },
      []
    );

    useImperativeHandle(
      ref,
      () => ({
        getValues: () => formRef.current ?? {},
        reset,
      }),
      [formRef, reset]
    );

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
      event => {
        event.preventDefault();
        if (onSubmit) {
          onSubmit(formRef.current ?? {});
        }
      },
      [onSubmit]
    );

    const handleReset = useCallback<FormEventHandler<HTMLFormElement>>(
      e => {
        if (onReset) {
          onReset(e);
        }
      },
      [onReset]
    );

    return (
      <form
        className={className}
        ref={formRef}
        autoComplete={autoComplete}
        onSubmit={handleSubmit}
        onReset={handleReset}
        noValidate
      >
        {children}
      </form>
    );
  }
);

export default Form;
