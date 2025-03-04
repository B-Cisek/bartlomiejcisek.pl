import { Button } from '@/components/ui/button.tsx';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = async () => {
    if (i18n.language === 'pl') {
      await i18n.changeLanguage('en');
    } else {
      await i18n.changeLanguage('pl');
    }
  };

  return (
    <Button
      variant="ghost"
      className="cursor-pointer rounded-full size-12"
      onClick={() => changeLanguage()}
    >
      <span>{i18n.language === 'pl' ? 'PL' : 'EN'}</span>
    </Button>
  );
}

export default LanguageSwitcher;
