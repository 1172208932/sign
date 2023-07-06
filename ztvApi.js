/**
 * 配合 IOS 使用时的初始化方法
 */
(function (win, doc) {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1

    /**
     * 配合 IOS 使用时的初始化方法
     */
    function iosFunction(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge) // eslint-disable-line
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'https://__bridge_loaded__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    function androidFunction(callback) {
        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge) // eslint-disable-line
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback)
        }
        window.WVJBCallbacks = [callback]
        var WVJBIframe = document.createElement('iframe')
        WVJBIframe.style.display = 'none'
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
        document.documentElement.appendChild(WVJBIframe)
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    // !isAndroid && (window.setupWebViewJavascriptBridge = iosFunction);
    window.setupWebViewJavascriptBridge = isAndroid ? androidFunction : iosFunction
    // window.setupWebViewJavascriptBridge = setupWebViewJavascriptBridge;

    function CztvApi(debug = false) {
        console.log('CztvApi v1.0.4')
        this.debug = debug
    }

    /**
     * @description: 唤起登录页，未登录则返回''，登录成功code: 200，取消登录code: 401
     * @param {*} resCallback
     * @return {*}
     */
    CztvApi.prototype.login = function (resCallback) {
        const debug = this.debug
        if (debug) console.log('pushLoginPage')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.pushLoginPage', null, function (res) {
                if (debug) console.log('登录：', res)
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    /**
     * @description: 仅获取用户信息，可用来判断是否已登录，未登录则返回''
     * @param {*} resCallback
     * @return {*} 
     */
    CztvApi.prototype.userInfo = function (resCallback) {
        const debug = this.debug
        if (debug) console.log('userInfo')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.userInfo', null, function (res) {
                if (debug) console.log('userInfo:', res)
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }


    /**
     * @description: 关闭页面
     * @param {*} resCallback
     * @return {*} 
     */
    CztvApi.prototype.close = function (resCallback) {
        const debug = this.debug
        if (debug) console.log('close')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.close', null, function (res) {
                if (debug) console.log('close:', res);
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    /**
     * 路由跳转方法
     * @param {*} route 
     * @param {*} resCallback 
     */
    CztvApi.prototype.route = function (route, resCallback){
        const debug = this.debug
        if (debug) console.log('cztvRoute')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.route', { route: route }, function (res) {
                if (debug) console.log('cztvRoute:', res);
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    /**
     * 修改分享参数
     * @param {*} shareData 
     */
    CztvApi.prototype.changeShareInfo = function (shareData) {
        const debug = this.debug
        if (debug) console.log('changeShareInfo:', shareData)
        shareData != null && window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.changeShareInfo', shareData)
        })
    }

    /**
     * h5调起客户端分享
     * @param {*} shareData:(object) 分享参数
     *    "url": 'http://mhudong.cztv.com/260366', //分享的网址链接
     *    "title": "123", //分享的标题
     *    "content": "213", // 分享的文字
     *    "img": "https://ohudong.cztv.com/1/260366/images/qrcode.png", // 分享的图片Url
     * @param {*} resCallback
     */
    CztvApi.prototype.share = function (shareData, resCallback) {
        const debug = this.debug
        if (debug) console.log('share:', shareData)
        shareData != null && window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.share', shareData, function (res) {
                if (debug) console.log('share:', res);
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    /**
     * 显示和隐藏分享按钮
     * @param {*} showShareButton
     */
    CztvApi.prototype.showShareButton = function (showShareButton = true) {
        const debug = this.debug
        if (debug) console.log('showShareButton:', showShareButton)
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.showShareButton', showShareButton)
        })
    }

    /**
     * 获取系统信息
     * @param {*} resCallback
     */
    CztvApi.prototype.getSystemInfo = function (resCallback) {
        const debug = this.debug
        if (debug) console.log('getSystemInfo')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.getSystemInfo', null, function (res) {
                if (debug) console.log('getSystemInfo:', res);
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    /**
     * 保存图片
     * @param {*} img
     */
    CztvApi.prototype.saveImg = function (img) {
        if (!img) return
        const debug = this.debug
        if (debug) console.log('saveImg')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.saveImg', img)
        })
    }

    /**
     * 直接调起分享（不弹起面板）
     * @param {*} shareData
     * @param {*} resCallback
     */
    CztvApi.prototype.shareNoUi = function (shareData, resCallback) {
        if (!shareData || !shareData.type || !shareData.platform) return
        const debug = this.debug
        if (debug) console.log('shareNoUi')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.shareNoUi', shareData, function (res) {
                if (debug) console.log('shareNoUi:', res);
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    /**
     * 调起app页面
     * @param {*} openPagedata:(object) 跳转参数 “resource_type”: 1 //跳转类型 “resource_body”：”id” //页面加载所用到的id
     * @param {*} resCallback
     */
    CztvApi.prototype.openPage = function (openPagedata, resCallback) {
        const debug = this.debug
        if (debug) console.log('openPage')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.openPage', openPagedata, function (res) {
                console.log('调起app页面' + JSON.stringify(res));
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    /**
     * 通知app 当前h5页面信息
     * @param {*} openPagedata:(object) 跳转参数 “resource_type”: 1 //跳转类型 “resource_body”：”id” //页面加载所用到的id
     * @param {*} resCallback
     */
    CztvApi.prototype.setPageInfo = function (pageInfo, resCallback) {
        const debug = this.debug
        if (debug) console.log('setPageInfo')
        window.setupWebViewJavascriptBridge(function (bridge) {
            bridge.callHandler('CZTVJsdk.setPageInfo', pageInfo, function (res) {
                console.log('setPageInfo complete');
                if (resCallback) {
                    resCallback(res)
                }
            })
        })
    }

    win.CztvApi = CztvApi
})(window, document)