import { Card } from "../ui/card";

export function QuickLinkCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Card className="flex flex-col gap-5 items-start p-6 bg-background">
      <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-accent text-brand-700">
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="body-2-regular text-foreground-secondary">
          {description}
        </p>
      </div>
    </Card>
  );
}
