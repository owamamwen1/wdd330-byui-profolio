var main = document.getElementById("javascriptform");
 
var elementForm = document.createElement('form'); 
 elementForm.setAttribute("action", ""); 
 elementForm.setAttribute("method", "post");
 main.appendChild(elementForm);
 
var heading = document.createElement('h2');
 heading.innerHTML = "Contact Us ";
 elementForm.appendChild(heading);
 
var newLine = document.createElement('hr');
 elementForm.appendChild(newLine);
 
var breakLine = document.createElement('br');
 elementForm.appendChild(breakLine);
 
var labelName = document.createElement('label');
labelName.innerHTML = "Your Name : ";
 elementForm.appendChild(labelName);
 
var elementInput = document.createElement('input');
elementInput.setAttribute("type", "text");
elementInput.setAttribute("name", "dname");
 elementForm.appendChild(elementInput);
 
var breakLine = document.createElement('br');
 elementForm.appendChild(breakLine);
 
var labelEmail = document.createElement('label');
labelEmail.innerHTML = "Your Email : ";
 elementForm.appendChild(labelEmail);
 
var elementEmail = document.createElement('input');
elementEmail.setAttribute("type", "text");
elementEmail.setAttribute("name", "demail");
 elementForm.appendChild(elementEmail);
 
var breakEmail = document.createElement('br');
 elementForm.appendChild(breakEmail);
 
// Textarea
var mgLabel = document.createElement('label');
mgLabel.innerHTML = "Your Message : ";
 elementForm.appendChild(mgLabel);
 
var elementTexarea = document.createElement('textarea');
elementTexarea.setAttribute("name", "dmessage");
 elementForm.appendChild(elementTexarea);
 
var mgBreak = document.createElement('br');
 elementForm.appendChild(mgBreak);
 
// Button
var submiteBtn = document.createElement('input');
submiteBtn.setAttribute("type", "submit");
submiteBtn.setAttribute("name", "dsubmit");
submiteBtn.setAttribute("value", "Submit");
 elementForm.appendChild(submiteBtn);