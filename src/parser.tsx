import {CstParser} from 'chevrotain'
import {Token} from './tokens'

export class SchemaDBParser extends CstParser {
    constructor() {
        super(Token.ALL_TOKENS)
        this.performSelfAnalysis()
    }

    elements = this.RULE('elements', () => {
        this.MANY(() => {
            this.OR([
                {
                    ALT: () => {
                        this.CONSUME(Token.NEW_LINE_DEFINITION)
                    },
                },
                {
                    ALT: () => {
                        this.CONSUME(Token.INLINE_COMMENT_DEFINITION)
                    },
                },

                {
                    ALT: () => {
                        this.CONSUME(Token.MULTILINE_COMMENT_DEFINITION)
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE(this.table, {LABEL: 'list'})
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE(this.ref, {LABEL: 'list'})
                    },
                },
                {
                    ALT: () => {
                        this.SUBRULE(this.enum, {LABEL: 'list'})
                    },
                },
            ])
        })
    })

    enum = this.RULE('enum', () => {
        this.SUBRULE(this.open_enum)
        this.MANY(() => {
            this.SUBRULE(this.enum_def, {LABEL: 'list'})
        })
        this.SUBRULE(this.close_enum)
    })

    open_enum = this.RULE('open_enum', () => {
        this.CONSUME(Token.ENUM_DEFINITION)
        this.CONSUME(Token.IDENTIFIER_DEFINITION)
        this.CONSUME(Token.LEFT_BRACKET_DEFINITION)
        this.CONSUME(Token.NEW_LINE_DEFINITION)
    })

    close_enum = this.RULE('close_enum', () => {
        this.CONSUME(Token.RIGHT_BRACKET_DEFINITION)
        this.CONSUME(Token.NEW_LINE_DEFINITION)
    })

    enum_def = this.RULE('enum_def', () => {
        this.CONSUME(Token.IDENTIFIER_DEFINITION)
        this.CONSUME(Token.NEW_LINE_DEFINITION)
    })

    ref = this.RULE('ref', () => {
        this.CONSUME(Token.REFERENCE_DEFINITION)
        this.SUBRULE(this.foreign_ref)
        this.OR([{
                ALT: ()=>{
                    this.CONSUME(Token.GREATER_THAN_DEFINITION)
                }
            },
            {
                ALT: ()=>{
                    this.CONSUME(Token.LESS_THAN_DEFINITION)
                },
            },
            {
                ALT: ()=>{
                    this.CONSUME(Token.MINUS_DEFINITION)
                },
            },
            {
                ALT: ()=>{
                    this.CONSUME(Token.MANY_TO_MANY_DEFINITION)
                },
            }
        ])
        this.SUBRULE(this.primary_ref)
        this.CONSUME(Token.NEW_LINE_DEFINITION)
    })

    foreign_ref = this.RULE('foreign_ref', () => {
        this.SUBRULE(this.ref_table_col)
    })

    primary_ref = this.RULE('primary_ref', () => {
        this.SUBRULE(this.ref_table_col)
    })

    ref_table_col = this.RULE('ref_table_col', () => {
        this.SUBRULE(this.ref_table)
        this.CONSUME(Token.DOT_DEFINITION)
        this.SUBRULE(this.ref_column)
    })

    ref_table = this.RULE('ref_table', () => {
        this.CONSUME(Token.IDENTIFIER_DEFINITION)
    })

    ref_column = this.RULE('ref_column', () => {
        this.CONSUME(Token.IDENTIFIER_DEFINITION)
    })

    table = this.RULE('table', () => {
        this.SUBRULE(this.open_table)
        this.SUBRULE(this.columns)
        this.SUBRULE(this.close_table)
    })

    open_table = this.RULE('open_table', () => {
        this.CONSUME(Token.TABLE_DEFINITION)
        this.CONSUME(Token.IDENTIFIER_DEFINITION)
        this.CONSUME(Token.LEFT_BRACKET_DEFINITION)
        this.CONSUME(Token.NEW_LINE_DEFINITION)
    })

    close_table = this.RULE('close_table', () => {
        this.CONSUME(Token.RIGHT_BRACKET_DEFINITION)
        this.CONSUME(Token.NEW_LINE_DEFINITION)
    })

    columns = this.RULE('columns', () => {
        this.MANY(() => {
            this.SUBRULE(this.column, {LABEL: 'list'})
        })
    })

    column = this.RULE('column', () => {
        this.SUBRULE(this.column_name)
        this.SUBRULE(this.type)
        this.OPTION(() => {
            this.SUBRULE(this.modifiers)
        })
        this.CONSUME(Token.NEW_LINE_DEFINITION)
    })

    column_name = this.RULE('column_name', () => {
        this.CONSUME(Token.IDENTIFIER_DEFINITION)
    })

    type = this.RULE('type', () => {
        this.CONSUME(Token.IDENTIFIER_DEFINITION)
    })

    modifiers = this.RULE('modifiers', () => {
        this.CONSUME(Token.LEFT_SQUARE_BRACKET_DEFINITION)
        this.MANY_SEP({
            SEP: Token.COMMA_DEFINITION,
            DEF: () => {
                this.SUBRULE(this.single_modifier, {LABEL: 'list'})
            },
        })
        this.CONSUME(Token.RIGHT_SQUARE_BRACKET_DEFINITION)
    })
    default_definiton = this.RULE('default', () =>{
        this.CONSUME(Token.DEFAULT_DEFINITION)
        this.CONSUME(Token.COLLON_DEFINITION)
        this.OR([{
            ALT: () => {
                this.CONSUME(Token.IDENTIFIER_DEFINITION)
            },
        },{
            ALT: () => {
                this.CONSUME(Token.DEFAULT_IDENTIFIER_DEFINITION)
            },
        }])

    })

    inline_ref = this.RULE('inline_ref', ()=>{
        this.CONSUME(Token.REFERENCE_DEFINITION)
        this.OR([{
            ALT: ()=>{
                this.CONSUME(Token.GREATER_THAN_DEFINITION)
            }
        },
        {
            ALT: ()=>{
                this.CONSUME(Token.LESS_THAN_DEFINITION)
            },
        },
        {
            ALT: ()=>{
                this.CONSUME(Token.MINUS_DEFINITION)
            },
        },
        {
            ALT: ()=>{
                this.CONSUME(Token.MANY_TO_MANY_DEFINITION)
            },
        }
        ])
        this.SUBRULE(this.foreign_ref)
    })

    single_modifier = this.RULE('single_modifier', () => {
        this.OR([
            {
                ALT: () => {
                    this.CONSUME(Token.NOT_NULL_DEFINITION)
                },
            },
            {
                ALT: () => {
                    this.CONSUME(Token.PRIMARY_KEY_DEFINITION)
                },
            },
            {
                ALT: () => {
                    this.CONSUME(Token.UNIQUE_KEY_DEFINITION)
                },
            },
            {
                ALT: ()=>{
                    this.SUBRULE(this.inline_ref)
                }
            },
            {
                ALT: ()=>{
                    this.SUBRULE(this.default_definiton)
                }
            },
        ])
    })
}