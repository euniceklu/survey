const feedbackList = document.getElementById("feedbackList");

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

loadFeedback();
