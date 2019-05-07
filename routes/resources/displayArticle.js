/* eslint-disable require-jsdoc */

/**
 *
 *
 * @param {*} res
 * @param {*} Err
 * @param {*} author
 * @param {*} title
 * @param {*} links
 */
function DisplayArticle(res, err, feed) {
    const css = '<link rel="stylesheet" id="ripple_css-css" href="/css/main.css"  type="text/css" media="all" />';
    const scripts = '<script type="text/javascript" src="/js/script.min.js"></script> ' + '<script type="text/javascript" src="/js/script.min.js"></script>';
    const Author = feed.author;
    const articleTitle = feed.title;
    const date = feed.pubDate;
    const content = feed.content;

    try {
        res.write('<html>\n<head>\n<title>Sports dApp insights </title>\n' + css + '</head>\n<body>');
        res.write('<div class="row">');
        res.write('<div class="articles-container">');
        res.write('<article>');
        res.write('<header>');
        res.write('<div class="time-published-wrapper">');
        res.write('<time>' + date + '</time >' + '<small>' + Author + '</small>');
        res.write('</div>');
        res.write('<h2>' + articleTitle + '</h2>');
        res.write('<p>' + content + '<br>' + '</p>');
        res.write('</header>');
        res.write('</article>');
        res.write('</div>');
        res.write('</div>');
        res.write(scripts + '</body></html>');
        res.end();
    } catch (err) {
        new err('bad respoonse');
    }
}