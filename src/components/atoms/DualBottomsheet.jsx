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

  const bind = useDrag(
    ({ movement: [x, my], down, distance, tap, first, last }) => {
      if (tap) {
        // If it's a tap, don't move the sheet, but handle internal component events
        return;
      }

      if (first) {
        set({ y: my }); // Start dragging
      } else if (last) {
        const closeThreshold = EXPANDED_Y + 5;
        const openThreshold = COLLAPSED_Y - 5;

        console.log(
          "my, closseThreshodl, openThreshold",
          my,
          closeThreshold,
          openThreshold
        );
        // Check against the thresholds to determine the new state
        if (expanded == true && my > closeThreshold) {
          set({ y: COLLAPSED_Y, config: { duration: 250 } });
          setExpanded(false);
        }
        if (expanded == false && my < openThreshold) {
          set({ y: EXPANDED_Y, config: { duration: 250 } });
          setExpanded(true);
        }
        setActive(false);
      } else {
        // This will update y for dragging and will be "rubber-banded" within bounds
        set({ y: my, immediate: down, config: { duration: 0 } }); // Make dragging responsive
        setActive(down);
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
