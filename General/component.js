// HTML template for the chat widget
const chatWidgetHTML = `
<div class="umd-lib chat-widget closed" id="chatwidget">
  <button
    class="cw--header c-bg-primary"
    id="cw-service-status"
    type="button"
    aria-label="chat with us!"
    aria-expanded="false"
    aria-controls="cw--iframe"
  >
    <div class="cw--header-info">
      <div class="cw--icon" id="cw--icon" aria-hidden="true"></div>
      <div class="cw--text">Chat With Us!</div>
    </div>
    <div class="cw--header-sub" aria-hidden="true">
      <div class="cw--status" id="cw--status">
        live
      </div>
      <div
        class="cw--chevron i-chevron-down chevron-ver"
        id="cw--chevron"
      ></div>
    </div>
  </button>
  <div class="cw--iframe" id="cw--iframe">
    <iframe
      title="Chat with us!"
      src="https://umd.libanswers.com/chat/widget/5cffd49b55d69387be9a6fa51e3c5fa59efa09ca025ffc7367db9b7d083f17ec?referer=https%3A%2F%2Fumdds-site.ddev.site%2Fnode%2F6"
      frameborder="0"
      id="cw-iframe-window"
    ></iframe>
  </div>
</div>
  `;

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initChatWidget);
} else {
  initChatWidget();
}

// expand/collapse the chatbox
function expand() {
  let chatwidget = document.getElementById("chatwidget");
  let chevron = document.getElementById("cw--chevron");
  let button = document.getElementById("cw-service-status");

  if (chatwidget.classList.contains("closed")) {
    chatwidget.classList.remove("closed");
    chevron.classList.remove("chevron-ver");
    button.setAttribute("aria-expanded", "true");
  } else {
    chatwidget.classList.add("closed");
    chevron.classList.add("chevron-ver");
    button.setAttribute("aria-expanded", "false");
  }
}

// connect to dept: library chat
const serviceURL =
  "https://chat-us.libanswers.com/widget_status?iid=450&rules=%5B%7B%22u%22%3A0%2C%22d%22%3A%5B1198%5D%2C%22c%22%3A%22%22%2C%22fallbackSeconds%22%3A0%7D%5D";

const checkInterval = 30000; // 30 seconds

// reload the iframe to show correct chatbox page
function reloadIframe() {
  addRefererToIframe();
}

// add referer to the chat widget iframe
function addRefererToIframe() {
  const iframe = document.getElementById("cw-iframe-window");
  if (!iframe) {
    return;
  }
  const referer = window.location.href;

  try {
    const url = new URL(iframe.src, window.location.href);
    if (url.searchParams.get("referer") !== referer) {
      url.searchParams.set("referer", referer);
      iframe.src = url.toString();
    }
  } catch (e) {
    if (!/[?&]referer=/.test(iframe.src)) {
      iframe.src =
        iframe.src +
        (iframe.src.indexOf("?") === -1 ? "?" : "&") +
        "referer=" +
        encodeURIComponent(referer);
    }
  }
}

// update the chat widget UI
function updateChatWidgetStatus(status) {
  let widget = document.getElementById("chatwidget");
  let widgetStatus = document.getElementById("cw--status");

  if (!widget || !widgetStatus) {
    return;
  }

  if (status === true) {
    widgetStatus.innerText = "live";
    widget.classList.remove("offline");
  } else {
    widgetStatus.innerText = "offline";
    widget.classList.add("offline");
    reloadIframe();
  }
}

// check the service status
function checkServiceStatus() {
  return fetch(serviceURL) // RETURN the promise
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      const isLive = data.away === false;
      updateChatWidgetStatus(isLive);
    })
    .catch((error) => {
      updateChatWidgetStatus(false);
    });
}

// Initialize on DOM ready
function initChatWidget() {
  const targetElement = document.getElementById("umd-lib-footer");

  if (!targetElement) {
    console.error("Target element for chat widget not found");
    return;
  } else {
    console.log("Target element for chat widget found");
  }

  // Insert the chat widget HTML
  targetElement.insertAdjacentHTML("beforeend", chatWidgetHTML);

  // Attach event listener to the toggle button
  const toggleButton = document.getElementById("cw-service-status");
  if (toggleButton) {
    toggleButton.addEventListener("click", expand);
  }

  // Initial check
  checkServiceStatus().then(() => {
    reloadIframe();
  });

  // Set up recurring check (ONLY ONE interval)
  const intervalId = setInterval(() => {
    checkServiceStatus();
  }, checkInterval);
}
