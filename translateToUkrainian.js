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
      // Update the label attribute if it exists
      if (button.hasAttribute('label')) {
        button.setAttribute('label', buttonTranslations[originalText]);
      }
    }
  };

  const findAndTranslateButtons = () => {
    // Target buttons with the specific classes
    document.querySelectorAll('.vfrc-button.vfrc-button--primary').forEach(translateButton);

    // Target buttons with specific labels
    document.querySelectorAll('button[label="End Chat"], button[label="Cancel"]').forEach(translateButton);
  };

  const observeChat = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.matches('.vfrc-button.vfrc-button--primary')) {
                translateButton(node);
              } else {
                node.querySelectorAll('.vfrc-button.vfrc-button--primary').forEach(translateButton);
              }
            }
          });
        } else if (mutation.type === 'attributes') {
          if (mutation.target.matches('.vfrc-button.vfrc-button--primary')) {
            translateButton(mutation.target);
          }
        }
      });
    });

    // Observe the entire document
    observer.observe(document.body, { 
      childList: true, 
      subtree: true, 
      attributes: true, 
      attributeFilter: ['label', 'class'] 
    });
  };

  // Initial translation
  findAndTranslateButtons();

  // Start observing for dynamically added buttons
  observeChat();

  // Retry translation after short delays to catch any late-rendering elements
  setTimeout(findAndTranslateButtons, 1000);
  setTimeout(findAndTranslateButtons, 3000);
};

// Export the function so it can be used in the main script
export { translateToUkrainian };

// Export the function so it can be used in the main script
export { translateToUkrainian };
