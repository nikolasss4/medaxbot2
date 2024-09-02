const translateToUkrainian = () => {
  const buttonTranslations = {
    'Start New Chat': 'Почати Чат',
    'End Chat': 'Закінчити Чат',
    'Cancel': 'Відмінити'
  };

  const translateButton = (button) => {
    const originalText = button.textContent.trim();
    if (buttonTranslations[originalText]) {
      button.textContent = buttonTranslations[originalText];
    }
  };

  const observeChat = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              node.querySelectorAll('button').forEach(translateButton);
            }
          });
        }
      });
    });

    const chatContainer = document.getElementById('voiceflow-chat-frame');
    if (chatContainer) {
      observer.observe(chatContainer, { childList: true, subtree: true });
    }
  };

  // Initial translation of existing buttons
  document.querySelectorAll('button').forEach(translateButton);

  // Start observing for dynamically added buttons
  observeChat();
};

// Export the function so it can be used in the main script
export { translateToUkrainian };
