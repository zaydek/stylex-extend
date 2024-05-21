import { useEffect, useState } from "react";

// DebugCSS mounts a <style> element to the <head> when the backtick key is
// pressed. The <style> element applies an outline to all elements.
export function DebugCSS() {
  const [enabled, setEnabled] = useState(false);

  // Bind the backtick key to toggle the [data-debug-css] style
  useEffect(() => {
    function keydown(e: KeyboardEvent) {
      if (e.key === "`") {
        setEnabled((prev) => !prev);
      }
    }
    document.addEventListener("keydown", keydown);
    return () => document.removeEventListener("keydown", keydown);
  }, []);

  // Apply the [data-debug-css] attribute to the <html> element when enabled
  useEffect(() => {
    if (enabled) {
      const style = document.createElement("style");
      style.textContent = `
        [data-debug-css] *:not(svg *) {
          outline: 1px solid hsl(200 100% 50% / 50%);
          outline-offset: -0.5px;
        }
      `;
      document.head.appendChild(style);
      document.documentElement.setAttribute("data-debug-css", "");
      return () => void document.head.removeChild(style);
    } else {
      document.documentElement.removeAttribute("data-debug-css");
    }
  }, [enabled]);

  return null;
}
