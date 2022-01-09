import { createToken, Lexer} from "chevrotain"
export class Token {

static TABLE_DEFINITION = createToken({name: 'TableDefinition', pattern: /TABLE/i})
static ENUM_DEFINITION = createToken({name: 'EnumDefinition', pattern: /ENUM/i})
static REFERENCE_DEFINITION = createToken({name: 'RefDefinition', pattern: /REF[ ]*:/i})

static LEFT_BRACKET_DEFINITION = createToken({name: 'LEFT_BRACKET_DEFINITION', pattern: /[ ]*{[ ]*/})
static RIGHT_BRACKET_DEFINITION = createToken({name: 'RIGHT_BRACKET_DEFINITION', pattern: /[ ]*}[ ]*/})
static INLINE_COMMENT_DEFINITION = createToken({
    name: 'INLINE_COMMENT_DEFINITION',
    pattern: /\/\/[^\n]*/,
    group: Lexer.SKIPPED,
})
static MULTILINE_COMMENT_DEFINITION = createToken({
    name: 'MULTILINE_COMMENT_DEFINITION',
    pattern: /\/\*[^*]*\*+([^/*][^*]*\*+)*\//,
    group: Lexer.SKIPPED,
})

static LEFT_SQUARE_BRACKET_DEFINITION = createToken({name: 'LEFT_SQUARE_BRACKET_DEFINITION', pattern: /\[/})
static RIGHT_SQUARE_BRACKET_DEFINITION = createToken({name: 'RIGHT_SQUARE_BRACKET_DEFINITION', pattern: /]/})
static COMMA_DEFINITION = createToken({name: 'COMMA_DEFINITION', pattern: /,/})
static COLLON_DEFINITION = createToken({name: 'COLLON_DEFINITION', pattern: /:/})

static NOT_NULL_DEFINITION = createToken({name: 'NOT_NULL_DEFINITION', pattern: /not null/})
static PRIMARY_KEY_DEFINITION = createToken({name: 'PRIMARY_KEY_DEFINITION', pattern: /pk/})
static UNIQUE_KEY_DEFINITION = createToken({name: 'UNIQUE_KEY_DEFINITION', pattern: /unique/})
static DEFAULT_DEFINITION = createToken({name:'DEFAULT_MODIFIER_DEFINITION', pattern: /default/})
static DEFAULT_IDENTIFIER_DEFINITION = createToken({name: 'DEFAULT_IDENTIFIER_DEFINITON', pattern: /now\(\)/})

static IDENTIFIER_DEFINITION = createToken({name: 'IDENTIFIER_DEFINITION', pattern: /[a-zA-z]\w+/})

static NEW_LINE_DEFINITION = createToken({name: 'NEW_LINE_DEFINITION', pattern: /[\n]+/})
static MINUS_DEFINITION = createToken({name: 'MINUS_DEFINITION', pattern: /-/})
static MANY_TO_MANY_DEFINITION = createToken({name:'MANY_TO_MANY_DEFINITION', pattern: '><'})
static GREATER_THAN_DEFINITION = createToken({name: 'GREATER_THAN_DEFINITION', pattern: />/})
static LESS_THAN_DEFINITION = createToken({name: 'LESS_THAN_DEFINITION', pattern: /</})
static DOT_DEFINITION = createToken({name: 'DOT_DEFINITION', pattern: /\./})
static WHITESPACE_DEFINITION = createToken({
    name: 'WHITESPACE_DEFINITION',
    pattern: /[ |\t]+/,
    group: Lexer.SKIPPED,
})

static ALL_TOKENS = [
    Token.WHITESPACE_DEFINITION,
    Token.NEW_LINE_DEFINITION,
    Token.INLINE_COMMENT_DEFINITION,
    Token.MULTILINE_COMMENT_DEFINITION,
    Token.TABLE_DEFINITION,
    Token.REFERENCE_DEFINITION,
    Token.ENUM_DEFINITION,
    Token.LEFT_BRACKET_DEFINITION,
    Token.RIGHT_BRACKET_DEFINITION,
    Token.LEFT_SQUARE_BRACKET_DEFINITION,
    Token.RIGHT_SQUARE_BRACKET_DEFINITION,
    Token.COMMA_DEFINITION,
    Token.COLLON_DEFINITION,
    Token.NOT_NULL_DEFINITION,
    Token.PRIMARY_KEY_DEFINITION,
    Token.UNIQUE_KEY_DEFINITION,
    Token.DEFAULT_DEFINITION,
    Token.DEFAULT_IDENTIFIER_DEFINITION,
    Token.IDENTIFIER_DEFINITION,
    Token.DOT_DEFINITION,

    Token.MANY_TO_MANY_DEFINITION,
    Token.GREATER_THAN_DEFINITION,
    Token.LESS_THAN_DEFINITION,
    Token.MINUS_DEFINITION
]
}
