/**
 * Mystyles plugin for Cleditor
 * 
 * @version 1.0
 * @author Ivan Scherbak <funivan@t5.org.ua>
 */
(function($) {
 
  // Define the mystyles button
  var opts = $.cleditor.buttons.mystyles = {
    name: "mystyles",
    css : {
      background : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRFAAAA////pdmf3QAAAAJ0Uk5T/wDltzBKAAAAO0lEQVR42mJgRAMM2AQYgABMgGkwH0khA1QeogJZALsKOAtFBSO6GSARVBVgg5DdARHAUEGiADIACDAAW3UAtTz0mv4AAAAASUVORK5CYII=) center center no-repeat '
    },
    title: "Select style",
    styles : [
    ['Word', 'span.word'],
    ['Code', 'span.red'],
    ['Test', 'b.#test.test'],
    ],
    popupName: "mystyles",
    popupContent: "",
    command: "inserthtml",
    buttonClick: mystylesClick
    
  };
  
  // add styles popup buttons
  $.each(opts.styles, function(idx, style) {
    opts.popupContent+='<div data-style="'+style[1]+'">'+style[0]+'</div>';
  });
  
 
  // Add the button to the default controls before the bold button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls
  .replace("bold", "mystyles bold");
 
  // Handle the mystyles button click event
  function mystylesClick(e, data) {
    // Wire up style click event
    $(data.popup).children("div")
    .unbind("click")
    .bind("click", function(e) {
      // Get the editor
      var editor = data.editor;
      var selectedText = editor.selectedHTML();
      // Get selected style
      var setStyle = $(this).attr('data-style');
      
      var className = '';
      var id = '';
      var tag = '';
   
      var tagsMatch = setStyle.match(/([a-z0-9]+)[\.|#]/i);
      if(tagsMatch!=null){
        tag = tagsMatch[1];
        setStyle = setStyle.substr(tagsMatch[1].length);
     
        var idmatch = setStyle.match(/#([a-z0-9-_]+)($|\.)/i);
        if(idmatch!==null){
          id = idmatch[1];
          idmatch[0] = idmatch[0].replace('.', '');
          setStyle = setStyle.replace(idmatch[0], '');
        }
        
        var elements = setStyle.split('.');
        for(i in elements){
          className +=elements[i]+' ';  
        }
      }else{
        tag = setStyle;
      }
      
      var newNode = document.createElement(tag);
      className = className.substr(1, (className.length-2));
      if(className!=''){
        newNode.className=className;
      }
      if(id!=''){
        newNode.setAttribute('id',id);
      }
      
      // surround selected note with out custom style
      var range = editor.$frame[0].contentWindow.getSelection().getRangeAt(0);
      range.surroundContents(newNode);
      
      // Hide the popup and set focus back to the editor
      editor.hidePopups();
      editor.focus();
    });
      
 
  }
      
 
})(jQuery);
