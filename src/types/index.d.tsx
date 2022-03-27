import { CstChildrenDictionary, CstNode } from "chevrotain";

export interface IElements extends CstNode{
  name: string
  children: IElementChild
}
export interface IElementChild extends CstChildrenDictionary{
    list?: IElements[]
    open_table?
}

export interface IDbElement {
  name?: string
  type?: string
}

export interface ITableElement extends IDbElement {
  columns ?: IColumnElement[] 
}

export interface IColumnElement extends IDbElement {
  modifiers?: any[]
}

export interface IRefElement extends IDbElement {
  foreign?: any
  primary?: any
}