import { Calendar, FileText, MessageSquare } from "lucide-react";
import { RequestCard } from "@/components/dashboard/RequestCard";
import { QuickLinkCard } from "@/components/dashboard/QuickLinkCard";
import { HeroCarousel } from "@/components/dashboard/HeroCarousel";

const quickLinks = [
  {
    icon: Calendar,
    title: "Захиалгын хуваарь",
    description:
      "Нийлүүлж буй бүтээгдэхүүний татан авалтын захиалгын хуваарийг календараар харах.",
  },
  {
    icon: FileText,
    title: "Нэмэмжлэх",
    description:
      "Төлбөр тооцоо нийлэлт, нэхэмжлэх үүсгэх. Өмнөх төлбөр тооцоо нийлэлт хянах.",
  },
  {
    icon: MessageSquare,
    title: "Санал хүсэлт",
    description:
      "Бүтээгдэхүүн, үйл ажиллагаатай холбоотой санал гомдол илгээх. Санал гомдлын төлөв хянах.",
  },
];

const requestCards = [
  {
    image: "/assets/plus.png",
    title: "Шинэ бараа нэмэх хүсэлт",
    description:
      "Бүтээгдэхүүн, үйл ажиллагаатай холбоотой санал гомдол илгээх. Санал гомдлын төлөв хянах",
  },
  {
    image: "/assets/receipt.png",
    title: "Бар код өөрчлөх хүсэлт",
    description:
      "Бүтээгдэхүүн, үйл ажиллагаатай холбоотой санал гомдол илгээх. Санал гомдлын төлөв хянах",
  },
  {
    image: "/assets/wallet.png",
    title: "Үнэ өөрчлөх хүсэлт",
    description:
      "Бүтээгдэхүүн, үйл ажиллагаатай холбоотой санал гомдол илгээх.",
  },
  {
    image: "/assets/package-open.png",
    title: "Тасалдал бүртгэх",
    description:
      "Бүтээгдэхүүн, үйл ажиллагаатай холбоотой санал гомдол илгээх. Санал гомдлын төлөв хянах",
  },
  {
    image: "/assets/tag.png",
    title: "Урамшуулал нэмэх хүсэлт",
    description:
      "Бүтээгдэхүүн, үйл ажиллагаатай холбоотой санал гомдол илгээх. Санал гомдлын төлөв хянах",
  },
] as const;

export default function DashboardScreen() {
  return (
    <div className="flex w-full flex-col items-start gap-5 xl:flex-row">
      <div className="flex w-full min-w-0 flex-1 flex-col items-start gap-6 pb-6">
        <HeroCarousel />

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {quickLinks.map((item) => (
            <QuickLinkCard key={item.title} {...item} />
          ))}
        </div>
      </div>

      <div className="flex w-full flex-col gap-5 xl:w-[380px] xl:shrink-0">
        {requestCards.map((item) => (
          <RequestCard key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
}
