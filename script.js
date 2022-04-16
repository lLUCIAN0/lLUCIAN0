var zModConfig = [{
    icon: "https://i.servimg.com/u/f58/11/80/17/98/chat-110.png",
    source : "https://rawgit.com/SSYT/-Zeus-Moderation-tools-for-Forumotion/master/script.js",
    loadCss: true,
    fontAwesome: true
}];
var zModTabels = [{
        type: "btn-texto1",
        body_start: '[center]<div class="btn-texto1">• Soporte Técnico •</div>[/center]',
		body_end: '',
    },
    {
        type: "btn-texto2",
        body_start: '[center]<div class="btn-texto2">• Moderador •</div>[/center]',		
		body_end: '',
    },
    {
        type: "btn-texto3",
        body_start: '[center]<div class="btn-texto3">• Admin •</div>[/center]',
		body_end: '',
    },
    {
        type: "btn-texto4",
        body_start: '[center]<div class="btn-texto4">• Programador •</div>[/center]',
		body_end: '',
    },
    {
        type: "btn-texto5",
        body_start: '[center]<div class="btn-texto5">• Creativo •</div>[/center]',
		body_end: '',
    },
	    {
        type: "btn-alertarojo",
        body_start: '<div class="btn-alertarojo">• ROJO •</div>',
		body_end: '',
    },
	    {
        type: "btn-alertanegro",
        body_start: '<div class="btn-alertanegro">• NEGRO •</div>',
		body_end: '',
    },
	    {
        type: "btn-alertaverde",
        body_start: '<div class="btn-alertaverde">• VERDE •</div>',
		body_end: '',
    }
];
var zModMessages = [{
        name: "Admin",
        message: '',
        group_id: 0,
        type: "btn-texto3"
    },
    {
        name: "Moderador",
        message: '',
        group_id: 0,
        type: "btn-texto2"
    },
    {
        name: "Soporte Técnico",
        message: '',
        group_id: 0,
        type: "btn-texto1"
    },
    {
        name: "Creativo",
        message: '',
        group_id: 0,
        type: "btn-texto5"
    },
    {
        name: "Programador",
        message: '',
        group_id: 0,
        type: "btn-texto4"
    },
	    {
        name: "Alerta Roja",
        message: '',
        group_id: 1,
        type: "btn-alertarojo"
    },
	    {
        name: "Alerta Negra",
        message: '',
        group_id: 1,
        type: "btn-alertanegro"
    },
	    {
        name: "Alerta Verde",
        message: '',
        group_id: 1,
        type: "btn-alertaverde"
    }
];
var zModGroups = [{
        id: 0,
        name: 'Botones en Largos'
    },
    {
        id: 1,
        name: 'Alertas'
    }
];
$.getScript(zModConfig[0].source, function(textStatus) {
    console.log( "zModStatus:" + textStatus);
});


$(function() {

    if (zModConfig[0].fontAwesome === true) $('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css" />').appendTo("head");

    if (zModConfig[0].loadCss === true) $('<link rel="stylesheet" type="text/css" href="'+ zModConfig[0].css_source +'" />').appendTo("head");

    $('<style type="text/css">.sceditor-button-staff div {background: url(' + zModConfig[0].icon + ') !important;}</style>').appendTo("head");

    var list = "";

    $('.zmod_box td').each(function() {
        this.innerHTML = this.innerHTML.replace(/\[icon\="?(.*?)"?\](.*?)\[\/icon\]/g, "<div><i class=\"$1\ icon-message\">$2</i></div>")
            .replace(/\[div\](.*?)\[\/div\]/g, "<div>$1</div>");
    });

    $(window).load(function() {
        function zModGetTable(type, body) {
            var str = "";
            for (var y = 0; y < zModTabels.length; y++) str += (zModTabels[y].type === type) ? (body === "start") ? zModTabels[y].body_start : zModTabels[y].body_end : "";
            return str;
        }

        function zModGetModMessageByGroupId(f, g) {
            var str = "",
                c = 0;
            for (var z = 0; z < zModMessages.length; z++) {
                if (zModMessages[z].group_id == f) {
                    str += "<li class='mod_editor_message group_" + zModMessages[z].group_id + "' id='group_" + z + "_" + zModMessages[z].group_id + "'><a style='cursor: pointer'>" + zModMessages[z].name + "</a></li>\n";
                    if (g === 0) zModInsertToSCEditor('#group_' + z + '_' + zModMessages[z].group_id + ' a', zModMessages[z].message, zModMessages[z].type);
                    c++;
                }
            }
            if (g === 1) str = c;

            return str;
        }

        function zModInsertToSCEditor(e, t, i) {
            $(e).live("click", function(e) {
                $("#text_editor_textarea").sceditor("instance").insertText(zModGetTable(i, "start") + t, zModGetTable(i, "end"));
            });
        }

        function zModToggleSCEditor(o, i) {
            $(o).live("click", function(o) {
                $(i).toggle();
            });
        }

        for (var x = 0; x < zModGroups.length; x++) {
            if (zModGetModMessageByGroupId(zModGroups[x].id, 1) > 0) {
                list += "<li class='mod_editor_section' id='list_" + zModGroups[x].id + "'><a style='cursor: pointer'>" + zModGroups[x].name + " (" + zModGetModMessageByGroupId(zModGroups[x].id, 1) + ")</a></li>" + zModGetModMessageByGroupId(zModGroups[x].id, 0);
                zModToggleSCEditor("#list_" + zModGroups[x].id + " a", ".group_" + zModGroups[x].id + "");
            }
        }

        zModToggleSCEditor('.sceditor-button.sceditor-button-staff', '.mod_box');

        $("textarea, .sceditor-button").click(function() {
            $(".mod_box").hide();
        });

        $(".sceditor-button-source").click(function() {
            $(".sceditor-button-staff").removeClass("disabled");
        });

        if(_userdata.user_level > 1) $(".sceditor-group:last-child").before('<div class="sceditor-group"><a class="sceditor-button sceditor-button-staff" title="Mesaje de moderare"><div unselectable="on">Mesaje de moderare</div></a><div class="mod_box" style="display: none;"><ul class="mod_groups" id="mod_box_i">' + list + '<li class="copyright_e"> © Created by Luciano - All right reserved</li></div></div></div>');
        
    });

});
