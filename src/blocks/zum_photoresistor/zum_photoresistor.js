'use strict';
/* global Blockly, options, profiles, JST, RoboBlocks */
/* jshint sub:true */

/**
 * zum_photoresistor code generation
 * @return {String} Code generated with block parameters
 */
Blockly.Arduino.zum_photoresistor = function() {
    var dropdown_pin = this.getFieldValue('PIN');

    var code = JST['zum_photoresistor']({
        'dropdown_pin': dropdown_pin
    });

    //  code=code.substring(0,code.length-1);
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};


/**
 * zum_photoresistor block definition
 * @type {Object}
 */
Blockly.Blocks.zum_photoresistor = {
    category: RoboBlocks.LANG_CATEGORY_ZUM,
    tags: ['bq', 'zum', 'photoresistor'],
    helpUrl: RoboBlocks.GITHUB_SRC_URL+'blocks/zum_photoresistor',
    /**
    * zum_photoresistor initialization
    */
    init: function() {
        this.setColour(RoboBlocks.LANG_COLOUR_ZUM);
        this.appendDummyInput('')
        .appendField(RoboBlocks.LANG_ZUM_PHOTORESISTOR)
        .appendField(new Blockly.FieldImage('img/blocks/zum05.png', 208 * options.zoom, 126 * options.zoom))
        .appendField(RoboBlocks.LANG_ZUM_PHOTORESISTOR_PIN)
        .appendField(new Blockly.FieldDropdown(profiles.default.analog), 'PIN');
        this.setOutput(true, Number);
        this.setTooltip(RoboBlocks.LANG_ZUM_PHOTORESISTOR_TOOLTIP);
    }
};