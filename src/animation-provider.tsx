import { createContext } from "react";

export type Animation = "HIDDEN" | "IN" | "VISIBLE" | "OUT";

export const AnimationContext = createContext<Animation>("HIDDEN");
export const SetAnimationContext = createContext<React.Dispatch<React.SetStateAction<Animation>>>(() => {});

export function toggleAnimation(prev: Animation): Animation {
  switch (prev) {
    case "HIDDEN":
      return "IN";
    case "VISIBLE":
      return "OUT";
    default:
      return prev;
  }
}

export function handleAnimationEnd(prev: Animation): Animation {
  switch (prev) {
    case "IN":
      return "VISIBLE";
    case "OUT":
      return "HIDDEN";
    default:
      return prev;
  }
}

export type AnimationProviderProps = React.PropsWithChildren<{
  animation: Animation;
  setAnimation: React.Dispatch<React.SetStateAction<Animation>>;
}>;

export function AnimationProvider({ animation, setAnimation, ...props }: AnimationProviderProps): React.ReactElement {
  return (
    <SetAnimationContext.Provider value={setAnimation}>
      <AnimationContext.Provider value={animation}>{props.children}</AnimationContext.Provider>
    </SetAnimationContext.Provider>
  );
}
