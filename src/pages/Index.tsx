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
  const [showUserAgreement, setShowUserAgreement] = useState(false);
  const [showCookiesPolicy, setShowCookiesPolicy] = useState(false);
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ваш проводник в мир быстрого интернета и качественного телевидения</h2>
            <p className="text-base md:text-lg mb-8 text-white/90">
              Сравните тарифы от ведущих провайдеров и найдите идеальное подключение
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8" onClick={() => setIsOrderModalOpen(true)}>
              Подобрать тариф <Icon name="ArrowRight" className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-20 h-20 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 border-2 border-white rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2"/>
              </pattern>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="white" stopOpacity="0"/>
                <stop offset="50%" stopColor="cyan" stopOpacity="1"/>
                <stop offset="100%" stopColor="white" stopOpacity="0"/>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            <line x1="0%" y1="15%" x2="100%" y2="15%" stroke="url(#lineGradient)" strokeWidth="3">
              <animate attributeName="x1" from="-100%" to="100%" dur="3s" repeatCount="indefinite"/>
              <animate attributeName="x2" from="0%" to="200%" dur="3s" repeatCount="indefinite"/>
            </line>
            
            <line x1="0%" y1="45%" x2="100%" y2="45%" stroke="url(#lineGradient)" strokeWidth="3">
              <animate attributeName="x1" from="-100%" to="100%" dur="2.5s" repeatCount="indefinite"/>
              <animate attributeName="x2" from="0%" to="200%" dur="2.5s" repeatCount="indefinite"/>
            </line>
            
            <line x1="0%" y1="75%" x2="100%" y2="75%" stroke="url(#lineGradient)" strokeWidth="3">
              <animate attributeName="x1" from="-100%" to="100%" dur="3.5s" repeatCount="indefinite"/>
              <animate attributeName="x2" from="0%" to="200%" dur="3.5s" repeatCount="indefinite"/>
            </line>
            
            <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="white" strokeWidth="2" opacity="0.4" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite"/>
            </line>
            <line x1="70%" y1="30%" x2="90%" y2="60%" stroke="white" strokeWidth="2" opacity="0.4" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite"/>
            </line>
            <line x1="40%" y1="70%" x2="60%" y2="90%" stroke="white" strokeWidth="2" opacity="0.4" strokeDasharray="5,5">
              <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite"/>
            </line>
            
            <circle cx="30%" cy="40%" r="5" fill="cyan" opacity="0.8">
              <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="90%" cy="60%" r="5" fill="cyan" opacity="0.8">
              <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite" begin="0.5s"/>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="0.5s"/>
            </circle>
            <circle cx="60%" cy="90%" r="5" fill="cyan" opacity="0.8">
              <animate attributeName="r" values="3;7;3" dur="2s" repeatCount="indefinite" begin="1s"/>
              <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" begin="1s"/>
            </circle>
          </svg>
          
          <div className="absolute top-1/4 left-1/5 animate-bounce" style={{animationDuration: '3s'}}>
            <Icon name="Wifi" className="w-12 h-12 opacity-30" />
          </div>
          <div className="absolute bottom-1/4 right-1/5 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>
            <Icon name="Radio" className="w-10 h-10 opacity-30" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
            <Icon name="Tv" className="w-10 h-10 opacity-30" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-bounce" style={{animationDuration: '3.2s', animationDelay: '0.7s'}}>
            <Icon name="Globe" className="w-14 h-14 opacity-30" />
          </div>
          <div className="absolute top-1/2 left-1/6 animate-bounce" style={{animationDuration: '3.8s', animationDelay: '1.5s'}}>
            <Icon name="Monitor" className="w-10 h-10 opacity-30" />
          </div>
          <div className="absolute bottom-1/5 right-1/6 animate-bounce" style={{animationDuration: '3.3s', animationDelay: '2s'}}>
            <Icon name="Smartphone" className="w-8 h-8 opacity-30" />
          </div>
          <div className="absolute top-1/5 right-1/3 animate-bounce" style={{animationDuration: '4.2s'}}>
            <Icon name="Signal" className="w-10 h-10 opacity-30" />
          </div>
        </div>
        
        <div className="absolute animate-rocket opacity-30">
          <Icon name="Rocket" className="w-16 h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
        </div>
      </section>

      <section id="providers" className="py-16 bg-muted/30">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши провайдеры</h2>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {[...providers, ...providers, ...providers].map((provider, index) => (
                <div
                  key={`${provider.id}-${index}`}
                  className="flex-shrink-0 mx-8 cursor-pointer transition-transform hover:scale-110"
                  onClick={() => setSelectedProvider(selectedProvider === provider.id ? null : provider.id)}
                >
                  <div className="w-32 h-32 bg-white rounded-lg shadow-md flex items-center justify-center p-4 hover:shadow-xl transition-shadow">
                    <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain" />
                  </div>
                  <p className="text-center mt-3 font-semibold text-sm">{provider.name}</p>
                </div>
              ))}
            </div>
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

      <Dialog open={showUserAgreement} onOpenChange={setShowUserAgreement}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Пользовательское соглашение</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между владельцем сайта Телепорт (далее — Администрация) и пользователями сайта.</p>
            
            <h3 className="font-semibold text-base mt-4">1. Общие положения</h3>
            <p>1.1. Используя сайт Телепорт, вы соглашаетесь с условиями настоящего Соглашения.</p>
            <p>1.2. Если вы не согласны с условиями Соглашения, пожалуйста, прекратите использование сайта.</p>
            <p>1.3. Администрация оставляет за собой право изменять Соглашение без предварительного уведомления.</p>
            
            <h3 className="font-semibold text-base mt-4">2. Предмет соглашения</h3>
            <p>2.1. Администрация предоставляет пользователю доступ к информации о тарифах интернет-провайдеров.</p>
            <p>2.2. Администрация выступает в качестве посредника между пользователем и провайдерами услуг.</p>
            <p>2.3. Фактическое оказание услуг осуществляется непосредственно провайдерами (МТС, Билайн, МегаФон, Ростелеком).</p>
            
            <h3 className="font-semibold text-base mt-4">3. Права и обязанности пользователя</h3>
            <p>3.1. Пользователь обязуется предоставлять достоверную информацию при заполнении форм.</p>
            <p>3.2. Пользователь несет ответственность за сохранность своих персональных данных.</p>
            <p>3.3. Пользователь обязуется не использовать сайт в противоправных целях.</p>
            
            <h3 className="font-semibold text-base mt-4">4. Ответственность сторон</h3>
            <p>4.1. Администрация не несет ответственности за качество услуг, предоставляемых провайдерами.</p>
            <p>4.2. Информация на сайте носит справочный характер и может быть изменена провайдерами.</p>
            <p>4.3. Администрация не несет ответственности за технические сбои и временную недоступность сайта.</p>
            
            <h3 className="font-semibold text-base mt-4">5. Контактная информация</h3>
            <p>По всем вопросам, связанным с настоящим Соглашением, обращайтесь по телефону: 8-995-150-88-33</p>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCookiesPolicy} onOpenChange={setShowCookiesPolicy}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Политика использования Cookie</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-sm">
            <p>Настоящая Политика использования файлов Cookie объясняет, что такое файлы Cookie и как мы их используем на сайте Телепорт.</p>
            
            <h3 className="font-semibold text-base mt-4">1. Что такое Cookie</h3>
            <p>Cookie — это небольшие текстовые файлы, которые сохраняются на вашем устройстве при посещении сайта. Они помогают сайту запоминать информацию о вашем визите.</p>
            
            <h3 className="font-semibold text-base mt-4">2. Какие Cookie мы используем</h3>
            <p><strong>Необходимые Cookie:</strong> Обеспечивают базовую функциональность сайта (запоминание выбора языка, авторизация).</p>
            <p><strong>Аналитические Cookie:</strong> Помогают понять, как пользователи взаимодействуют с сайтом, чтобы улучшить его работу.</p>
            <p><strong>Функциональные Cookie:</strong> Запоминают ваши предпочтения и выбор (например, выбранный провайдер).</p>
            
            <h3 className="font-semibold text-base mt-4">3. Зачем нужны Cookie</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Обеспечение корректной работы функций сайта</li>
              <li>Запоминание выбранных настроек и фильтров</li>
              <li>Анализ посещаемости для улучшения сервиса</li>
              <li>Персонализация контента</li>
            </ul>
            
            <h3 className="font-semibold text-base mt-4">4. Как управлять Cookie</h3>
            <p>Вы можете настроить ваш браузер так, чтобы он блокировал все Cookie или уведомлял о их отправке. Однако это может привести к некорректной работе некоторых функций сайта.</p>
            <p>Инструкции по управлению Cookie доступны в настройках вашего браузера:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Google Chrome: Настройки → Конфиденциальность и безопасность → Файлы cookie</li>
              <li>Mozilla Firefox: Настройки → Приватность и защита → Куки и данные сайтов</li>
              <li>Safari: Настройки → Конфиденциальность → Управление данными сайтов</li>
              <li>Microsoft Edge: Настройки → Файлы cookie и разрешения сайтов</li>
            </ul>
            
            <h3 className="font-semibold text-base mt-4">5. Обновления политики</h3>
            <p>Мы можем обновлять данную Политику. Рекомендуем периодически проверять эту страницу на наличие изменений.</p>
            
            <h3 className="font-semibold text-base mt-4">6. Контакты</h3>
            <p>Если у вас есть вопросы о нашей Политике Cookie, свяжитесь с нами по телефону: 8-995-150-88-33</p>
          </div>
        </DialogContent>
      </Dialog>

      <footer className="border-t py-8 bg-card">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Отзывы наших клиентов</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="animate-scale-in hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-xl">
                    А
                  </div>
                  <div>
                    <CardTitle className="text-lg">Алексей М.</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Отличный сервис! Помогли подобрать идеальный тариф для моей семьи. Интернет работает стабильно, скорость соответствует заявленной. Подключили за 2 дня. Рекомендую!
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-megafon to-primary flex items-center justify-center text-white font-bold text-xl">
                    М
                  </div>
                  <div>
                    <CardTitle className="text-lg">Мария К.</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Очень довольна! Менеджеры вежливые, всё объяснили по полочкам. Цены действительно выгодные, особенно в первые месяцы. ТВ каналы отличные, есть всё что нужно.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-rostelecom flex items-center justify-center text-white font-bold text-xl">
                    Д
                  </div>
                  <div>
                    <CardTitle className="text-lg">Дмитрий В.</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Быстрое подключение, отличная скорость интернета для работы из дома. Никаких скрытых платежей, всё прозрачно. Спасибо за качественный сервис!
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-beeline to-mts flex items-center justify-center text-white font-bold text-xl">
                    Е
                  </div>
                  <div>
                    <CardTitle className="text-lg">Елена С.</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Сравнивала тарифы на разных сайтах, здесь самое удобное сравнение. Консультант помог выбрать оптимальный вариант. Подключили быстро, всё работает отлично!
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-megafon flex items-center justify-center text-white font-bold text-xl">
                    И
                  </div>
                  <div>
                    <CardTitle className="text-lg">Игорь П.</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Профессиональный подход! Проверили адрес, предложили несколько вариантов. Выбрал тариф с максимальной скоростью - ни разу не пожалел. Стримы идут без лагов.
                </p>
              </CardContent>
            </Card>

            <Card className="animate-scale-in hover:shadow-lg transition-shadow" style={{animationDelay: '0.5s'}}>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-beeline flex items-center justify-center text-white font-bold text-xl">
                    О
                  </div>
                  <div>
                    <CardTitle className="text-lg">Ольга Т.</CardTitle>
                    <div className="flex gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} name="Star" className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Переехала в новую квартиру, нужен был интернет срочно. Обратилась сюда - подключили через 3 дня! Цена супер, качество связи на высоте. Всем советую!
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12 border-t pt-12">
            <div className="animate-scale-in">
              <div className="text-4xl font-bold text-primary mb-2">15 000+</div>
              <p className="text-sm text-muted-foreground">Довольных клиентов</p>
            </div>
            <div className="animate-scale-in" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <p className="text-sm text-muted-foreground">Средняя оценка</p>
            </div>
            <div className="animate-scale-in" style={{animationDelay: '0.4s'}}>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <p className="text-sm text-muted-foreground">Поддержка клиентов</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-8">
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
              <p>© 2025 Телепорт. Все права защищены.</p>
              <div className="flex gap-4">
                <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
              </div>
            </div>
            <div className="mt-4 text-xs text-muted-foreground text-center md:text-left">
              <p>Продолжая использовать наш сайт, вы даете согласие на обработку файлов{' '}
                <button onClick={() => setShowCookiesPolicy(true)} className="underline hover:text-foreground transition-colors">
                  Cookies
                </button>
                {' '}и других пользовательских данных, в соответствии с{' '}
                <button onClick={() => setShowPrivacyPolicy(true)} className="underline hover:text-foreground transition-colors">
                  Политикой конфиденциальности
                </button>
                {' '}и{' '}
                <button onClick={() => setShowUserAgreement(true)} className="underline hover:text-foreground transition-colors">
                  Пользовательским соглашением
                </button>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}