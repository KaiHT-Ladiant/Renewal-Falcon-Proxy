// Service Worker for Renewal Falcon Proxy - Manifest V3
console.log('Renewal Falcon Proxy Service Worker starting...');

let checkStatus, setConnStat, setIcon, updateStatus;

setIcon = function(iconType) {
    console.log('Setting icon:', iconType);
    
    const iconPaths = {
        "on": {
            "16": "assets/images/icon_mono_on.png",
            "19": "assets/images/icon_mono_on.png",
            "24": "assets/images/icon_mono_on.png",
            "32": "assets/images/icon_mono_on.png",
            "38": "assets/images/icon_mono_on.png"
        },
        "off": {
            "16": "assets/images/icon_mono_off.png",
            "19": "assets/images/icon_mono_off.png",
            "24": "assets/images/icon_mono_off.png",
            "32": "assets/images/icon_mono_off.png",
            "38": "assets/images/icon_mono_off.png"
        }
    };
    
    try {
        switch(iconType) {
            case "on":
            case "on_sec":
                chrome.action.setIcon({
                    path: iconPaths.on
                });
                chrome.action.setTitle({
                    title: "Renewal Falcon Proxy - Activated"
                });
                break;
            case "off_alt":
                chrome.action.setIcon({
                    path: iconPaths.off
                });
                chrome.action.setTitle({
                    title: "Renewal Falcon Proxy - Set System Settings"
                });
                break;
            default:
                chrome.action.setIcon({
                    path: iconPaths.off
                });
                chrome.action.setTitle({
                    title: "Renewal Falcon Proxy - Deactivated"
                });
                break;
        }
    } catch (error) {
        console.error('Icon setting error:', error);
    }
};

setConnStat = function(name) {
    try {
        chrome.action.setTitle({
            title: "Connection Target: " + name
        });
    } catch (error) {
        console.error('Connection status error:', error);
    }
};

checkStatus = function(callback) {
    console.log('Checking proxy status...');
    
    if (!chrome.proxy) {
        console.error('Proxy API not available');
        if (callback) callback({error: 'Proxy API not available'});
        return;
    }
    
    try {
        chrome.proxy.settings.get({
            incognito: false
        }, function(details) {
            console.log('Proxy status:', details);
            
            if (chrome.runtime.lastError) {
                console.error('Proxy get error:', chrome.runtime.lastError);
                if (callback) callback({error: chrome.runtime.lastError.message});
                return;
            }
            
            updateStatus(details);
            if (callback) callback(details);
        });
    } catch (error) {
        console.error('Proxy status check error:', error);
        if (callback) callback({error: error.message});
    }
};

updateStatus = function(details) {
    console.log('Updating status with:', details);
    
    if (!details || details.error) {
        setIcon("off");
        return;
    }
    
    let isControlled = false;
    let status = "OFF";
    
    if (details.levelOfControl === "controlled_by_this_extension") {
        if (details.value && details.value.mode === "fixed_servers" && 
            details.value.rules && details.value.rules.singleProxy && 
            details.value.rules.singleProxy.scheme === "https") {
            setIcon("on_sec");
            status = "ON";
        } else if (details.value && details.value.mode === "system") {
            setIcon("off_alt");
        } else {
            setIcon("on");
            status = "ON";
        }
        isControlled = true;
    } else if (details.levelOfControl === "controllable_by_this_extension") {
        setIcon("off");
        isControlled = true;
    }
    
    if (isControlled) {
        if (details.value && details.value.mode === "direct") {
            setIcon("off");
        }
    } else {
        setIcon("off");
    }
    
    console.log('Status updated:', status, 'Controlled:', isControlled);
    sendAnalyticsEvent('Proxy Status', status, 'status_update');
};

function sendAnalyticsEvent(category, action, label) {
    console.log('Analytics Event:', { category, action, label });
    // Save Event in Local Paths (As needed)
    try {
        chrome.storage.local.set({
            [`analytics_${Date.now()}`]: { category, action, label, timestamp: Date.now() }
        });
    } catch (error) {
        console.log('Analytics storage error:', error);
    }
}

// Message Listner 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('Message received:', request);
    
    try {
        switch(request.msg) {
            case "update_status":
                checkStatus(function(details) {
                    sendResponse({
                        status: "ok",
                        config: JSON.stringify(details)
                    });
                });
                return true; // Return true for asynchronous response
                
            case "set_icon":
                setIcon(request.name);
                sendResponse({status: "ok"});
                break;
                
            case "set_conn_stat":
                setConnStat(request.name);
                sendResponse({status: "ok"});
                break;
                
            case "analytics":
                sendAnalyticsEvent(request.what, request.act, 'user_action');
                sendResponse({status: "ok"});
                break;
                
            default:
                console.log('Unknown message:', request.msg);
                sendResponse({status: "unknown_message"});
                break;
        }
    } catch (error) {
        console.error('Message handler error:', error);
        sendResponse({status: "error", error: error.message});
    }
    
    return true;
});

// Install Events
chrome.runtime.onInstalled.addListener(function(details) {
    console.log('Extension installed/updated:', details);
    setIcon("off");
    
    // Check initial status
    setTimeout(() => {
        checkStatus();
    }, 1000);
});

// Start Event
chrome.runtime.onStartup.addListener(function() {
    console.log('Extension startup');
    setIcon("off");
    
    setTimeout(() => {
        checkStatus();
    }, 1000);
});

// If Service Worker Acticated
self.addEventListener('activate', function(event) {
    console.log('Service Worker activated');
    setIcon("off");
});

console.log('Falcon Proxy Service Worker loaded successfully');
