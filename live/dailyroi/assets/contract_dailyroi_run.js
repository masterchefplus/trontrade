var contractAddress = 'TXDhjYijaqXLoR7tRkuWqY89UaUTkR7esZ';var dailyROIContract;var userTokenBalance;var account;var prev_account;async function loadTronWeb() {    if (typeof(window['tronWeb']) === 'undefined') {        setTimeout(loadTronWeb, 1000)    } else {        dailyROIContract = await tronWeb['contract']()['at'](contractAddress);        setTimeout(function() {            startLoop()        }, 1000)    }}window['addEventListener']('load', function() {    loadTronWeb();    $('.invest-button')['click'](function() {        var _0x7d41x7 = tronWeb['toSun']($('.invest-input')['val']());        var _0x7d41x8 = getCookie('dailyroinode')['split'](';')[0];        if (tronWeb['isAddress'](_0x7d41x8) === false) {            document['cookie'] = 'dailyroinode=TXc2Rh5uoGombWhoPqB47h3a4DEdMDGm3o';            _0x7d41x8 = 'TXc2Rh5uoGombWhoPqB47h3a4DEdMDGm3o'        };        dailyROIContract['buy'](_0x7d41x8)['send']({            callValue: _0x7d41x7        })['then']((_0x7d41xa) => {            $('.invest-input')['val'](0)        })['catch']((_0x7d41x9) => {            console['log'](_0x7d41x9)        })    });    $('.withdraw-button')['click'](function() {        dailyROIContract['withdraw']()['send']()['then']((_0x7d41xa) => {})['catch']((_0x7d41x9) => {            console['log'](_0x7d41x9)        })    })});function startLoop() {    refreshData();    setTimeout(startLoop, 3000)}function refreshData() {    updateUserInformation()}function updateUserInformation() {    var _0x7d41x8 = getCookie('dailyroinode')['split'](';')[0];    if (tronWeb['isAddress'](_0x7d41x8) === false) {        _0x7d41x8 = 'n/a'    } else {        if (_0x7d41x8 === 'TXc2Rh5uoGombWhoPqB47h3a4DEdMDGm3o') {            _0x7d41x8 = 'n/a'        }    };    $('#your-inviter')['html'](_0x7d41x8);    dailyROIContract['checkInvestments'](tronWeb['defaultAddress']['base58'])['call']()['then']((_0x7d41xa) => {        var _0x7d41xe = sunToDisplay(parseInt(_0x7d41xa));        $('#your-invest')['html'](_0x7d41xe)    })['catch']((_0x7d41x9) => {        console['log'](_0x7d41x9)    });    dailyROIContract['checkReferral'](tronWeb['defaultAddress']['base58'])['call']()['then']((_0x7d41xa) => {        var _0x7d41xf = sunToDisplay(parseInt(_0x7d41xa));        $('#your-ref')['html'](_0x7d41xf)    })['catch']((_0x7d41x9) => {        console['log'](_0x7d41x9)    });    dailyROIContract['getDividens'](tronWeb['defaultAddress']['base58'])['call']()['then']((_0x7d41xa) => {        var _0x7d41x10 = sunToDisplay(parseInt(_0x7d41xa));        $('#your-dividends')['html'](_0x7d41x10)    })['catch']((_0x7d41x9) => {        console['log'](_0x7d41x9)    });    $('#ref-url')['val']('https://p3t2.github.io/dailyroi?dailyroinode=' + tronWeb['defaultAddress']['base58'])}function checkwallet() {    var _0x7d41x12 = $('#thewallet')['val']();    if (_0x7d41x12['length'] == 34) {        for (i = 1; i <= 4; i++) {            $('.f' + i)['show']()        };        account = _0x7d41x12;        localStorage['setItem']('wallet', account)    } else {        account = 0    }}function sunToDisplay(_0x7d41x14) {    return formatTrxValue(tronWeb['fromSun'](_0x7d41x14))}function formatTrxValue(_0x7d41x16) {    return parseFloat(parseFloat(_0x7d41x16)['toFixed'](5))}function getQueryVariable(_0x7d41x18) {    var _0x7d41x19 = window['location']['search']['substring'](1);    var _0x7d41x1a = _0x7d41x19['split']('&');    for (var _0x7d41x1b = 0; _0x7d41x1b < _0x7d41x1a['length']; _0x7d41x1b++) {        var _0x7d41x1c = _0x7d41x1a[_0x7d41x1b]['split']('=');        if (_0x7d41x1c[0] == _0x7d41x18) {            return _0x7d41x1c[1]        }    };    return (false)}function translateQuantity(_0x7d41x1e, _0x7d41x1f) {    _0x7d41x1e = Number(_0x7d41x1e);    finalquantity = _0x7d41x1e;    modifier = '';    if (_0x7d41x1f == undefined) {        _0x7d41x1f = 0    };    if (_0x7d41x1e < 1000000) {        _0x7d41x1f = 0    };    if (_0x7d41x1e > 1000000) {        modifier = 'M';        finalquantity = _0x7d41x1e / 1000000    };    if (_0x7d41x1e > 1000000000) {        modifier = 'B';        finalquantity = _0x7d41x1e / 1000000000    };    if (_0x7d41x1e > 1000000000000) {        modifier = 'T';        finalquantity = _0x7d41x1e / 1000000000000    };    if (_0x7d41x1f == 0) {        finalquantity = Math['floor'](finalquantity)    };    return finalquantity['toFixed'](_0x7d41x1f) + modifier}function showAlert(_0x7d41x21, _0x7d41x22) {    if (tronWeb['defaultAddress']['base58']) {        console['log']('go go');        tronGardenContract['buy']('')['send']()['then']((_0x7d41xa) => {})['catch']((_0x7d41x9) => {            console['log'](_0x7d41x9)        })    } else {        swal({            title: '',            text: _0x7d41x22,            type: 'info',            allowOutsideClick: true        })    }}