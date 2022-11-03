
// TODO: Create Browser Detection
//  => Browser Name
//  => Browser Version
//  => Device Name
//  => Device Model
//  => Supported APIs
//      => Permissions.query() => https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query
//      => Microphone
//          => MP3, ACC
//      => Camera (Front |&| Back)
//          => MKV, MP4, AVI
//      => MediaRecorder
//      => FireWall Detection
//          => See if we can access certian ports  

function getBrowserData(userAgent){
    let data = userAgent.substr(0, userAgent.indexOf(" ")).split('/');
    return {
        'name': data[0],
        'version': data[1],
    };
}

function getMajorAndMinorVersion(version){
    let parts = version.split('.');
    let major = parts[0];
    let minor = parts[1];
    return parseFloat(`${major}.${minor}`);
}

function getPlatformData(userAgent){
    let info = {
        "name": "",
        "version": ""
    };
    if(userAgent.includes("Windows NT")){ // is windows
        info.name = "Windows";
        let versionString = userAgent.substr(userAgent.indexOf("Windows NT") + 11);
        let versionStringDecoded = versionString.substr(0, versionString.indexOf(";"));
        info.version = versionStringDecoded;
    } else if(userAgent.includes("Macintosh")){ // is Mac OS
        info.name = "Mac OS";
        let versionString = userAgent.substr(userAgent.indexOf("Mac OS") + 7);
        let versionStringDecoded = versionString.substr(versionString.indexOf(";"));
        let cy = versionStringDecoded.indexOf(";");
        let sy = versionStringDecoded.indexOf(" ");
        if(cy < sy){
            info.version = versionStringDecoded.substr(0, cy);
        } else {
            info.version = versionStringDecoded.substr(0, sy);
        }
    } else if(userAgent.includes("iPhone")){ // is iPhone
        info.name = "iPhone";
        let versionString = userAgent.substr(userAgent.indexOf("iPhone OS") + 10);
        let version = versionString.substr(0, versionString.indexOf(" ")).replace(/_/g,".");
        let dotCount = (version.match(/./g) || []).length;
        if(dotCount >= 2){
            info.version = getMajorAndMinorVersion(version); // drops everything but major and minor versions
        } else {
            info.version = version;
        }
    } else if(userAgent.includes("iPad")){ // is iPad
        info.name = "iPad";
        let versionString = userAgent.substr(userAgent.indexOf("CPU OS") + 7);
        let version = versionString.substr(0, versionString.indexOf(" ")).replace(/_/g,".");
        let dotCount = (version.match(/./g) || []).length;
        if(dotCount >= 2){
            info.version = getMajorAndMinorVersion(version); // drops everything but major and minor versions
        } else {
            info.version = version;
        }
    } else if(userAgent.includes("iPod")){ // is iPod
        info.name = "iPhone";
        let versionString = userAgent.substr(userAgent.indexOf("iPhone OS") + 10);
        let version = versionString.substr(0, versionString.indexOf(" ")).replace(/_/g,".");
        let dotCount = (version.match(/./g) || []).length;
        if(dotCount >= 2){
            info.version = getMajorAndMinorVersion(version); // drops everything but major and minor versions
        } else {
            info.version = version;
        }
    } else if((userAgent.includes("Linux") && userAgent.includes("X11")) || (userAgent.includes("Linux x86_64") || userAgent.includes("Linux i686"))){ // is Linux on PC
        info.name = "Linux";
        info.version = 1;
    } else if(userAgent.includes("Linux") && userAgent.includes("Android")){ // is Android Mobile
        info.name = "Android";
        let startIndex = userAgent.indexOf("Android") + 8;
        let subed = userAgent.substr(startIndex);
        let endIndex = subed.indexOf(" ");
        let version = subed.substr(0, endIndex);
        info.version = version;
    } else if(userAgent.includes("Android")){ // is Android Mobile (IN CASE Linux was removed from the string)
        info.name = "Android";
        let startIndex = userAgent.indexOf("Android") + 8;
        let subed = userAgent.substr(startIndex);
        let endIndex = subed.indexOf(" ");
        let version = subed.substr(0, endIndex);
        info.version = version;
    }
    return info;
}

