import "./comeau.css";

import { inline as atom } from "@stylex-extend/core";
import * as stylex from "@stylexjs/stylex";
import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  Animation,
  AnimationContext,
  AnimationProvider,
  SetAnimationContext,
  handleAnimationEnd,
  toggleAnimation,
} from "./animation-provider";
import { DebugCSS } from "./debug-css";

const animationBackdropIn = stylex.keyframes({ from: { opacity: 0 }, to: { opacity: 1 } }); // prettier-ignore
const animationBackdropOut = stylex.keyframes({ from: { opacity: 1 }, to: { opacity: 0 } }); // prettier-ignore
const animationModalIn = stylex.keyframes({ from: { opacity: 0, transform: "scale(0.9875)" }, to: { opacity: 1, transform: "scale(1)" } }); // prettier-ignore
const animationModalOut = stylex.keyframes({ from: { opacity: 1, transform: "scale(1)" }, to: { opacity: 0, transform: "scale(0.9875)" } }); // prettier-ignore

const backdropStyles = stylex.create({
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.375)",
    inset: 0,
    position: "fixed",
    zIndex: 100 - 10,
  },
  backdropAnimationIn: {
    animationDuration: "200ms",
    animationFillMode: "forwards",
    animationName: animationBackdropIn,
    animationTimingFunction: "ease",
  },
  backdropAnimationOut: {
    animationDuration: "200ms",
    animationFillMode: "forwards",
    animationName: animationBackdropOut,
    animationTimingFunction: "ease",
  },
});

const modalStyles = stylex.create({
  modal: {
    backgroundColor: "white",
    blockSize: "fit-content",
    borderRadius: 24,
    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    inset: 24,
    margin: "auto",
    maxBlockSize: "calc(min(640px, 100dvh) - 24px * 2)",
    position: "fixed",
    zIndex: 100,
  },
  modalAnimationIn: {
    animationDuration: "200ms",
    animationFillMode: "forwards",
    animationName: animationModalIn,
    animationTimingFunction: "ease",
  },
  modalAnimationOut: {
    animationDuration: "200ms",
    animationFillMode: "forwards",
    animationName: animationModalOut,
    animationTimingFunction: "ease",
  },
});

const resetStyles = stylex.create({
  button: {
    border: "none",
    backgroundColor: "none",
  },
});

