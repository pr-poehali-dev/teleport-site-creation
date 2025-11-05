import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface Tariff {
  id: string;
  provider: "beeline" | "mts" | "megafon" | "rostelecom";
  name: string;
  speed: string;
  price: number;
  type: "internet" | "tv" | "bundle";
  channels?: number;
  features: string[];
}

const tariffs: Tariff[] = [
  {
    id: "1",
    provider: "beeline",
    name: "Домашний Интернет 100",
    speed: "100 Мбит/с",
    price: 450,
    type: "internet",
    features: ["Безлимитный трафик", "Wi-Fi роутер в аренду", "Без привязки к ТВ"]
  },
  {
    id: "2",
    provider: "beeline",
    name: "Интернет + ТВ",
    speed: "200 Мбит/с",
    price: 850,
    type: "bundle",
    channels: 150,
    features: ["200+ ТВ каналов", "HD качество", "Онлайн-кинотеатр"]
  },
  {
    id: "3",
    provider: "mts",
    name: "MTS 150",
    speed: "150 Мбит/с",
    price: 500,
    type: "internet",
    features: ["Стабильная скорость", "Техподдержка 24/7", "Бесплатная установка"]
  },
  {
    id: "4",
    provider: "mts",
    name: "MTS Premium",
    speed: "300 Мбит/с",
    price: 990,
    type: "bundle",
    channels: 200,
    features: ["300+ каналов", "4K контент", "Мобильное ТВ"]
  },
  {
    id: "5",
    provider: "megafon",
    name: "Интернет 200",
    speed: "200 Мбит/с",
    price: 550,
    type: "internet",
    features: ["Без скрытых платежей", "Статический IP", "Антивирус в подарок"]
  },
  {
    id: "6",
    provider: "megafon",
    name: "МегаКомбо",
    speed: "500 Мбит/с",
    price: 1200,
    type: "bundle",
    channels: 250,
    features: ["Максимальная скорость", "300+ каналов", "Запись эфира"]
  },
  {
    id: "7",
    provider: "rostelecom",
    name: "Базовый 100",
    speed: "100 Мбит/с",
    price: 400,
    type: "internet",
    features: ["Стабильное подключение", "Оптоволокно", "Без ограничений"]
  },
  {
    id: "8",
    provider: "rostelecom",
    name: "Интерактивное ТВ",
    speed: "300 Мбит/с",
    price: 1100,
    type: "bundle",
    channels: 280,
    features: ["Интерактивное ТВ", "Управление эфиром", "Мультирум"]
  }
];

const providers = [
  { id: "beeline", name: "Билайн", color: "beeline", icon: "Wifi" },
  { id: "mts", name: "МТС", color: "mts", icon: "Radio" },
  { id: "megafon", name: "МегаФон", color: "megafon", icon: "Signal" },
  { id: "rostelecom", name: "Ростелеком", color: "rostelecom", icon: "Globe" }
];

export default function Index() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [serviceType, setServiceType] = useState<"all" | "internet" | "tv" | "bundle">("all");
  const [compareList, setCompareList] = useState<string[]>([]);
  const { toast } = useToast();

  const filteredTariffs = tariffs.filter(tariff => {
    const matchesProvider = !selectedProvider || tariff.provider === selectedProvider;
    const matchesType = serviceType === "all" || tariff.type === serviceType;
    return matchesProvider && matchesType;
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
          <nav className="hidden md:flex gap-6">
            <a href="#providers" className="text-sm font-medium hover:text-accent transition-colors">Провайдеры</a>
            <a href="#tariffs" className="text-sm font-medium hover:text-accent transition-colors">Тарифы</a>
            <a href="#compare" className="text-sm font-medium hover:text-accent transition-colors">Сравнение</a>
            <a href="#order" className="text-sm font-medium hover:text-accent transition-colors">Заказать</a>
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-accent to-rostelecom py-20 text-white">
        <div className="container relative z-10 px-4">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <h2 className="text-5xl font-bold mb-4">Будь здесь и там одновременно</h2>
            <p className="text-xl mb-8 text-white/90">
              Сравните тарифы от ведущих провайдеров и найдите идеальное подключение
            </p>
            <Button size="lg" variant="secondary" className="text-lg px-8">
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
                  <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-${provider.color}/10`}>
                    <Icon name={provider.icon as any} className={`h-8 w-8 text-${provider.color}`} />
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
          <h2 className="text-3xl font-bold text-center mb-8">Тарифы</h2>
          
          <Tabs value={serviceType} onValueChange={(value) => setServiceType(value as any)} className="mb-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="internet">Интернет</TabsTrigger>
              <TabsTrigger value="tv">ТВ</TabsTrigger>
              <TabsTrigger value="bundle">Комбо</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTariffs.map((tariff) => (
              <Card key={tariff.id} className="relative animate-scale-in hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className={`bg-${tariff.provider}/10 text-${tariff.provider} border-${tariff.provider}/20`}>
                      {providers.find(p => p.id === tariff.provider)?.name}
                    </Badge>
                    <Checkbox
                      checked={compareList.includes(tariff.id)}
                      onCheckedChange={() => toggleCompare(tariff.id)}
                    />
                  </div>
                  <CardTitle className="text-xl">{tariff.name}</CardTitle>
                  <CardDescription className="text-2xl font-bold text-foreground mt-2">
                    {tariff.price} ₽/мес
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
                  <Button className="w-full">Подключить</Button>
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
                        <Badge className={`mb-2 bg-${tariff.provider}`}>
                          {providers.find(p => p.id === tariff.provider)?.name}
                        </Badge>
                        <CardTitle>{tariff.name}</CardTitle>
                        <CardDescription className="text-2xl font-bold text-foreground">
                          {tariff.price} ₽/мес
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

      <section id="order" className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="mx-auto max-w-xl">
            <h2 className="text-3xl font-bold text-center mb-8">Оставить заявку</h2>
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ФИО</Label>
                    <Input id="name" required placeholder="Иванов Иван Иванович" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" type="tel" required placeholder="+7 (999) 123-45-67" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Адрес подключения</Label>
                    <Input id="address" required placeholder="г. Москва, ул. Ленина, д. 1, кв. 1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="comment">Комментарий</Label>
                    <Textarea id="comment" placeholder="Укажите предпочитаемого провайдера или тариф" />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    Отправить заявку
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

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
                <p className="flex items-center gap-2">
                  <Icon name="Phone" className="h-4 w-4" />
                  8 (800) 555-35-35
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" className="h-4 w-4" />
                  info@teleport.ru
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Социальные сети</h3>
              <div className="flex gap-3">
                <Button size="icon" variant="outline">
                  <Icon name="Send" className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="MessageCircle" className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Share2" className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2024 Телепорт. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
