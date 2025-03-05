import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BlurFade } from '@/components/magicui/blur-fade.tsx';
import { BorderBeam } from '@/components/magicui/border-beam.tsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card.tsx';
import { Label } from '@/components/ui/label.tsx';
import { Trans, useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation();
  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   message: '',
  // });

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log('Form submitted:', formData);
  // };
  //
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  return (
    <div className="flex flex-col max-w-4xl mx-auto mt-16 px-4">
      <BlurFade delay={0.15} inView>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl bg-gradient-to-r bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
          {t('contact.title')}
        </h2>
      </BlurFade>
      <BlurFade delay={0.15 * 1.5} inView>
        <Card className="relative overflow-hidden mt-12">
          <CardHeader>
            <CardDescription className="sm:text-lg">
              <Trans i18nKey="contact.subtitle" components={{ br: <br /> }} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="flex w-full items-center gap-4 flex-col sm:flex-row">
                <div className="flex flex-col space-y-1.5 w-full sm:flex-1">
                  <Label htmlFor="name">{t('contact.form.name')}</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t('contact.form.namePlaceholder')}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full sm:flex-1">
                  <Label htmlFor="email">{t('contact.form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t('contact.form.emailPlaceholder')}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="message">{t('contact.form.message')}</Label>
                <Textarea
                  id="message"
                  placeholder={t('contact.form.messagePlaceholder')}
                  className="resize-none h-40"
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button className="bg-gradient-to-r bg-linear-to-r from-blue-500 via-cyan-500 to-teal-500 cursor-pointer">
              {t('contact.form.submit')}
            </Button>
          </CardFooter>
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
