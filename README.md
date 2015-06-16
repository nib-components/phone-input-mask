# phone-input-mask

A phone input mask. Limits data entry to DDDD DDD DDD (for mobile numbers) and DD DDDD DDDD (for landline numbers) where D is a digit (0-9).

## Installation 

Browserify:

    npm install --save @nib-components/phone-input-mask
    
Component:

    component install nib-components/phone-input-mask
    
## Usage

HTML:

    <input/>

JavaScript:

    var mask  = require('@nib-components/phone-input-mask');
    var el    = document.querySelector('input');
    
    mask(el);