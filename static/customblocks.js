//block definition
//light switch block - turn color on or off
Blockly.Blocks['lightswitch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldDropdown([["red","R"], ["blue","B"]]), "lightcolor")
        .appendField(new Blockly.FieldDropdown([["on","T"], ["off","F"]]), "switch");
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
//block definition
//light switch block - turn color on or off
Blockly.Blocks['lightswitch'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Turn")
        .appendField(new Blockly.FieldDropdown([["red","R"], ["blue","B"]]), "lightcolor")
        .appendField(new Blockly.FieldDropdown([["on","T"], ["off","F"]]), "switch");
    this.setColour(270);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};