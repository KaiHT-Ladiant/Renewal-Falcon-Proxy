# Renewal Falcon Proxy (With Pentest)

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-GPL--3.0-green.svg)
![Manifest](https://img.shields.io/badge/manifest-v3-orange.svg)

> A renewed version of Falcon Proxy, specifically enhanced for penetration testing and security assessments.

## 📋 Overview

**Renewal Falcon Proxy (With Pentest)** is a modernized Chrome extension based on the original Falcon Proxy by Lyric Wai. This version has been completely rewritten to support Manifest V3 and includes specialized features for penetration testers and security consultants.

## 🚀 Key Features

### Core Functionality
- ✅ **HTTP/HTTPS Proxy Support** - Seamless proxy switching
- ✅ **Multiple Proxy Profiles** - Save and manage different proxy configurations
- ✅ **One-Click Toggle** - Quick proxy enable/disable
- ✅ **System Proxy Integration** - Direct Chrome proxy control

### Pentest Enhancements
- 🔒 **Burp Suite Integration** - Optimized for security testing workflows
- 🎯 **Custom Proxy Chains** - Support for complex proxy configurations
- 📊 **Traffic Monitoring** - Enhanced visibility for security analysis
- 🛡️ **SSL Certificate Handling** - Improved certificate management for testing

### Technical Improvements
- ⚡ **Manifest V3 Compliance** - Future-proof extension architecture
- 🔧 **Service Worker Backend** - More reliable background processing
- 💾 **Enhanced Storage** - Improved configuration persistence
- 🎨 **Modern UI** - Updated interface with better UX

## 🛠️ Installation

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension folder
5. The extension will appear in your Chrome toolbar

### Chrome Web Store
*(Coming Soon - Under Review)*

## 📖 Usage

### Basic Setup
1. Click the extension icon in your Chrome toolbar
2. Enter your proxy server details:
   - **Server**: IP address or hostname
   - **Port**: Proxy server port
   - **Username/Password**: Authentication if required
3. Click "Save" to store the configuration
4. Toggle "Enable Proxy" to activate

### For Penetration Testing
1. **Burp Suite Setup**:
   - Server: `127.0.0.1`
   - Port: `8080` (default Burp proxy port)
   - Enable "Intercept" mode in Burp

2. **OWASP ZAP Setup**:
   - Server: `127.0.0.1`
   - Port: `8081` (default ZAP proxy port)

3. **Custom Proxy Chains**:
   - Use the "Advanced" tab for complex routing
   - Support for SOCKS4/SOCKS5 proxies

## 🔧 Configuration

### Proxy Profiles
Create multiple proxy profiles for different testing scenarios:   
```
{
"profiles": {
  "burp": {
    "server": "127.0.0.1",
    "port": "8080",
    "type": "http"
          },
  "corporate": {
    "server": "proxy.company.com",
    "port": "3128",
    "auth": true
        }
  }
}
```

### Advanced Settings
- **Bypass List**: Exclude specific domains from proxy
- **PAC Script Support**: Custom proxy auto-configuration
- **Certificate Handling**: Manage SSL/TLS certificates for testing

## 🛡️ Security Considerations

**⚠️ Important Notice**: This extension is designed for authorized security testing only.

- Only use on systems you own or have explicit permission to test
- Be aware of corporate network policies
- Ensure proper SSL certificate validation in production environments
- Keep proxy credentials secure

## 📝 Changelog

### Version 2.0.0 (Current)
- ✨ **New**: Complete Manifest V3 rewrite
- ✨ **New**: Service Worker architecture
- ✨ **New**: Enhanced pentest features
- ✨ **New**: Modern UI/UX design
- 🔧 **Improved**: Proxy management system
- 🔧 **Improved**: Configuration persistence
- 🐛 **Fixed**: Chrome 88+ compatibility issues

### Original Version (1.x)
- Basic proxy functionality by Lyric Wai
- Manifest V2 architecture
- Limited proxy profile support

## 🤝 Contributing

We welcome contributions from the security community!

### Development Setup
```
git clone [https://github.com/yourusername/renewal-falcon-proxy.git](https://github.com/KaiHT-Ladiant/Renewal-Falcon-Proxy.git)
cd renewal-falcon-proxy

* Make your changes
* Test thoroughly before submitting PR
```

### Contribution Guidelines
- Follow existing code style
- Add tests for new features
- Update documentation as needed
- Ensure Manifest V3 compliance

## 📄 License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

### Original Work Attribution
This project is based on the original **Falcon Proxy** by **Lyric Wai**:
- Original Repository: [falcon-proxy](https://github.com/lyricwai/falcon-proxy)
- Original License: GPL-3.0
- Original Author: Lyric Wai

As required by the GPL-3.0 license, this derivative work maintains the same open-source license and acknowledges the original author's contribution.

## ⚠️ Disclaimer

This tool is intended for authorized security testing and educational purposes only. Users are responsible for complying with all applicable laws and regulations. The authors assume no liability for misuse of this software.

## 🙏 Acknowledgments

- **Lyric Wai** - Original Falcon Proxy creator
- **Chrome Extension Team** - Manifest V3 documentation
- **Security Community** - Feature requests and feedback
- **Penetration Testing Community** - Testing and validation

## 📞 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/KaiHT-Ladiant/Renewal-Falcon-Proxy/issues)
- 💡 **Feature Requests**: [GitHub Discussions](https://github.com/KaiHT-Ladiant/Renewal-Falcon-Proxy/discussions)
- 📧 **Security Issues**: kaihtladiant@gmail.com

---

**Made with ❤️ for the Security Community**

*This extension is specifically designed to assist penetration testers and security professionals in their authorized testing activities.*
