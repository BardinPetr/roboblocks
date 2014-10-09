'use strict';
/* global Blockly, JST, RoboBlocks */
/* jshint sub:true */

/**
 * inout_builtin_led code generation
 * @return {String} Code generated with block parameters
 */

Blockly.Arduino.inout_builtin_led = function() {
	var dropdown_stat = this.getFieldValue('STAT');

	Blockly.Arduino.setups_['setup_green_led_13'] = JST['inout_builtin_led_setups']({});

	var code = JST['inout_builtin_led']({
		'dropdown_stat': dropdown_stat
	});

	return code;
};

/**
 * inout_builtin_led block definition
 * @type {Object}
 */
Blockly.Blocks.inout_builtin_led = {
	category: RoboBlocks.LANG_CATEGORY_ADVANCED,
	helpUrl: RoboBlocks.GITHUB_SRC_URL+'blocks/inout_builtin_led',
	 /**
	  * inout_builtin_led initialization
	  */
	init: function() {
		this.setColour(RoboBlocks.LANG_COLOUR_ADVANCED);
		this.appendDummyInput('')
			.appendField(RoboBlocks.LANG_ADVANCED_BUILTIN_LED)
			.appendField(RoboBlocks.LANG_ADVANCED_BUILTIN_LED_STATE)
			.appendField(new Blockly.FieldDropdown([
				[RoboBlocks.LANG_ADVANCED_BUILTIN_LED_ON , 'HIGH'],
				[RoboBlocks.LANG_ADVANCED_BUILTIN_LED_OFF , 'LOW']
			]), 'STAT');
		this.setPreviousStatement(true, null);
		this.setNextStatement(true, null);
		this.setTooltip(RoboBlocks.LANG_ADVANCED_BUILTIN_LED_TOOLTIP);
	}
};
