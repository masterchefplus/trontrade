var contractAddress = 'TTdgG6H54UKQZRcHjBn1ANWcER593PC72X';var p3TronContract;var userTokenBalance;var account;var prev_account;async function loadTronWeb() {    if (typeof(window['tronWeb']) === 'undefined') {        setTimeout(loadTronWeb, 1000)    } else {        p3TronContract = await tronWeb['contract']()['at'](contractAddress);        setTimeout(function() {            startLoop()        }, 1000)    }}window['addEventListener']('load', function() {    loadTronWeb();    $('.buy-input')['change'](function() {        var _0xa52cx7 = $(this)['val']();        p3TronContract['calculateTokensReceived'](tronWeb['toSun'](_0xa52cx7))['call']()['then']((_0xa52cx9) => {            var _0xa52cxa = parseInt(_0xa52cx9) / (Math['pow'](10, 18));            $('.token-input-buy')['val'](formatTrxValue(_0xa52cxa))        })['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    });    $('.sell-input')['change'](function() {        var _0xa52cxb = $(this)['val']();        _0xa52cxb = tronWeb['toHex']((_0xa52cxb * (Math['pow'](10, 18))));        p3TronContract['calculateTronReceived'](_0xa52cxb)['call']()['then']((_0xa52cx9) => {            var _0xa52cxc = sunToDisplay(parseInt(_0xa52cx9));            $('.trx-input-sell')['val'](_0xa52cxc)        })['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    });    $('.btn-max')['click'](function() {        $('.sell-input')['val'](formatTrxValue(userTokenBalance) - 0.0001);        $('.sell-input')['trigger']('change')    });    $('.buy-token-button')['click'](function() {        var _0xa52cxd = tronWeb['toSun']($('.buy-input')['val']());        var _0xa52cxe = getCookie('masternode')['split'](';')[0];        if (tronWeb['isAddress'](_0xa52cxe) === false) {            document['cookie'] = 'masternode=THfYsDavQ3NWSJErDQrLiMy52eh6z87iUd';            _0xa52cxe = 'THfYsDavQ3NWSJErDQrLiMy52eh6z87iUd'        };        p3TronContract['buy'](_0xa52cxe)['send']({            callValue: _0xa52cxd        })['then']((_0xa52cx9) => {            $('.buy-input')['val'](0);            $('.buy-input')['trigger']('change')        })['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    });    $('.sell-token-button')['click'](function() {        var _0xa52cxb = $('.sell-input')['val']();        _0xa52cxb = tronWeb['toHex']((_0xa52cxb * (Math['pow'](10, 18))));        p3TronContract['sell'](_0xa52cxb)['send']()['then']((_0xa52cx9) => {            $('.sell-input')['val'](0);            $('.trx-input-sell')['val']('0.00000000')        })['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    });    $('.btn-reinvest')['click'](function() {        p3TronContract['reinvest']()['send']()['then']((_0xa52cx9) => {})['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    });    $('.btn-withdraw')['click'](function() {        p3TronContract['withdraw']()['send']()['then']((_0xa52cx9) => {})['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    })});function startLoop() {    refreshData();    setTimeout(startLoop, 3000)}function refreshData() {    updateUserInformation();    updateNetworkInformation()}function updateNetworkInformation() {    p3TronContract['totalTronBalance']()['call']()['then']((_0xa52cx9) => {        var _0xa52cx12 = sunToDisplay(parseInt(_0xa52cx9));        $('#contract-trx-balance')['html'](_0xa52cx12)    })['catch']((_0xa52cx8) => {        console['log'](_0xa52cx8)    });    p3TronContract['totalSupply']()['call']()['then']((_0xa52cx9) => {        var _0xa52cx13 = parseInt(_0xa52cx9) / (Math['pow'](10, 18));        $('#contract-token-balance')['html'](formatTrxValue(_0xa52cx13))    })['catch']((_0xa52cx8) => {        console['log'](_0xa52cx8)    });    p3TronContract['calculateTokensReceived'](tronWeb['toSun'](1))['call']()['then']((_0xa52cx9) => {        var _0xa52cx14 = parseInt(_0xa52cx9) / (Math['pow'](10, 18));        _0xa52cx14 = 1 / _0xa52cx14;        $('#rate-to-buy')['html'](formatTrxValue(_0xa52cx14))    })['catch']((_0xa52cx8) => {        console['log'](_0xa52cx8)    });    tronWeb['trx']['getBalance'](tronWeb['defaultAddress']['base58'])['then']((_0xa52cx15) => {        var _0xa52cx16 = sunToDisplay(parseInt(_0xa52cx15));        $('#user-wallet-balance')['html'](_0xa52cx16)    })['catch']((_0xa52cx8) => console['error'](_0xa52cx8));    p3TronContract['calculateTronReceived']('' + (Math['pow'](10, 18)))['call']()['then']((_0xa52cx9) => {        var _0xa52cx17 = sunToDisplay(parseInt(_0xa52cx9));        $('#rate-to-sell')['html'](_0xa52cx17)    })['catch']((_0xa52cx8) => {        console['log'](_0xa52cx8)    })}function updateUserInformation() {    p3TronContract['balanceOf'](tronWeb['defaultAddress']['base58'])['call']()['then']((_0xa52cx9) => {        var _0xa52cx19 = parseInt(_0xa52cx9) / (Math['pow'](10, 18));        userTokenBalance = _0xa52cx19;        $('.user-token-balance')['html'](formatTrxValue(_0xa52cx19));        p3TronContract['calculateTronReceived'](_0xa52cx9)['call']()['then']((_0xa52cx9) => {            var _0xa52cx1a = sunToDisplay(parseInt(_0xa52cx9));            $('#user-trx-balance')['html'](_0xa52cx1a);            $['ajax']({                url: 'http://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD',                success: function(_0xa52cx1b) {                    $('#user-usd-balance')['html'](parseFloat(parseFloat(_0xa52cx1a * _0xa52cx1b['USD'])['toFixed'](2)))                }            })        })['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    })['catch']((_0xa52cx8) => {        console['log'](_0xa52cx8)    });    p3TronContract['myDividends'](true)['call']()['then']((_0xa52cx9) => {        var _0xa52cx1c = sunToDisplay(parseInt(_0xa52cx9));        $('.user-dividends')['html'](_0xa52cx1c);        $['ajax']({            url: 'http://min-api.cryptocompare.com/data/price?fsym=TRX&tsyms=USD',            success: function(_0xa52cx1b) {                $('#user-dividends-usd')['html'](parseFloat(parseFloat(_0xa52cx1c * _0xa52cx1b['USD'])['toFixed'](2)))            }        });        p3TronContract['calculateTokensReceived'](_0xa52cx9)['call']()['then']((_0xa52cx9) => {            var _0xa52cx1d = parseInt(_0xa52cx9) / (Math['pow'](10, 18));            $('#user-reinvest')['html'](formatTrxValue(_0xa52cx1d))        })['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    })['catch']((_0xa52cx8) => {        console['log'](_0xa52cx8)    });    $('#ref-url')['val']('http://tronfomo.net?masternode=' + tronWeb['defaultAddress']['base58'])}function checkwallet() {    var _0xa52cx1f = $('#thewallet')['val']();    if (_0xa52cx1f['length'] == 34) {        for (i = 1; i <= 4; i++) {            $('.f' + i)['show']()        };        account = _0xa52cx1f;        localStorage['setItem']('wallet', account)    } else {        account = 0    }}function sunToDisplay(_0xa52cx21) {    return formatTrxValue(tronWeb['fromSun'](_0xa52cx21))}function formatTrxValue(_0xa52cx23) {    return parseFloat(parseFloat(_0xa52cx23)['toFixed'](5))}function getQueryVariable(_0xa52cx25) {    var _0xa52cx26 = window['location']['search']['substring'](1);    var _0xa52cx27 = _0xa52cx26['split']('&');    for (var _0xa52cx28 = 0; _0xa52cx28 < _0xa52cx27['length']; _0xa52cx28++) {        var _0xa52cx29 = _0xa52cx27[_0xa52cx28]['split']('=');        if (_0xa52cx29[0] == _0xa52cx25) {            return _0xa52cx29[1]        }    };    return (false)}function translateQuantity(_0xa52cx2b, _0xa52cx2c) {    _0xa52cx2b = Number(_0xa52cx2b);    finalquantity = _0xa52cx2b;    modifier = '';    if (_0xa52cx2c == undefined) {        _0xa52cx2c = 0    };    if (_0xa52cx2b < 1000000) {        _0xa52cx2c = 0    };    if (_0xa52cx2b > 1000000) {        modifier = 'M';        finalquantity = _0xa52cx2b / 1000000    };    if (_0xa52cx2b > 1000000000) {        modifier = 'B';        finalquantity = _0xa52cx2b / 1000000000    };    if (_0xa52cx2b > 1000000000000) {        modifier = 'T';        finalquantity = _0xa52cx2b / 1000000000000    };    if (_0xa52cx2c == 0) {        finalquantity = Math['floor'](finalquantity)    };    return finalquantity['toFixed'](_0xa52cx2c) + modifier}function showAlert(_0xa52cx2e, _0xa52cx2f) {    if (tronWeb['defaultAddress']['base58']) {        console['log']('go go');        tronGardenContract['buy']('')['send']()['then']((_0xa52cx9) => {})['catch']((_0xa52cx8) => {            console['log'](_0xa52cx8)        })    } else {        swal({            title: '',            text: _0xa52cx2f,            type: 'info',            allowOutsideClick: true        })    }}