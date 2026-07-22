import Image from "next/image";

export function RequestCard({
  image,
  title,
  description,
}: {
  image: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group flex w-full items-center gap-3 rounded-xl border-default bg-background p-3 pr-4 shadow-none transition-colors sm:gap-4">
      <div className="relative h-18 w-18 shrink-0 overflow-hidden bg-muted sm:h-24 sm:w-24 lg:h-[100px] lg:w-[100px]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="100px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start gap-1 sm:gap-2">
        <h4 className="line-clamp-1 text-sm font-bold leading-6 text-foreground sm:text-base transition-colors duration-200 group-hover:text-primary">
          {title}
        </h4>

        <p className="body-2-regular text-foreground-secondary">
          {description}
        </p>
      </div>
    </div>
  );
}
