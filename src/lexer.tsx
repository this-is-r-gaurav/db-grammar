
import {Lexer} from 'chevrotain'
import {Token} from './tokens'
export const DBDefinitionLexer = new Lexer(Token.ALL_TOKENS, {
    // Less position info tracked, reduces verbosity of the playground output.
    positionTracking: 'onlyStart',
})