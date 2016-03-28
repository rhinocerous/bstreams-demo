if (!sabio.services.breadcrumbs) {
    sabio.services.breadcrumbs = {};
}

sabio.services.breadcrumbs.onSetBreadcrumbs = function (hyperlinks) {

    var totalHyperlinks = hyperlinks.length;
    var lastHyperlink = hyperlinks.length - 1;

    for (var i = 0; i < totalHyperlinks; i++) {
        if (i === lastHyperlink) {
            var linkClone = $('#breadcrumb-link-active').clone();

            $(linkClone).find('a').text(hyperlinks[i].text);
            $(linkClone).find('a').attr("href", hyperlinks[i].link);

            $(linkClone).removeAttr('id');
            $(linkClone).removeClass('hidden');

            $(linkClone).appendTo('#breadcrumb-body');
        }
        else {
            var linkClone = $('#breadcrumb-link-notActive').clone();

            $(linkClone).find('a').text(hyperlinks[i].text);
            $(linkClone).find('a').attr("href", hyperlinks[i].link);

            $(linkClone).removeAttr('id');
            $(linkClone).removeClass('hidden');

            $(linkClone).appendTo('#breadcrumb-body');
        }
    }
}
