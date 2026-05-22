const form = document.getElementById("surveyForm");
const feedbackList = document.getElementById("feedbackList");
const formMessage = document.getElementById("formMessage");

function renderFeedback(items) {
  if (!items.length) {
    feedbackList.innerHTML = "<p>No feedback submitted yet.</p>";
    return;
  }

  const html = items
    .map((item) => {
      return `
                <div class="feedback-entry">
                    <h3>${item.product} — ${item.rating}/5</h3>
                    <p class="label">From: ${item.name} (${item.email})</p>
                    <p><strong>Review:</strong> ${item.review}</p>
                    <p><strong>Suggestion:</strong> ${item.suggestion}</p>
                    <p class="label">Submitted: ${new Date(item.created_at).toLocaleString()}</p>
                </div>
            `;
    })
    .join("");

  feedbackList.innerHTML = html;
}

async function loadFeedback() {
  try {
    const response = await fetch("get_feedback.php");
    const data = await response.json();
    renderFeedback(data);
  } catch (error) {
    feedbackList.innerHTML = "<p>Unable to load feedback.</p>";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formMessage.textContent = "Submitting...";
  formMessage.style.color = "#2f6b45";

  const formData = new FormData(form);

  try {
    const response = await fetch("submit.php", {
      method: "POST",
      body: formData,
    });
    const result = await response.json();

    if (result.success) {
      formMessage.textContent = "Thank you! Your feedback was sent.";
      form.reset();
      if (feedbackList) {
        loadFeedback();
      }
    } else {
      formMessage.textContent = result.error || "Submission failed.";
      formMessage.style.color = "#b22d2d";
    }
  } catch (error) {
    formMessage.textContent = "Error sending feedback.";
    formMessage.style.color = "#b22d2d";
  }
});

if (feedbackList) {
  loadFeedback();
}