function getIsMobile(userAgent){   
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    if(check == false){return navigator?.userAgentData?.mobile ?? false;}
    return check;
}

async function supportedAPI(userAgent){
    let info = {
        'permissionQuery': {
            'enabled': false,
            'camera': false,
            'microphone': false,
        },
    };
    if("permissions" in navigator){
        info.permissionQuery.enabled = true;
        try {
            let camera = await navigator.permissions.query({ name: "camera"});
            if(camera.state === "denied"){
                info.permissionQuery.camera = false;
            } else if(camera.state === "prompt" || camera.state === "granted"){
                info.permissionQuery.camera = true;
            }
        } catch (e123){
            info.permissionQuery.camera = false;
        }
        try {
            let microphone = await navigator.permissions.query({ name: "microphone"});
            if(microphone.state === "denied"){
                info.permissionQuery.microphone = false;
            } else if(microphone.state === "prompt" || microphone.state === "granted"){
                info.permissionQuery.microphone = true;
            }
        } catch (e456){
            info.permissionQuery.microphone = false;
        }
    } else {
        info.permissionQuery.enabled = false;
    }
    return info;
}


export async function getBrowserInfo(){
    let userAgent = window.navigator.userAgent;
    let info = {
        "browser": getBrowserData(userAgent),
        "platform": getPlatformData(userAgent),
        "isMobile": getIsMobile(userAgent),
        "supportedAPI": await supportedAPI(userAgent),
    };
    return info;
}

// User Agent Details (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent#syntax)
// => Syntax
//    => User-Agent: <product> / <product-version> <comment>
//    => User-Agent: Mozilla/5.0 (platform; rv:geckoversion) Gecko/geckotrail Firefox/firefoxversion
// => Firefox UA string
//    => User-Agent: Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0
//    => User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X x.y; rv:42.0) Gecko/20100101 Firefox/42.0
// => Chrome UA string
//    => User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36
// => Opera UA string
//    => User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36 OPR/38.0.2220.41
//    => User-Agent: Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.00
//    => User-Agent: Opera/9.60 (Windows NT 6.0; U; en) Presto/2.1.1
// => Microsoft Edge UA string
//    => User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59
// => Safari UA string
//    => User-Agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1
// => Internet Explorer UA string
//    => User-Agent: Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0)
// => Crawler and bot UA strings
//    => User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
//    => User-Agent: Mozilla/5.0 (compatible; YandexAccessibilityBot/3.0; +http://yandex.com/bots)
// => Library and net tool UA strings
//    => User-Agent: curl/7.64.1
//    => User-Agent: PostmanRuntime/7.26.5

// 1. Mozilla/5.0 is the general token that says that the browser is Mozilla-compatible. For historical reasons, almost every browser today sends it.
// 2. above: platform describes the native platform that the browser is running on (Windows, Mac, Linux, Android, etc.)
//    and if it is a mobile phone. Firefox OS phones say Mobile — the web is the platform. Note that platform can consist
//    of multiple ";"-separated tokens. See below for further details and examples.
// 3. rv:geckoversion indicates the release version of Gecko (such as "17.0"). In recent browsers, geckoversion is the same as firefoxversion.
// 4. Gecko/geckotrail indicates that the browser is based on Gecko. (On the desktop, geckotrail is always the fixed string 20100101.)


// replaceAll
// Unhandled Promise Rejection: TypeError: s.substr(0,s.indexOf(" ")).replaceAll is not a function. (In 's.substr(0,s.indexOf(" ")).replaceAll("_",".")', 's.substr(0,s.indexOf(" ")).replaceAll' is undefined)
// Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.1.2 Mobile/15E148 Safari/604.1"