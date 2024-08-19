const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const log = require('../../util/log');
const cast = require('../../util/cast');

class Scratch3Ai {
    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Launchpad AI';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return 'ai';
    }

    constructor (runtime) {
        this.runtime = runtime;
    }

    getInfo () {
        return {
            id: 'AiExtension',
            name: 'AI Extension',
            blocks: [
                {
                    opcode: 'writeText',
                    blockType: BlockType.COMMAND,
                    text: 'myText [TEXT]',
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'hello'
                        }
                    }
                }
            ],
            menus: {

            }
        };
    }

    writeText (args) {
        const text = Cast.toString(args.TEXT);
        log.myText(text);
    }
}