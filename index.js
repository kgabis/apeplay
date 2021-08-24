Module.onRuntimeInitialized = async _ => {
    var ape = {
        init: Module.cwrap('init', 'bool', []),
        execute: Module.cwrap('execute', 'bool', ['string']),
        compile: Module.cwrap('compile', 'bool', ['string']),
        clear_stdout: Module.cwrap('clear_stdout', 'void', []),
        get_stdout: Module.cwrap('get_stdout', 'string', []),
        get_error_count: Module.cwrap('get_error_count', 'int', []),
        get_error_string_at: Module.cwrap('get_error_string_at', 'string', ['int']),
        get_error_line_at: Module.cwrap('get_error_line_at', 'int', ['int']),
        get_error_column_at: Module.cwrap('get_error_column_at', 'int', ['int'])

    };

    var editor = ace.edit("editor");
    editor.setTheme("ace/theme/textmate");
    editor.setShowPrintMargin(false);
    editor.setValue("println(\"hello world\")", 1);
    editor.session.setMode("ace/mode/ape");

    editor.commands.removeCommand('gotoline');

    editor.commands.addCommand({
        name: 'save',
        bindKey: { win: "Ctrl-S", "mac": "Cmd-S" },
        exec: function (editor) {
            saveToFile();
        }
    })

    editor.commands.addCommand({
        name: 'execute',
        bindKey: { win: "Ctrl-R", "mac": "Ctrl-R" },
        exec: function (editor) {
            executeCode();
        }
    })

    var Range = ace.require('ace/range').Range;
    var markers = [];

    var editor_dirty = false;
    editor.getSession().on('change', function() {
        editor_dirty = true;
    });

    function check_errors() {
        ape.init();
        var program = editor.getValue();
        ape.compile(program);

        markers.forEach(marker => editor.session.removeMarker(marker));
        markers = [];

        var errs = [];
        var err_count = ape.get_error_count();
        var str = "";

        for (let index = 0; index < err_count; index++) {
            var err = {
                row: ape.get_error_line_at(index) - 1,
                column: ape.get_error_column_at(index),
                text: ape.get_error_string_at(index),
                type: "error"
            }
            errs.push(err);

            var markerId = editor.session.addMarker(new Range(err.row, err.column - 1, err.row, err.column), "warning-marker", "text");
            markers.push(markerId);
        }

        editor.getSession().setAnnotations(errs);  
    }

    setInterval(function(){ 
        if (editor_dirty) {
            check_errors();
            editor_dirty = false;
        }
    }, 200);

    var output = ace.edit("output");
    output.setShowPrintMargin(false);
    output.setReadOnly(true);
    output.renderer.setShowGutter(false);

    function saveToFile() {
        var d = new Date();
        var d_str = d.getFullYear() + "_" + d.getMonth() + "_" + d.getDay() + "_" +
            d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
        var filename = "ape_playground_" + d_str + ".ape";
        var file = new Blob([editor.getValue()], { type: 'text/plain' });
        if (window.navigator.msSaveOrOpenBlob) // IE10+
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            var a = document.createElement("a"),
                url = URL.createObjectURL(file);
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            setTimeout(function () {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 0);
        }
    }

    function executeCode() {
        output.setValue("");

        ape.init();
        ape.clear_stdout();
        var program = editor.getValue();
        var ok = ape.execute(program);
        var str = ""
        if (ok) {
            str = ape.get_stdout();
        } else {
            var err_count = ape.get_error_count();
            var str = "";
            for (let index = 0; index < err_count; index++) {
                str += ape.get_error_string_at(index)
                if (index < (err_count - 1)) {
                    str += "/n";
                }
            }
        }
        output.setValue(str, -1);
    }

    // Add examples
    function addExample(col, txt) {
        const pre = document.createElement('pre');
        pre.className = 'list-group-item btn btn-light code-button';
        pre.innerHTML = txt
        document.getElementById('list-col' + col).appendChild(pre);
    }
    
    examples.col0.forEach(element => addExample(0, element));
    examples.col1.forEach(element => addExample(1, element));
    examples.col2.forEach(element => addExample(2, element));

    function htmlDecode(input) {
        var e = document.createElement('div');
        e.innerHTML = input;
        return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
    }

    $("#run-button").click(function () {
        executeCode();
    });

    $("#clear-button").click(function () {
        editor.setValue("", -1);
        output.setValue(str, -1);
    });

    $("#save-button").click(function () {
        saveToFile();
    });

    $('#editor-buttons-left').css({
        position: 'relative',
        top: '-10px'
    });

    $('#editor-buttons-right').css({
        position: 'relative',
        top: '-10px'
    });

    $(".code-button").click(function () {
        editor.setValue(htmlDecode($(this).html()), -1)
    });

};