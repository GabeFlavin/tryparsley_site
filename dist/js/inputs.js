document.getElementById("file_upload").onchange=function(){document.getElementById("selected_files").value=this.value},console.log("loaded inputs");var inputs=document.querySelectorAll(".upload_input.hidden");Array.prototype.forEach.call(inputs,function(e){var t=document.getElementById("selected_files"),a=t.innerHTML;e.addEventListener("change",function(e){var i="";i=this.files&&this.files.length>1?(this.getAttribute("data-multiple-caption")||"").replace("{count}",this.files.length):e.target.value.split("\\").pop(),t.value=i||a})}),$(document).ready(function(){$("input").on("focus",function(){$(this).removeClass("error")})});var allowed_file_size="16777216",allowed_files=["image/png","application/pdf","image/vnd.dxf","model/vnd.dwf","image/jpeg","image/jpg","image/pjpeg"];$("#getaquote").submit(function(e){if(e.preventDefault(),proceed=!0,console.log("submit clicked"),$($(this).find("input[data-required=true], textarea[data-required=true]")).each(function(){$.trim($(this).val())||($(this).addClass("error"),proceed=!1);var e=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;"email"!=$(this).attr("type")||e.test($.trim($(this).val()))||($(this).addClass("error"),proceed=!1)}).on("input",function(){$(this).removeClass("error")}),window.File&&window.FileReader&&window.FileList&&window.Blob){var t=0;$(this.elements["file_attach[]"].files).each(function(e,a){""!==a.value&&(allowed_files.indexOf(a.type),t+=a.size)}),t>allowed_file_size&&(alert("Sorry, attachments have to be less than 16 MB."),proceed=!1)}if(proceed){console.log("/proceeding");var a=$(this).attr("action"),i=$(this).attr("method"),o=new FormData(this);$.ajax({url:a,type:i,data:o,dataType:"json",contentType:!1,cache:!1,processData:!1}).done(function(e){"error"==e.type&&(console.log("error "+e.text),$("#contact_results").html('<div class="error">'+e.text+"</div>")),"done"==e.type&&(console.log("done new"),$("#contact_results .success").html(e.text),TweenMax.set("#contact_results",{display:"flex"}),TweenMax.to("#contact_results",.8,{opacity:1,ease:Power4.easeInOut}))})}});