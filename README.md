# Installation

Import the library 

```javascript
import { getBrowserInfo } from '@deanvangreunen/browser-detection';
```

# Usage

`await` this promised based library and it will return all required info about the browser.

```javascript
let browserInfo = await getBrowserInfo();
```

### Output

```json
{
  "browser": {
    "name": "Mozilla",
    "version": "5.0"
  },
  "platform": {
    "name": "Windows",
    "version": "10.0"
  },
  "isMobile": false,
  "supportedAPI": {
    "permissionQuery": {
      "enabled": true,
      "camera": true,
      "microphone": true
    }
  }
}
```

# Supported Platforms

- OS:
    - Windows, MacOS, Android, iOS, iPod, iPad, Linux
- Device:
    - Mobile, Tablet, Desktop
- Microphone Permission Support
- Camera Permission Support