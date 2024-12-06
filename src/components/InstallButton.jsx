// InstallButton.js
import { useEffect, useState } from "react";

const InstallButton = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      // Update UI to notify the user they can install the PWA
      setShowButton(true);
    });
  }, []);

  const handleInstallClick = () => {
    // Hide the install button
    setShowButton(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
      setDeferredPrompt(null);
    });
  };

  return (
    showButton && (
      <button onClick={handleInstallClick} style={buttonStyle}>
        Install App
      </button>
    )
  );
};

const buttonStyle = {
  position: "fixed",
  bottom: "20px",
  right: "20px",
  backgroundColor: "#007bff",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
};

export default InstallButton;
