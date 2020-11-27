function show(elementId) {
    elem = document.getElementById(elementId);
    style = window.getComputedStyle(elem);
    if (style.display == "none") {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }

    if (elementId == "feedback-yes") {
        pressedButton = "yes";
    } else if (elementId == "feedback-no") {
        pressedButton = "no";
    }
}

function disableButtons() {
    document.querySelectorAll("button.btn-feedback").forEach((elem) => {
        elem.disabled = true;
    });
}

function fillFeedback() {

    // Json Fields
    var data = {
        "summary": "summary",
        "description": "description"
    }

    // Current page of the feedback
    var currPage = window.location.href;

    // Feedback from text field
    var feedback = document.getElementById("feedback-comment").value;

    if (pressedButton == "yes") {
        data.summary = "Positive Feedback"
        data.description = feedback + "\n\n" + currPage
    } else if (pressedButton == "no") {
        data.summary = "Negative Feedback"
        data.description = feedback + "\n\n" + currPage
    }

    fetch('http://ff197d804cd8.ngrok.io/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    return true;
}