import { CstChildrenDictionary, CstNode } from "chevrotain";

export interface IElements extends CstNode{
  name: string
  children: IElementChild
}
export interface IElementChild extends CstChildrenDictionary{
    list?: IElements[]
    open_table?
}