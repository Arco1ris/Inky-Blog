
var sessionJson = {}


function ArticlePagination(pushIds, sort, pageNumber, nPerPage, Model, callback) {
    var query = {};
    if(pushIds){
        query = {'_id': { $in:  pushIds }};
    }
    var options = {
        sort:    sort,
        lean:     true,
        page: pageNumber,
        limit: nPerPage
    };
    Model.paginate(query, options,function (err,docs) {
        callback(err,docs);
    })
}

function returnJson(err,docs) {
    var result = {
        code: 1,
        msg: err
    }
    if(!err) {
        result = {
            code: 0,
            data: docs
        }
    }
    return result;
}


// 判断是否是 admin 用户
function isAdmin(req) {
    var sessionId = req.sessionID;
    // if(sessionId){
    //     console.log('cookie suc');
    //     if(sessionJson[sessionId]) {
    //         console.log('sessionid suc');
    //         return true;
    //     } else {
    //         console.log('sessionid fail');
    //         return false;
    //     }
    // } else {
    //     console.log('cookie error');
    //     return false;
    // }
    
    return true;
}


function pageValid(req,res,pageUrl) {
    var sessionId = req.sessionID;
    var timestamp = Date.parse(new Date());
    // if( timestamp > sessionJson.timestamp + 100000){
    //     console.log('TOO LONG');
    //     sessionJson = {};
    // }
    if(sessionJson[sessionId]){
        res.sendfile(pageUrl);
    } else {
        // 重定向 到 登录页面
        res.redirect('/login');
    }

}

exports.returnJson = returnJson;
exports.ArticlePagination = ArticlePagination;
exports.isAdmin = isAdmin;
exports.pageValid = pageValid;
exports.sessionJson = sessionJson;

