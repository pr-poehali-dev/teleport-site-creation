import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Tariff {
  id: string;
  provider: "beeline" | "mts" | "megafon" | "rostelecom";
  name: string;
  speed: string;
  price: string;
  type: "internet" | "tv" | "bundle";
  channels?: number;
  features: string[];
  isHit: boolean;
}

const tariffs: Tariff[] = [
  {
    id: "1",
    provider: "mts",
    name: "МТС дома Хорошо",
    speed: "от 500 Мбит/с",
    price: "375₽ первые 2 месяца, далее 750₽",
    type: "bundle",
    features: ["Домашний интернет от 500 Мбит/с", "Онлайн-кинотеатр КИОН", "Безлимитный трафик"],
    isHit: true
  },
  {
    id: "2",
    provider: "beeline",
    name: "Для дома с ТВ",
    speed: "500 Мбит/с",
    price: "375₽ первые 3 месяца, далее 750₽",
    type: "bundle",
    channels: 237,
    features: ["Домашний интернет 500 Мбит/с", "237 телеканалов", "HD качество"],
    isHit: true
  },
  {
    id: "3",
    provider: "megafon",
    name: "Для дома все",
    speed: "300 Мбит/с",
    price: "325₽ первые 2 месяца, далее 650₽",
    type: "bundle",
    channels: 180,
    features: ["Домашний интернет 300 Мбит/с", "180 телеканалов", "Стабильное подключение"],
    isHit: true
  },
  {
    id: "4",
    provider: "rostelecom",
    name: "Технология развлечения",
    speed: "500 Мбит/с",
    price: "750₽/мес",
    type: "bundle",
    channels: 224,
    features: ["Домашний интернет 500 Мбит/с", "224 телеканала", "Интерактивное ТВ"],
    isHit: true
  }
];

const providers = [
  { id: "beeline", name: "Билайн", color: "beeline", logo: "https://cdn.poehali.dev/files/c9833d87-bd76-4c9b-8a83-97636b74d1ba.png" },
  { id: "mts", name: "МТС", color: "mts", logo: "https://cdn.poehali.dev/files/e821153f-fa74-4e37-a2f1-5da4d4799bac.jpg" },
  { id: "megafon", name: "МегаФон", color: "megafon", logo: "https://cdn.poehali.dev/files/9fc53ae4-9096-4872-a8d4-153798cbcdfd.png" },
  { id: "rostelecom", name: "Ростелеком", color: "rostelecom", logo: "https://cdn.poehali.dev/files/0d805a1f-6104-41ba-b069-7938b6248476.jpg" }
];

