/**
 * Replacer plugin for Cleditor
 * 
 * @version 1.0
 * @author Ivan Scherbak <funivan@t5.org.ua>
 */
(function($) {
      
  // Define the replacer button
  $.cleditor.buttons.replacer = {
    name: "replacer",
    css : {
      background : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAYAAABWzo5XAAABfUlEQVQ4y62UT2rCUBDGfynZBAWpIEVKqRSJblyJC72Dh+iii1ygi9qFq16it4gnUHBVXIkmm0IgiCB1pUaKZF4XJRI1VgsODO/PzHx8M2/eaEopLiF6/NDpdE6iNptNLdGglEIphW3bSkQSNQxD5Xme6na7yrZtFcXE9WofeLFYHOhyucT3fRqNBkEQJDLXk1gOBgPW6zWGYZBOpymVSsxmM1qtFtPpFN/3AVQ8zUSgarV6kH6tVsN1XUajIePxmLMY9Xo9crkcq9WKIAioVCpkMhksy8KyLBzHYT6f/w0kItvAeGtEexEhqWX0pBccDocUCgU8z8MwDABSqRQAxWLxNFAEVq/XAcjn89ug+Coip4FEBMdxADBNk/bb+469/fJ0PqNyubzjfH/3wOpb+Jp52/T35eoYI9d1CcMQgMKNxu21nF/siJFpmjvO3Y/PXxvqKCP92N+L5PX58f/F7vf7bDabg97ZZzCZTMhmszt3WtzpnDFybJxolxpsP+qTJc+iAVcOAAAAAElFTkSuQmCC) center center no-repeat '
    },
    title: "replacer Html",
    command: "inserthtml",
    buttonClick: replacerClick,
    regex : [
    [/\s*style\s*=\s*("|')([^"']+)("|')/ig, ''],
    [/<(font|span)[^>]*>\n*(.*?)\n*<\/(font|span)>/mig,  '$2'],
    [/<([^>])>\s*<\s*\/[^>]>/mgi,  ''], 
    [/&nbsp;/gi,  " "] 
    ],
    beforeReplace : function(){},
    afterReplace : function(){}
  };
      
  // default add button
  $.cleditor.defaultOptions.controls = $.cleditor.defaultOptions.controls.replace("bold", "replacer bold");
 
  // Handle the replacer button click event
  function replacerClick(e, data) {
 
    // Get the editor
    var editor = data.editor;
    
    // Get code
    var code = editor.$area.val();
    
    this.beforeReplace();
    
    // Edit code
    $.each(this.regex, function(index, item) {
      console.log(item[0]);
      code = code.replace(item[0], item[1]);
    });
    
    this.afterReplace();
    // Set code
    editor.$area.val(code);
    editor.updateFrame();
    editor.focus();
    return false;
  }
 
})(jQuery);