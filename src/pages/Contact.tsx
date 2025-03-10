import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/magicui/blur-fade.tsx';
import { BorderBeam } from '@/components/magicui/border-beam.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card.tsx';
import { Trans, useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.tsx';
import axios from 'axios';

const getFormSchema = (t: (key: string) => string) =>
  z.object({
    name: z
      .string()
      .nonempty({ message: t('contact.validation.name.required') })
      .max(60, { message: t('contact.validation.name.max') }),
    email: z
      .string()
      .nonempty({ message: t('contact.validation.email.required') })
      .email({ message: t('contact.validation.email.email') })
      .max(120, { message: t('contact.validation.email.max') }),
    message: z
      .string()
      .nonempty({ message: t('contact.validation.message.required') })
      .max(1000, { message: t('contact.validation.message.max') }),
  });

function Contact() {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [isSubmitted, setSubmitted] = useState(false);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [formError, setFormError] = useState('');

  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_APP_RECAPTCHA_SITE_KEY;
  const googleRecaptchaUrl = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;

  useEffect(() => {
    const loadRecaptchaScript = () => {
      const script = document.createElement('script');
      script.src = googleRecaptchaUrl;
      script.async = true;
      script.defer = true;
      script.onload = () => setRecaptchaLoaded(true);
      document.head.appendChild(script);
    };

    loadRecaptchaScript();

    return () => {
      const recaptchaBadges = document.querySelectorAll('.grecaptcha-badge');
      const scripts = document.querySelectorAll(
        `script[src="${googleRecaptchaUrl}"]`
      );

      scripts.forEach((script) => script.remove());
      recaptchaBadges.forEach((badge) => badge.remove());
    };
  }, []);

  const executeRecaptcha = useCallback(
    async (action: string) => {
      try {
        return await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute(
                RECAPTCHA_SITE_KEY,
                {
                  action,
                }
              );
              resolve(token);
            } catch (error) {
              reject(error);
            }
          });
        });
      } catch (error) {
        throw error;
      }
    },
    [recaptchaLoaded]
  );

  const formSchema = getFormSchema(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);

    try {
      const recaptchaToken = await executeRecaptcha('CONTACT_FORM_SUBMIT');

      const formData = {
        ...values,
        recaptcha_token: recaptchaToken,
      };

      await axios.post(
        import.meta.env.VITE_APP_API_URL + '/api/contact',
        formData
      );
      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      setFormError(t('contact.validation.error'));
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-8 sm:mt-16 px-4">
      <BlurFade delay={0.15} inView>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
          {t('contact.title')}
        </h2>
      </BlurFade>
      <BlurFade delay={0.15 * 1.5} inView>
        <Card className="relative overflow-hidden mt-8 sm:mt-12">
          {isSubmitted ? (
            <div className="text-center text-lg font-semibold text-green-500">
              {t('contact.form.successMessage')}
            </div>
          ) : (
            <>
              <CardHeader>
                <CardDescription className="sm:text-lg">
                  <Trans
                    i18nKey="contact.subtitle"
                    components={{ br: <br /> }}
                  />
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-start">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="flex flex-col h-[80px]">
                            <FormLabel>{t('contact.form.name')}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t('contact.form.namePlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className="flex flex-col h-[80px]">
                            <FormLabel>{t('contact.form.email')}</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={t('contact.form.emailPlaceholder')}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{t('contact.form.message')}</FormLabel>
                          <FormControl>
                            <Textarea
                              className="min-h-[150px]"
                              placeholder={t('contact.form.messagePlaceholder')}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                      <p className="text-destructive-foreground text-sm mb-2 md:mb-0">
                        {formError}
                      </p>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 cursor-pointer w-full md:w-auto"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          t('contact.form.submit')
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </>
          )}

          <BorderBeam
            duration={8}
            size={200}
            colorFrom="#3b82f6"
            colorTo="#06b6d4"
          />
        </Card>
      </BlurFade>
    </div>
  );
}

export default Contact;