const buttonStyles = stylex.create({
  primary: {
    ...stylex.include(resetStyles.button),
    alignItems: "center",
    backgroundColor: {
      default: "blue",
      ":hover": "green",
      ":active": "red",
    },
    blockSize: 40,
    borderRadius: 1e3,
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
  secondary: {
    ...stylex.include(resetStyles.button),
    alignItems: "center",
    backgroundColor: {
      default: "orange",
      ":hover": "green",
      ":active": "red",
    },
    blockSize: 40,
    borderRadius: 1e3,
    color: "white",
    display: "flex",
    justifyContent: "center",
  },
});

const typographyStyles = stylex.create({
  title: {
    fontSize: 24,
    fontWeight: 500,
    lineHeight: 1.375,
  },
});

function ModalStyleAlert() {
  const animation = useContext(AnimationContext);
  const setAnimation = useContext(SetAnimationContext);

  return (
    <>
      <div
        {...stylex.props(
          backdropStyles.backdrop,
          (() => {
            switch (animation) {
              case "IN":
                return backdropStyles.backdropAnimationIn;
              case "OUT":
                return backdropStyles.backdropAnimationOut;
            }
          })(),
        )}
        onAnimationEnd={() => setAnimation(handleAnimationEnd)}
      />
      <div
        {...stylex.props(
          modalStyles.modal,
          (() => {
            switch (animation) {
              case "IN":
                return modalStyles.modalAnimationIn;
              case "OUT":
                return modalStyles.modalAnimationOut;
            }
          })(),
          atom({
            gap: 24,
            maxInlineSize: 384,
            padding: 24,
          }),
        )}
        onAnimationEnd={() => setAnimation(handleAnimationEnd)}
      >
        {/* MASTHEAD */}
        <div
          {...stylex.props(
            atom({
              backgroundColor: "blue",
              blockSize: 56,
              borderRadius: 1e3,
              inlineSize: 56,
            }),
            atom({ alignSelf: "center" }),
          )}
        />
        <div {...stylex.props(typographyStyles.title, atom({ textAlign: "center" }))}>
          Are you sure you want to continue? This action cannot be undone.
        </div>
        <div
          {...stylex.props(
            atom({
              display: "grid",
              gap: 16,
              gridTemplateColumns: "1fr 1fr",
            }),
          )}
        >
          <button {...stylex.props(buttonStyles.primary)} onClick={() => setAnimation(toggleAnimation)}>
            Click me
          </button>
          <button {...stylex.props(buttonStyles.secondary)} onClick={() => setAnimation(toggleAnimation)}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

function ModalStyleDialog() {
  const animation = useContext(AnimationContext);
  const setAnimation = useContext(SetAnimationContext);

  return (
    <>
      <div
        {...stylex.props(
          backdropStyles.backdrop,
          (() => {
            switch (animation) {
              case "IN":
                return backdropStyles.backdropAnimationIn;
              case "OUT":
                return backdropStyles.backdropAnimationOut;
            }
          })(),
        )}
        onAnimationEnd={() => setAnimation(handleAnimationEnd)}
      />
      <div
        {...stylex.props(
          modalStyles.modal,
          (() => {
            switch (animation) {
              case "IN":
                return modalStyles.modalAnimationIn;
              case "OUT":
                return modalStyles.modalAnimationOut;
            }
          })(),
          atom({ maxInlineSize: 512 }),
        )}
        onAnimationEnd={() => setAnimation(handleAnimationEnd)}
      >
        {/* HEADER */}
        <header
          {...stylex.props(
            atom({
              display: "flex",
              flexDirection: "column",
              gap: 24,
              padding: 24,
              paddingBlockEnd: 8,
            }),
          )}
        >
          {/* MASTHEAD */}
          <div
            {...stylex.props(
              atom({
                backgroundColor: "blue",
                blockSize: 56,
                borderRadius: 1e3,
                inlineSize: 56,
              }),
            )}
          />
          <div {...stylex.props(typographyStyles.title)}>Hello, world!</div>
        </header>
        <div
          {...stylex.props(
            atom({
              display: "flex",
              flexDirection: "column",
              gap: 8,
              minBlockSize: 0,
              overflowY: "scroll",
              paddingInline: 24,
            }),
          )}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices dictum vestibulum. Quisque posuere,
            urna eget facilisis tincidunt, lacus felis sagittis arcu, eget scelerisque nunc est nec felis. Pellentesque
            in semper nunc. Nulla facilisi. Maecenas ac blandit sapien. Mauris non mattis tellus. Sed iaculis blandit
            aliquam. Sed nec nibh volutpat, euismod elit vitae, dignissim ligula. Maecenas eget ornare leo. Etiam
            sagittis ultrices malesuada. Nunc a dui dolor.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices dictum vestibulum. Quisque posuere,
            urna eget facilisis tincidunt, lacus felis sagittis arcu, eget scelerisque nunc est nec felis. Pellentesque
            in semper nunc. Nulla facilisi. Maecenas ac blandit sapien. Mauris non mattis tellus. Sed iaculis blandit
            aliquam. Sed nec nibh volutpat, euismod elit vitae, dignissim ligula. Maecenas eget ornare leo. Etiam
            sagittis ultrices malesuada. Nunc a dui dolor.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices dictum vestibulum. Quisque posuere,
            urna eget facilisis tincidunt, lacus felis sagittis arcu, eget scelerisque nunc est nec felis. Pellentesque
            in semper nunc. Nulla facilisi. Maecenas ac blandit sapien. Mauris non mattis tellus. Sed iaculis blandit
            aliquam. Sed nec nibh volutpat, euismod elit vitae, dignissim ligula. Maecenas eget ornare leo. Etiam
            sagittis ultrices malesuada. Nunc a dui dolor.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices dictum vestibulum. Quisque posuere,
            urna eget facilisis tincidunt, lacus felis sagittis arcu, eget scelerisque nunc est nec felis. Pellentesque
            in semper nunc. Nulla facilisi. Maecenas ac blandit sapien. Mauris non mattis tellus. Sed iaculis blandit
            aliquam. Sed nec nibh volutpat, euismod elit vitae, dignissim ligula. Maecenas eget ornare leo. Etiam
            sagittis ultrices malesuada. Nunc a dui dolor.
          </p>
        </div>
        {/* FOOTER */}
        <footer
          {...stylex.props(
            atom({
              display: "grid",
              gap: 16,
              gridTemplateColumns: "1fr 1fr",
              padding: 24,
            }),
          )}
        >
          <button {...stylex.props(buttonStyles.primary)} onClick={() => setAnimation(toggleAnimation)}>
            Click me
          </button>
          <button {...stylex.props(buttonStyles.secondary)} onClick={() => setAnimation(toggleAnimation)}>
            Cancel
          </button>
        </footer>
      </div>
    </>
  );
}

function App() {
  const [modalStyleDialog, setModalStyleDialog] = useState<Animation>("HIDDEN");
  const [modalStyleAlert, setModalStyleAlert] = useState<Animation>("HIDDEN");

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      switch (e.key) {
        case "[":
          setModalStyleAlert(toggleAnimation);
          break;
        case "]":
          setModalStyleDialog(toggleAnimation);
          break;
      }
    }
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  return (
    <>
      <DebugCSS />
      {modalStyleDialog !== "HIDDEN" && (
        <AnimationProvider animation={modalStyleDialog} setAnimation={setModalStyleDialog}>
          <ModalStyleDialog />
        </AnimationProvider>
      )}
      {modalStyleAlert !== "HIDDEN" && (
        <AnimationProvider animation={modalStyleAlert} setAnimation={setModalStyleAlert}>
          <ModalStyleAlert />
        </AnimationProvider>
      )}
    </>
  );
}

ReactDOM.createRoot(document.querySelector("#app")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
