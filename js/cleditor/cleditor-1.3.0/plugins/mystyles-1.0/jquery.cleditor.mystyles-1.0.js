(function($) {
      
 
  // Define the mystyles button
  $.cleditor.buttons.mystyles = {
    name: "mystyles",
    css : {
      background : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAO0lEQVR42mJgRAMM2AQYgABMgGkwH0khA1QeogJZALsKOAtFBSO6GSARVBVgg5DdARHAUEGiADIACDAAW3UAtTz0mv4AAAAASUVORK5CYII=) center center no-repeat '
    },
    title: "Select style",
    styles : [
      ['Main', 'div#main'],
      ['Pre line', 'h2#title.red']
    ],
    popupName: "mystyles",
    popupContent: "",
    buttonClick: showStyles
    
  };
      
 
  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("bold", "mystyles bold");
    
  function showStyles(e, data){
    this.popupContent ='';
    $.each(this.styles, function(idx, style) {
      this.popupContent+=style[0];
    });
  }
      
 
  // Handle the mystyles button click event
  function mystylesClick(e, data) {
      
      
    // Wire up the submit button click event
    $(data.popup).children(":button")
    .unbind("click")
    .bind("click", function(e) {
      
 
      // Get the editor
      var editor = data.editor;
      
 
      // Get the entered name
      var name = $(data.popup).find(":text").val();
      
 
      // Insert some html into the document
      var html = "mystyles " + name;
      editor.execCommand(data.command, html, null, data.button);
      
 
      // Hide the popup and set focus back to the editor
      editor.hidePopups();
      editor.focus();
      
 
    });
      
 
  }
      
 
})(jQuery);
