RoboBlocks
==========

[![Build Status](https://secure.travis-ci.org/alex/roboblocks.png?branch=master)](http://travis-ci.org/alex/roboblocks)

Blockly blocks repository used in bitbloq

Getting Started
---------------

This project requires [blocklybq](https://github.com/blocklybq/blockly) or [blockly](https://code.google.com/p/blockly/) to work.

### Include Roboblocks in your project

#### **With Bower & RequireJS**

- Install roboblocks

    ```
    bower install roboblocks --save-dev
    bower install blocklybq --save-dev
    ```

- Declare in RequireJS

    ```
    <!doctype html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>RoboBlocks</title>
    </head>
    <body>
        <script src="bower_components/requirejs/require.js"></script>
        <script src="scripts/define.js"></script>
        <script>
            'use strict';
            /* global require */
            require.config({
                deps: [
                    'main'
                ],
                paths: {
                    'blockly': '../bower_components/blockly/blockly_compressed',
                    'blockly.blocks': '../bower_components/blockly/blocks_compressed',
                    'blockly.lang': '../bower_components/blockly/msg/js/en',
                    'blockly.arduino': '../bower_components/blockly/arduino_compressed',
                    roboblocks: '../bower_components/roboblocks/dist/roboblocks'
                },
                shim: {
                    blockly: {
                        exports: 'Blockly'
                    },
                    'blockly.blocks': [
                        'blockly'
                    ],
                    'blockly.lang': [
                        'blockly'
                    ],
                    'blockly.arduino': [
                        'blockly'
                    ],
                    'roboblocks': [
                        'blockly'
                    ]
                }
            });

            define(['blockly', 'roboblocks'], function(Blockly, RoboBlocks) {
                // RoboBlocks loader
                RoboBlocks.load({
                    zoom: 1,
                    otherParameter: true
                });
                var target = document.querySelector('.blockly');
                Blockly.inject(target, {
                    trashcan: true,
                    toolbox: Blockly.createToolbox(),
                    scrollbars: false
                });
    
            });

        </script>
    </body>
    </html>
    ```
    
#### **Manual**

- Index example

    ```
    <!doctype html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>RoboBlocks</title>
    </head>
    <body>
        <script type="text/javascript" src="js/bitbloq.js"></script>
        <script type="text/javascript" src="js/roboblocks.js"></script>
        <script>
        
            // RoboBlocks loader
            RoboBlocks.load({
                zoom: 1,
                otherParameter: true
            });
            
            var target = document.querySelector('.blockly');
            Blockly.inject(target, {
                trashcan: true,
                toolbox: Blockly.createToolbox(),
                scrollbars: false
            });
    
        </script>
    </body>
    </html>
    ```

## Blockly Extensions

### Blockly.createToolbox

When Blockly has its blocks loaded, this method generates the XML file that defines the Blockly toolbox.



## How to contribute

- Clone project

    ```
    git clone http://github.com/bq/roboblock.git
    ```
    
- Initialize

    ```
    npm install && bower install
    ```
- Create blocks (see next point)

- Test

    ```
    grunt test
    ```
    
- Build

    ```
    grunt
    ```
    
## Creating new blocks

### Block structure
```
src
├── blocks                      // blocks folder
│   └── servo_move             // block name
│       ├── img                 // block image
│       │   └── *.png
│       ├── servo_move.c.tpl   // c code template
│       ├── servo_move.js      // block definition & code generation
│       └── README.md           // block documentation
├── profiles.js                 // supported profiles
└── utils.js                    // some utils and Blockly extensions
```

### Block implementation

#### **servo_move.js example**

```
'use strict';
/* global Blockly, options, profiles */
/* jshint sub:true */

/**
 * servo_move code generation
 * @return {String} Code generated with block parameters
 */
Blockly.Arduino.servo_move = function() {
    var dropdown_pin = this.getTitleValue('PIN');
    var value_degree = Blockly.Arduino.valueToCode(this, 'DEGREE', Blockly.Arduino.ORDER_ATOMIC);
    value_degree = value_degree.replace('(', '').replace(')', '');
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '10';

    delay_time = delay_time.replace('(', '').replace(')', '');

    Blockly.Arduino.definitions_['define_servo'] = '#include <Servo.h>\n';
    Blockly.Arduino.definitions_['var_servo' + dropdown_pin] = 'Servo servo_' + dropdown_pin + ';\n';
    Blockly.Arduino.setups_['setup_servo_' + dropdown_pin] = 'servo_' + dropdown_pin + '.attach(' + dropdown_pin + ');\n';

    // Code generation with compiled template
    var code = this.JST['servo_move']({
        'dropdown_pin': dropdown_pin,
        'value_degree': value_degree,
        'delay_time': delay_time
    });

    return code;
};

/**
 * servo_move block definition
 * @type {Object}
 */
Blockly.Blocks.servo_move = {
    category: 'Math',
    helpUrl: 'http://github.com/bq/roboblock/tree/master/src/blocks/servo_move',
    /**
     * servo_move initialization
     */
    init: function() {
        this.setColour('25');
        this.appendDummyInput('')
            .appendTitle('Servo')
            .appendTitle(new Blockly.FieldImage('img/blocks/bqservo01.png', 208 * options.zoom, 126 * options.zoom))
            .appendTitle('PIN#')
            .appendTitle(new Blockly.FieldDropdown(profiles.default.digital), 'PIN');
        this.appendValueInput('DEGREE', Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendTitle('Degrees (0~180)');
        this.appendValueInput('DELAY_TIME', Number)
            .setCheck(Number)
            .setAlign(Blockly.ALIGN_RIGHT)
            .appendTitle('Delay');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
        this.setTooltip('Move between 0~180 degree');
    }
};
```

#### **Parameters**

Blocks can be initialized with parameters when loaded with `RoboBlocks.load({...});`, and this parameters are available in `options` variable.
```
this.appendDummyInput('')
    .appendTitle('Servo')
    .appendTitle(new Blockly.FieldImage(
        'img/blocks/bqservo01.png',
        208 * options.zoom,
        126 * options.zoom)
    );
```

#### **Profiles**

Default profiles are available and defined in `src/profiles.js`. This profiles are available in `profiles` variable.
```
this.appendDummyInput('')
    .appendTitle('Servo')
    .appendTitle('PIN#')
    .appendTitle(
        new Blockly.FieldDropdown(profiles.default.digital),
        'PIN'
    );
```

#### **Block image**

Blocks images should be defined like this:
```
this.appendDummyInput('')
    .appendTitle(new Blockly.FieldImage(
        'img/blocks/bqservo01.png',
        208 * options.zoom,
        126 * options.zoom)
    );
```
And its images stored in `src/blocks/[block_name]/img/[filename].png`.
When the project is compiled, all images are located in `dist/img/*.png`.

### Code template

Blocks code are defined in `*.c.tpl` files as an [underscore](http://underscorejs.org/) templates but with following settings:
```
templateSettings: {
    evaluate:    /\{\{#([\s\S]+?)\}\}/g,        // {{# console.log("blah") }}
    interpolate : /\{\{\{(\s*\w+?\s*)\}\}\}/g,  // {{ title }}
    escape : /\{\{(\s*\w+?\s*)\}\}(?!\})/g      // {{{ title }}}
}
```
With this settings, this template called `servo_move.c.tpl`:
```
servo_{{ dropdown_pin }}.write({{ value_degree }});
delay({{ delay_time }});
```
When evaluated like this:
```
var code = this.JST['servo_move']({
    'dropdown_pin': 3,
    'value_degree': 180,
    'delay_time': 1000
});
```
Will generate the following code:
```
servo_3.write(180);
delay(1000);
```


### Testing (@todo)
