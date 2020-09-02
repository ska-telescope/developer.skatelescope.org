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
    var currPage = window.location.href;

    var title = document.getElementById("issue[title]");
    var desc = document.getElementById("issue[description]");

    var feedback = document.getElementById("feedback-comment").value;
    var temp =
        "\n\nThis is a auto created issue from RTD Feedback form\n\n/label ~feedback\n/assign @limonkufu";

    if (pressedButton == "yes") {
        title.value = "[RTD Feedback :pencil2:] - :+1: :" + currPage;
        temp = temp + "\n/award :+1:";
        desc.value = temp;
    } else if (pressedButton == "no") {
        title.value = "[RTD Feedback :pencil2:] - :thumbsdown: : " + currPage;
        temp = temp + "\n/award :disappointed:";
        desc.value = feedback + temp;
    }

    return true;
}