export default function Index() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const { toast } = useToast();

  const filteredTariffs = tariffs.filter(tariff => {
    const matchesProvider = !selectedProvider || tariff.provider === selectedProvider;
    return matchesProvider;
  });

  const toggleCompare = (id: string) => {
    if (compareList.includes(id)) {
      setCompareList(compareList.filter(item => item !== id));
    } else if (compareList.length < 3) {
      setCompareList([...compareList, id]);
    } else {
      toast({
        title: "Ограничение",
        description: "Можно сравнить только 3 тарифа одновременно",
        variant: "destructive"
      });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Заявка отправлена!",
      description: "Мы свяжемся с вами в ближайшее время"
    });
    setIsOrderModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary">
              <Icon name="Rocket" className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Телепорт</h1>
              <p className="text-xs text-muted-foreground">Будь здесь и там одновременно</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:89951508833" className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors">
              <Icon name="Phone" className="h-4 w-4" />
              8-995-150-88-33
            </a>
            <nav className="hidden md:flex gap-6">
              <a href="#providers" className="text-sm font-medium hover:text-accent transition-colors">Провайдеры</a>
              <a href="#tariffs" className="text-sm font-medium hover:text-accent transition-colors">Тарифы</a>
              <a href="#faq" className="text-sm font-medium hover:text-accent transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-rostelecom py-20 text-white">
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Сравните тарифы и выберите лучший</h2>
            <p className="text-lg mb-8 text-white/80 font-light italic">Ваш проводник в мир быстрого интернета и качественного телевидения</p>

            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => setIsOrderModalOpen(true)}>
              Подобрать тариф <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]"></div>
      </section>

      <section id="providers" className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши провайдеры</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {providers.map((provider) => (
              <Card
                key={provider.id}
                className={`cursor-pointer transition-all hover:scale-105 hover:shadow-lg ${
                  selectedProvider === provider.id ? "ring-2 ring-" + provider.color : ""
                }`}
                onClick={() => setSelectedProvider(selectedProvider === provider.id ? null : provider.id)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center">
                    <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain" />
                  </div>
                  <CardTitle>{provider.name}</CardTitle>
                  <CardDescription>Надежный провайдер</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="tariffs" className="py-16 bg-muted/50">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Тарифы</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredTariffs.map((tariff) => (
              <Card key={tariff.id} className="relative animate-scale-in hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex flex-col gap-2">
                      <img src={providers.find(p => p.id === tariff.provider)?.logo} alt="" className="w-16 h-16 object-contain" />
                      {tariff.isHit && (
                        <Badge className="bg-red-500 text-white w-fit">ХИТ ПРОДАЖ</Badge>
                      )}
                    </div>
                    <Checkbox
                      checked={compareList.includes(tariff.id)}
                      onCheckedChange={() => toggleCompare(tariff.id)}
                    />
                  </div>
                  <CardTitle className="text-xl">{tariff.name}</CardTitle>
                  <CardDescription className="text-lg font-bold text-foreground mt-2">
                    {tariff.price}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Icon name="Zap" className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{tariff.speed}</span>
                    </div>
                    {tariff.channels && (
                      <div className="flex items-center gap-2">
                        <Icon name="Tv" className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{tariff.channels} каналов</span>
                      </div>
                    )}
                  </div>
                  <ul className="space-y-2 mb-4">
                    {tariff.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Icon name="Check" className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" onClick={() => setIsOrderModalOpen(true)}>Подключить</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {compareList.length > 0 && (
        <section id="compare" className="py-16">
          <div className="container px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Сравнение тарифов ({compareList.length}/3)</h2>
              <Button variant="outline" onClick={() => setCompareList([])}>
                Очистить
              </Button>
            </div>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-max md:min-w-0">
                {compareList.map(id => {
                  const tariff = tariffs.find(t => t.id === id);
                  if (!tariff) return null;
                  return (
                    <Card key={id}>
                      <CardHeader>
                        <img src={providers.find(p => p.id === tariff.provider)?.logo} alt="" className="w-16 h-16 object-contain mb-2" />
                        <CardTitle>{tariff.name}</CardTitle>
                        <CardDescription className="text-lg font-bold text-foreground">
                          {tariff.price}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <span className="text-sm text-muted-foreground">Скорость:</span>
                          <p className="font-medium">{tariff.speed}</p>
                        </div>
                        {tariff.channels && (
                          <div>
                            <span className="text-sm text-muted-foreground">Каналов:</span>
                            <p className="font-medium">{tariff.channels}</p>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-muted-foreground">Преимущества:</span>
                          <ul className="mt-2 space-y-1">
                            {tariff.features.map((feature, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <Icon name="Check" className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <Dialog open={isOrderModalOpen} onOpenChange={setIsOrderModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Оставить заявку</DialogTitle>
            <DialogDescription>
              Заполните форму или позвоните нам напрямую
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <a href="tel:89951508833" className="w-full">
              <Button className="w-full" size="lg" variant="outline">
                <Icon name="Phone" className="mr-2 h-5 w-5" />
                Позвонить 8-995-150-88-33
              </Button>
            </a>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Или</span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="modal-name">Имя</Label>
                <Input id="modal-name" required placeholder="Иван Иванов" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-phone">Телефон</Label>
                <Input id="modal-phone" type="tel" required placeholder="+7 (999) 123-45-67" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="modal-address">Адрес подключения</Label>
                <Input id="modal-address" required placeholder="г. Москва, ул. Ленина, д. 1, кв. 1" />
              </div>
              <Button type="submit" className="w-full" size="lg">
                Отправить заявку
              </Button>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      <section id="faq" className="py-16">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Часто задаваемые вопросы</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Как быстро можно подключить интернет?</AccordionTrigger>
                <AccordionContent>
                  После оформления заявки наши специалисты свяжутся с вами в течение 1 часа. Подключение производится в течение 1-3 рабочих дней в зависимости от выбранного провайдера и технической возможности.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Нужно ли платить за установку оборудования?</AccordionTrigger>
                <AccordionContent>
                  Большинство провайдеров предоставляют бесплатную установку при подключении тарифа на 12 месяцев. Роутер предоставляется в аренду бесплатно или за символическую плату.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Можно ли сменить тариф после подключения?</AccordionTrigger>
                <AccordionContent>
                  Да, вы можете изменить тариф в любой момент. Обратитесь к своему провайдеру через личный кабинет или по телефону горячей линии. Смена тарифа обычно происходит со следующего расчетного периода.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Что делать, если по моему адресу нет подключения?</AccordionTrigger>
                <AccordionContent>
                  Оставьте заявку, и мы проверим техническую возможность подключения по вашему адресу у всех доступных провайдеров. Если подключение невозможно, мы предложим альтернативные решения.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Как работают акционные цены на тарифы?</AccordionTrigger>
                <AccordionContent>
                  Акционная цена действует указанный период (2-3 месяца), затем тариф переходит на стандартную стоимость. Вы можете отказаться от услуги до окончания акционного периода без штрафов.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger>Есть ли скрытые платежи?</AccordionTrigger>
                <AccordionContent>
                  Нет, все указанные цены финальные. Дополнительные услуги (статический IP, дополнительное оборудование) оплачиваются отдельно только по вашему желанию.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      <Dialog open={showPrivacyPolicy} onOpenChange={setShowPrivacyPolicy}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Политика конфиденциальности</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации о физических лицах (далее — Пользователи), использующих сервисы сайта Телепорт.</p>
            
            <h3 className="font-semibold text-base mt-4">1. Собираемая информация</h3>
            <p>Мы собираем информацию, которую вы предоставляете при заполнении форм на сайте: имя, номер телефона, адрес подключения.</p>
            
            <h3 className="font-semibold text-base mt-4">2. Использование информации</h3>
            <p>Предоставленная вами информация используется для:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Обработки ваших заявок на подключение услуг</li>
              <li>Связи с вами по вопросам оказания услуг</li>
              <li>Улучшения качества обслуживания</li>
            </ul>
            
            <h3 className="font-semibold text-base mt-4">3. Защита информации</h3>
            <p>Мы применяем необходимые организационные и технические меры для защиты персональной информации от несанкционированного доступа, изменения, раскрытия или уничтожения.</p>
            
            <h3 className="font-semibold text-base mt-4">4. Передача третьим лицам</h3>
            <p>Ваши данные могут быть переданы провайдерам услуг (МТС, Билайн, МегаФон, Ростелеком) исключительно для обработки вашей заявки на подключение.</p>
            
            <h3 className="font-semibold text-base mt-4">5. Контакты</h3>
            <p>По вопросам, связанным с обработкой персональных данных, обращайтесь по телефону: 8-995-150-88-33</p>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t py-8 bg-card">
        <div className="container px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Телепорт</h3>
              <p className="text-sm text-muted-foreground">
                Ваш проводник в мир быстрого интернета и качественного телевидения
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Контакты</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="tel:89951508833" className="flex items-center gap-2 hover:text-foreground transition-colors">
                  <Icon name="Phone" className="h-4 w-4" />
                  8-995-150-88-33
                </a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Социальные сети</h3>
              <div className="flex gap-3">
                <a href="https://t.me/89951508833" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline">
                    <Icon name="Send" className="h-4 w-4" />
                  </Button>
                </a>
                <a href="https://wa.me/89951508833" target="_blank" rel="noopener noreferrer">
                  <Button size="icon" variant="outline">
                    <Icon name="MessageCircle" className="h-4 w-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
              <p>© 2024 Телепорт. Все права защищены.</p>
              <div className="flex gap-4">
                <button onClick={() => setShowPrivacyPolicy(true)} className="hover:text-foreground transition-colors underline">
                  Политика конфиденциальности
                </button>
                <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center md:text-left">
              <p>ИП Иванов И.И. | ИНН: 123456789012 | ОГРНИП: 123456789012345</p>
              <p className="mt-1">Телепорт является официальным партнером МТС, Билайн, МегаФон и Ростелеком</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}