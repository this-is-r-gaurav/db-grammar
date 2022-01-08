import { CstNode } from 'chevrotain'
import {SchemaDBParser} from './parser'
import { IElementChild } from './types'
export interface ISchemaDBVisitor {
    visit(cst: CstNode, state?: any): any;
}
export function createSchemaDBVisitor(parser:SchemaDBParser) {
    const BaseSchemeVisitor = parser.getBaseCstVisitorConstructorWithDefaults()

    class CustomVisitor extends BaseSchemeVisitor {
        constructor() {
            super()
            this.validateVisitor()
        }

        elements(ctx:IElementChild) {
            return ctx.list.map((element) => {
                return this.visit(element)
            })
        }

        enum(ctx:any) {
            return {
                type: 'enum',
                name: ctx.open_enum[0].children.IDENTIFIER_DEFINITION[0].image,
                items: ctx.list.map((item:any) => this.visit(item)),
            }
        }

        enum_def(ctx:any) {
            return ctx.IDENTIFIER_DEFINITION[0].image
        }

        reference_type(ctx){
            let relation = ""
            const keys = Object.keys(ctx)
            if (keys.includes("GREATER_THAN_DEFINITION")){
                relation = "many to one"
            }else if  (keys.includes("LESS_THAN_DEFINITION")){
                relation = "one to many"
            }else if (keys.includes("MINUS_DEFINITION")){
                relation = "one to one"
            }else if  (keys.includes("MANY_TO_MANY_DEFINITION")){
                relation = 'many to many'
            }
            return relation
        }

        ref(ctx:any) {
            return {
                type: 'ref',
                relation: this.reference_type(ctx),
                foreign: {
                    ...this.ref_table_col(ctx.foreign_ref[0].children.ref_table_col[0]),
                },
                primary: {
                    ...this.ref_table_col(ctx.primary_ref[0].children.ref_table_col[0]),
                },
            }
        }

        ref_table_col(ctx:any) {
            return {
                table: ctx.children.ref_table[0].children.IDENTIFIER_DEFINITION[0].image,
                column: ctx.children.ref_column[0].children.IDENTIFIER_DEFINITION[0].image,
            }
        }

        table(ctx:any) {
            const tableName = ctx.open_table[0].children.IDENTIFIER_DEFINITION[0].image
            const columns = ctx.columns[0].children.list.map((column) =>
                this.visit(column)
            )
            return {
                type: 'table',
                name: tableName,
                columns: columns,
            }
        }

        column(ctx) {
            const name = this.visit(ctx.column_name)
            const type = this.visit(ctx.type)
            const modifiers = this.visit(ctx.modifiers)

            return {
                name: name,
                type: type,
                modifiers: modifiers ?? [],
            }
        }

        column_name(ctx) {
            return ctx.IDENTIFIER_DEFINITION[0].image
        }

        type(ctx) {
            return ctx.IDENTIFIER_DEFINITION[0].image
        }

        modifiers(ctx) {
            return ctx.list.map((modifier) => this.visit(modifier))
        }

        default(ctx){
            return {
                name : ctx.DEFAULT_MODIFIER_DEFINITION[0].image, 
                value: (ctx.DEFAULT_IDENTIFIER_DEFINITON?ctx.DEFAULT_IDENTIFIER_DEFINITON:ctx.IDENTIFIER_DEFINITION)[0].image
            }
        }
        inline_ref(ctx){
            return {
                name: 'ref',
                relation: this.reference_type(ctx),
                foreign: {
                    table: ctx.foreign_ref[0].children.ref_table_col[0].children.ref_table[0].children.IDENTIFIER_DEFINITION[0].image,
                    column: ctx.foreign_ref[0].children.ref_table_col[0].children.ref_column[0].children.IDENTIFIER_DEFINITION[0].image
                }
                
            }
        }

        single_modifier(ctx) {
            if (ctx.PRIMARY_KEY_DEFINITION) {
                return { name: ctx.PRIMARY_KEY_DEFINITION[0].image }
            } else if (ctx.NOT_NULL_DEFINITION) {
                return {name: ctx.NOT_NULL_DEFINITION[0].image}
            } else if (ctx.UNIQUE_KEY_DEFINITION) {
                return { name: ctx.UNIQUE_KEY_DEFINITION[0].image }
            } else if (ctx.default) {
                return this.visit(ctx.default)
            }else if  (ctx.inline_ref){
                return this.visit(ctx.inline_ref)
            }

            return null
        }
    }
    return new CustomVisitor()
}