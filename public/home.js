function getParse() {

    $.get("/parse", responseJSON => {
        if (responseJSON['status'] == 'success') {
            $("#result-body").append(responseJSON['data']);
        } else {
            alert(responseJSON['data']);
        }
    });
}

// Waits for DOM to load before running
$(document).ready(() => {

    const $button = $("#interpret-button");

    $button.click(event => {
        getParse();
    });
});
