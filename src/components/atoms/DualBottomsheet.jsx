import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useDrag } from "react-use-gesture";
import { Bottomsheet } from "./Bottomsheet";

const BOTTOM_THRESHOLD = 241;

const expandedcss = "z-10 flex flex-col gap-3 h-80 overflow-y: scroll";
const closedcss = "z-10 flex flex-col gap-3 h-40 overflow-y: scroll";

const DualBottomsheet = ({ className, children }) => {
  const [active, setActive] = useState({ top: false, bottom: false });
  const [expanded, setExpanded] = useState(false);
  const [{ y: bottomY }, bottomSet] = useSpring(() => ({
    y: 400,
    config: {
      ...config,
    },
  }));
  const y = bottomY;
  const set = bottomSet;
  const onActive = (bottomActive) =>
    setActive({ ...active, bottom: bottomActive });
  const onProgress = (y, reset) => {
    if (active.bottom) {
      if (reset) {
        if (y === 400) {
          topSet({ y: 320, config: { duration: 250 } });
        } else if (y === 82) {
          topSet({ y: 60, config: { duration: 250 } });
        }
        return;
      }
      if (y < 342) {
        topSet({ y: y - 22, config: { duration: 60 } });
      }
    }
  };

  const bind = useDrag(
    ({ movement: [x, y], down, tap }) => {
      if (!down && tap) {
        if (expanded) {
          set({ y: 400, config: { duration: 250 } });
          onProgress(400, true);
        } else {
          set({ y: 82, config: { duration: 250 } });
          onProgress(82, true);
        }
        setExpanded(!expanded);
        return;
      }
      if (!down) {
        if (y >= BOTTOM_THRESHOLD) {
          set({ y: 400, config: { duration: 250 } });
          onProgress(400, true);
          setExpanded(false);
        } else {
          set({ y: 82, config: { duration: 250 } });
          onProgress(82, false);
          setExpanded(true);
        }
        onActive(false);
      } else {
        set({ y, config: { duration: 60 } });
        onActive(true);
        onProgress(y, false);
      }
    },
    {
      initial: () => [0, y.get()],
      bounds: { left: 0, right: 0, top: 82, bottom: 400 },
      rubberband: true,
    }
  );

  return (
    <animated.div
      className={`w-screen h-4/5 ${className}`}
      style={{ y }}
      {...bind()}
    >
      {children}
    </animated.div>
  );
};

export default DualBottomsheet;
