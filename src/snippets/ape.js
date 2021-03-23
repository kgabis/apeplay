define("ace/snippets/ape",["require","exports","module"], function(require, exports, module) {
"use strict";

exports.snippetText = "# Function\n\
snippet fun\n\
	fn ${1?:function_name}(${2:argument}) {\n\
		${3:// body...}\n\
	}\n\
# Anonymous Function\n\
regex /((=)\\s*|(:)\\s*|(\\()|\\b)/f/(\\))?/\n\
snippet f\n\
	function${M1?: ${1:functionName}}($2) {\n\
		${0:$TM_SELECTED_TEXT}\n\
	}${M2?;}${M3?,}${M4?)}\n\
# Immediate function\n\
trigger \\(?f\\(\n\
endTrigger \\)?\n\
snippet f(\n\
	(fn(${1}) {\n\
		${0:${TM_SELECTED_TEXT:/* code */}}\n\
	}(${1}));\n\
# if\n\
snippet if\n\
	if (${1:true}) {\n\
		${0}\n\
	}\n\
# if ... else\n\
snippet ife\n\
	if (${1:true}) {\n\
		${2}\n\
	} else {\n\
		${0}\n\
	}\n\
\n\
# while (...) {...}\n\
snippet wh\n\
	while (${1:/* condition */}) {\n\
		${0:/* code */}\n\
	}\n\
# return\n\
snippet ret\n\
	return ${1:result}\n\
# for (property in object ) { ... }\n\
snippet fori\n\
	for (${1:prop} in ${2:Things}) {\n\
		${0:$2[$1]}\n\
	}\n\
# \n\
snippet for-\n\
	for (var ${1:i} = len(${2:Things}); ${1:i} -= 1; ) {\n\
		${0:${2:Things}[${1:i}];}\n\
	}\n\
# for (...) {...}\n\
snippet for\n\
	for (var ${1:i} = 0; $1 < len(${2:Things}); $1 += 1) {\n\
		${3:$2[$1]}$0\n\
	}\n\
";
exports.scope = "ape";

});                (function() {
                    window.require(["ace/snippets/ape"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            