import React, { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import { useDrag } from "react-use-gesture";

const EXPANDED_Y = 40; // Position for the expanded state
const COLLAPSED_Y = 350; // Position for the collapsed state

const DualBottomsheet = ({ className, children }) => {
  const [active, setActive] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const [{ y }, set] = useSpring(() => ({
    y: COLLAPSED_Y,
    config: config.stiff,
  }));

  const onProgress = (currentY, reset) => {
    if (reset) {
      if (currentY === COLLAPSED_Y) {
        set.start({ y: COLLAPSED_Y - 80, config: { duration: 250 } });
      } else if (currentY === EXPANDED_Y) {
        set.start({ y: EXPANDED_Y + 22, config: { duration: 250 } });
      }
      return;
    }
    if (currentY < COLLAPSED_Y - 58) {
      set.start({ y: currentY - 22, config: { duration: 60 } });
    }
  };

  const bind = useDrag(
    ({ movement: [x, currentY], down, distance, tap, first, last }) => {
      if (tap) {
        // If it's a tap, don't move the sheet, but handle internal component events
        return;
      }

      if (first) {
        set({ y: currentY }); // Start dragging
      } else if (last) {
        if (currentY >= (EXPANDED_Y + COLLAPSED_Y) / 2) {
          set({ y: COLLAPSED_Y, config: { duration: 250 } });
          setExpanded(false);
        } else {
          set({ y: EXPANDED_Y, config: { duration: 250 } });
          setExpanded(true);
        }
        setActive(false);
      } else if (down) {
        set({ y: currentY, config: { duration: 60 } });
        setActive(true);
      }
    },
    {
      initial: () => [0, y.get()],
      bounds: { left: 0, right: 0, top: EXPANDED_Y, bottom: COLLAPSED_Y },
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
