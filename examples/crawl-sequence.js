/**
 * @fileoverview Example reactive SiteCrawl
 * @author roger.castillo@loku.com (Roger Castillo)
 */

var CrawlSequence = require('../lib/crawlsequence').CrawlSequence,
    createCrawlSequence = require('../lib/crawlsequence').createCrawlSequence,
    URL = require('url'),
    Rx = require('rx').Rx;



// Removed example due to deprecation
//// create a new SiteCrawl of depth 2 with a delay of 1s between next page
//// Note: Webcrawling is delayed and will not be executed
//// until Subscription
//var crawSeq = new CrawlSequence([URL.parse('http://google.com'),
//                                 URL.parse('http://loku.com'),
//                                 URL.parse('http://bing.com')], 1000);
//
//// ask for the observable sequence and subscribe for the CrawlResult(s)
//crawSeq.Subscribe(function(crawlResult) {
//  console.log(crawlResult.crawlLink.url.href);
//},
//// on err
//function(exn){
//  console.log('Ooo dem Dukes...with exception:' + exn);
//},
//// on crawl complete
//function(){
//  console.log('CrawlSeqs complete');
//});
//
//
//var crawSeqStrings = new CrawlSequence(['http://google.com',
//                                 'http://loku.com',
//                                 'http://bing.com'], 1000);
//
//// ask for the observable sequence and subscribe for the CrawlResult(s)
//crawSeqStrings.Subscribe(function(crawlResult) {
//  console.log(crawlResult.crawlLink.url.href);
//},
//// on err
//function(exn){
//  console.log('Ooo dem Dukes...with exception:' + exn);
//},
//// on crawl complete
//function(){
//  console.log('CrawlSeq Strings complete');
//});


var hrefArray = ['http://google.com',
                 'http://loku.com',
                 'http://bing.com',
                 'http://loku.com',
                 'http://bing.com',
                 'http://loku.com',
                 'http://bing.com',
                 'http://loku.com',
                 'http://bing.com',
                 'http://loku.com'];


// convert the array of hrefs to URL objecs
var urlStream = Rx.Observable.FromArray(hrefArray).Select(function(r){
  return URL.parse(r);
});

// politness of 1s with crawl lasting no longer than 60s
var cs = createCrawlSequence(urlStream, 1000, 60000);

cs.Subscribe(function(r){
  console.log('createCrawlSequence result', r.crawlLink.url.href);
},
function(err){},
function(){
  console.log('crawl completed');
});

