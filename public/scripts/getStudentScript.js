/**
 * When the form with id 'recordId_form' is submitted, ajax is used to send a
 * request using the get method. The url of the request includes the 
 * record id from the user input. A success or error message is displayed
 * depending on the result of the request.
 */
$("#recordId_form").submit((event) => {
    var recordId = $("#recordId").val();  // get record id input
    $.ajax({
      url: "http://localhost:5678/students/"+recordId,
      type: "get",
      success: function(response) {
        $("#result").text(JSON.stringify(response));
      },
      error: function(xhr) {
        $("#result").text('error: ' + xhr.responseText);  // error message 
      }
    });
    event.preventDefault();  // Prevent form from resetting
    $("#recordId").val('');  // Clear record id input
});
