declare module "@phosphor-icons/react" {
  import * as React from "react";

  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    weight?:
      | number
      | "thin"
      | "light"
      | "regular"
      | "bold"
      | "fill"
      | "duotone";
    mirrored?: boolean;
  }

  export type Icon = React.ComponentType<IconProps>;

  export const SpinnerIcon: Icon;
  export const IconContext: React.Context<unknown>;
  export const IconBase: React.ComponentType<IconProps>;
}
